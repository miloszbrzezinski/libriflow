"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { AddBookSchema, EditAuthor, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { BookStatus } from "@prisma/client";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const editAuthor = async (
  userId: string,
  authorId: string,
  values: z.infer<typeof EditAuthor>,
) => {
  const validatedFields = EditAuthor.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong!" };
  }

  const { imageUrl, authorName } = validatedFields.data;

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      authors: {
        update: {
          where: {
            id: authorId,
          },
          data: {
            imageUrl,
            name: authorName,
          },
        },
      },
    },
  });

  return { success: "Author Edited!" };
};
