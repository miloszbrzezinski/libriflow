"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
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

  await db.user.update({
    where: {
      id: userId,
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
