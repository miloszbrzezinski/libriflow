"use client";
import { getUserWithData } from "@/actions/user";
import { BooksList } from "@/components/books-list";
import FriendsList from "@/components/friends-list";
import QuotesList from "@/components/quotes-list";
import { UserBar } from "@/components/user-bar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { BookWithAuthors, UserWithData } from "@/types";
import { BookStatus, User } from "@prisma/client";
import { useEffect, useState } from "react";

const HomePage = () => {
  const user = useCurrentUser();
  const [userWithData, setUserWithData] = useState<UserWithData | undefined>();
  const [following, setFollowing] = useState<User[] | undefined>();
  const [books, setBooks] = useState<BookWithAuthors[] | undefined>();
  let currentBooks: BookWithAuthors[] | undefined;

  useEffect(() => {
    getUserWithData(user!.id!).then((data) => {
      if (data) {
        setBooks(data.user?.books);
        setUserWithData(data.user!);
        setFollowing(data.user?.following);
        console.log(books);
      }
    });
  }, []);

  if (books) {
    currentBooks = books.filter(
      (book) => book.bookStatus === BookStatus.READING,
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 md:p-5 md:pb-5 p-2 pb-28 overflow-y-scroll">
      {books ? <UserBar user={userWithData!} /> : <UserBar.Skeleton />}
      <div className="md:flex gap-10 w-full pt-10 h-full justify-center">
        <div className="flex flex-col md:w-2/3 w-full h-full md:gap-20 gap-5 p-2">
          <FriendsList usersList={following!} />
        </div>
        {currentBooks ? (
          <BooksList
            books={currentBooks!}
            title={"Reading list"}
            noBooksMesage="Nothing here"
            lock={false}
          />
        ) : (
          <BooksList.Skeleton />
        )}
      </div>
    </div>
  );
};

export default HomePage;
