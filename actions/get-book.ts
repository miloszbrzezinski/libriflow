"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const getBook = async (userId: string, bookId: string) => {
  const book = await db.book.findUnique({
    where: {
      id: bookId,
      userId: userId,
    },
    include: {
      author: true,
      bookNotes: {
        orderBy: {
          page: "asc",
        },
      },
    },
  });

  return { book };
};
