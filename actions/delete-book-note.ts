"use server";

import { db } from "@/lib/db";

export const deleteBookNote = async (bookNoteId: string) => {
  if (!bookNoteId) {
    return { error: "Something went wrong!" };
  }

  await db.bookNote.delete({
    where: {
      id: bookNoteId,
    },
  });

  return { success: "Book note deleted!" };
};
