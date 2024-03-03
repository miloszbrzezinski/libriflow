"use server";

import { db } from "@/lib/db";
import { BookStatus } from "@prisma/client";

export const changeBookStatus = async (id: string, status: BookStatus) => {
  await db.book.update({
    where: {
      id,
    },
    data: {
      bookStatus: status,
    },
  });

  return { success: "Book status change!" };
};
