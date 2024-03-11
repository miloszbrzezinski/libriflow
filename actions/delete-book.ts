"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const deleteBook = async (bookId: string) => {
  if (!bookId) {
    return { error: "Something went wrong!" };
  }

  const book = await db.book.findUnique({
    where: {
      id: bookId,
    },
  });

  await db.book.delete({
    where: {
      id: bookId,
    },
  });

  const author = await db.author.findUnique({
    where: {
      id: book?.authorId,
    },
    include: {
      books: true,
    },
  });

  if (author?.books.length === 0) {
    await db.author.delete({
      where: {
        id: author.id,
      },
    });
  }

  return { success: "Book deleted!" };
};
