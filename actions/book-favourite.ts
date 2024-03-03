"use server";

import { db } from "@/lib/db";
import { BookStatus } from "@prisma/client";

export const bookFavourite = async (id: string, isFavourite: boolean) => {
  await db.book.update({
    where: {
      id,
    },
    data: {
      isFavourite,
    },
  });

  return { success: "Book status change!" };
};
