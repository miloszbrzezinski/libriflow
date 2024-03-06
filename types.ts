import { Author, Book, User } from "@prisma/client";

export type BookWithAuthors = Book & {
  author: Author;
};

export type UserWithBooks = User & {
  books: Book[];
};

export type AuthorWithBooks = Author & {
  books: Book[];
};
