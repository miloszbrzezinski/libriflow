"use client";
import { getUserWithData } from "@/actions/user";
import BooksList from "@/components/books-list";
import FriendsList from "@/components/friends-list";
import QuotesList from "@/components/quotes-list";
import UserBar from "@/components/user-bar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { BookWithAuthors } from "@/types";
import { BookStatus } from "@prisma/client";
import { useEffect, useState } from "react";

const HomePage = () => {
  const user = useCurrentUser();
  const [books, setBooks] = useState<BookWithAuthors[] | undefined>();
  let currentBooks: BookWithAuthors[] | undefined;

  useEffect(() => {
    getUserWithData(user!.id!).then((data) => {
      if (data) {
        setBooks(data.user?.books);
        console.log(books);
      }
    });
  }, []);

  if (books) {
    currentBooks = books.filter(
      (book) => book.bookStatus === BookStatus.READING,
    );
  }

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5 overflow-y-scroll">
      {books && <UserBar books={books} />}
      <div className="flex gap-10 w-full pt-10 h-full justify-center">
        <div className="flex flex-col w-2/3 h-full gap-20 p-2">
          <FriendsList />
          <QuotesList />
        </div>
        {currentBooks && (
          <BooksList books={currentBooks!} noBooksMesage="Nothing here" />
        )}
      </div>
    </div>
  );
};

export default HomePage;
