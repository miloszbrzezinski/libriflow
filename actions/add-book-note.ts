"use server";

import { db } from "@/lib/db";

export const addBookNote = async (userId: string, bookId: string) => {
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
                  page: 0,
                  note: "new note",
                  isQuotation: false,
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
