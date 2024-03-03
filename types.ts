import { Author, Book } from "@prisma/client";

export type BookWithAuthors = Book & {
  author: Author;
};
