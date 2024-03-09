"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { BookNoteSchema } from "@/schemas";

export const addBookNote = async (
  userId: string,
  bookId: string,
  values: z.infer<typeof BookNoteSchema>,
  isQuotation: boolean,
) => {
  const validatedFields = BookNoteSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong!" };
  }

  const { pageNo, bookNote } = validatedFields.data;

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
            bookNotes: {
              create: [
                {
                  page: pageNo,
                  note: bookNote,
                  isQuotation,
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
