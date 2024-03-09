"use server";

import * as z from "zod";

import { db } from "@/lib/db";

export const getUserWithData = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      books: {
        include: {
          author: true,
        },
      },
    },
  });

  return { user };
};

export const getAuthorsWithData = async (userId: string) => {
  const authors = await db.author.findMany({
    where: {
      userId,
    },
  });

  return { authors };
};
