"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const addAuthor = async (userId: string, authorName: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      authors: {
        create: {
          name: authorName,
          imageUrl: "",
        },
      },
    },
  });

  return { success: "Book added!" };
};
