"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const editBookDescription = async (
  userId: string,
  bookId: string,
  bookDescription: string,
) => {
  if (!userId || !bookId) {
    return { error: "Something went wrong!" };
  }

  console.log(userId);

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
            bookDescription,
          },
        },
      },
    },
  });

  return { success: "Book added!" };
};
