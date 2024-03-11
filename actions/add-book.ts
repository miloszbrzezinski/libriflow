"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const addBook = async (
  userId: string,
  values: z.infer<typeof AddBookSchema>,
) => {
  const validatedFields = AddBookSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong!" };
  }

  const {
    imageUrl,
    bookName,
    bookAuthor,
    bookGenre,
    bookPublisher,
    bookISBN,
    bookYear,
    bookDescription,
  } = validatedFields.data;

  const author = await db.author.findMany({
    where: {
      userId: userId,
      name: bookAuthor,
    },
  });

  if (author.length === 0) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        books: {
          create: {
            imageUrl,
            bookName,
            bookGenre,
            bookPublisher,
            bookISBN,
            bookDescription,
            bookYear: String(bookYear),
            author: {
              create: {
                userId,
                name: bookAuthor,
                imageUrl: "",
              },
            },
          },
        },
      },
    });
    return { success: "Book added!" };
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      authors: {
        update: {
          where: {
            id: author[0]!.id,
          },
          data: {
            books: {
              create: [
                {
                  imageUrl,
                  bookName,
                  bookGenre,
                  bookPublisher,
                  bookISBN,
                  bookDescription,
                  bookYear: String(bookYear),
                  userId,
                },
              ],
            },
          },
        },
      },
    },
  });

  return { success: "Book added!" };
};
