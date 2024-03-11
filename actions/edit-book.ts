"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const editBook = async (
  userId: string,
  bookId: string,
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
  } = validatedFields.data;

  const bookTmp = await db.book.findUnique({
    where: {
      id: bookId,
    },
  });

  const oldAuthor = await db.author.findUnique({
    where: {
      id: bookTmp?.authorId,
    },
    include: {
      books: true,
    },
  });

  const newAuthor = await db.author.findMany({
    where: {
      userId,
      name: bookAuthor,
    },
  });

  if (newAuthor.length === 0) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        books: {
          update: {
            where: {
              id: bookId,
            },
            data: {
              imageUrl,
              bookName,
              bookGenre,
              bookPublisher,
              bookYear: String(bookYear),
              author: {
                create: { userId, name: bookAuthor, imageUrl: "" },
              },
              bookISBN,
            },
          },
        },
      },
    });

    if (oldAuthor?.books.length === 0) {
      await db.author.delete({
        where: {
          id: oldAuthor.id,
        },
      });
    }

    return { success: "Book updated!" };
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      books: {
        update: {
          where: {
            id: bookId,
          },
          data: {
            imageUrl,
            bookName,
            bookGenre,
            bookPublisher,
            bookYear: String(bookYear),
            author: {
              connect: { id: newAuthor[0].id },
            },
            bookISBN,
          },
        },
      },
    },
  });

  if (oldAuthor?.books.length === 0) {
    await db.author.delete({
      where: {
        id: oldAuthor.id,
      },
    });
  }

  return { success: "Book added!" };
};
