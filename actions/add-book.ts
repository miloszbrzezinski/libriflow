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
    bookDescription,
  } = validatedFields.data;

  console.log(userId);

  await db.user.update({
    where: {
      id: userId,
      email: "bzeziu@gmail.com",
    },
    data: {
      books: {
        create: {
          imageUrl,
          bookName,
          bookAuthor,
          bookGenre,
          bookPublisher,
          bookISBN,
          bookDescription,
        },
      },
    },
  });

  return { success: "Book added!" };
};
