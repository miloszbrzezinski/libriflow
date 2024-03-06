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

  console.log(bookId);

  await db.book.delete({
    where: {
      id: bookId,
    },
  });

  return { success: "Book deleted!" };
};
