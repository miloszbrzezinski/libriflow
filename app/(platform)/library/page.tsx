"use client";
import { getUserWithData } from "@/actions/user";
import { BookWidget } from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { TabButton } from "@/components/tab-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { BookWithAuthors } from "@/types";
import { BookStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LibraryPage = () => {
  const user = useCurrentUser();
  const [books, setBooks] = useState<BookWithAuthors[] | undefined>();
  const [filteredBooks, setFilteredBooks] = useState<
    BookWithAuthors[] | undefined
  >();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("status");

  useEffect(() => {
    getUserWithData(user!.id!).then((data) => {
      if (data) {
        setBooks(data.user?.books);
      }
    });
  }, []);

  if (!search) {
    router.push(`?status=all`);
  }

  useEffect(() => {
    switch (search) {
      case "all":
        setFilteredBooks(books);
        break;
      case "readed":
        setFilteredBooks(
          books?.filter((book) => book.bookStatus === BookStatus.READED),
        );
        break;
      case "reading":
        setFilteredBooks(
          books?.filter((book) => book.bookStatus === BookStatus.READING),
        );
        break;
      case "unread":
        setFilteredBooks(
          books?.filter((book) => book.bookStatus === BookStatus.NOT_REDED),
        );
        break;
      case "wish_list":
        setFilteredBooks(
          books?.filter((book) => book.bookStatus === BookStatus.WISH_LIST),
        );
        break;
      case "favourites":
        setFilteredBooks(books?.filter((book) => book.isFavourite));
        break;
    }
  }, [books, search]);

  const onClick = (filter: string) => {
    router.push(`?status=${filter}`);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-3 bg-amber-50/20 md:p-5 p-2 overflow-y-scroll">
      <Navbar title="library" />
      <div className="md:flex grid grid-cols-3 gap-2 w-full">
        <TabButton param="status" value="all" name="All" />
        <TabButton param="status" value="favourites" name="Favourites" />
        <TabButton param="status" value="readed" name="Readed" />
        <TabButton param="status" value="reading" name="Reading" />
        <TabButton param="status" value="unread" name="Unread" />
        <TabButton param="status" value="wish_list" name="Wish list" />
      </div>
      {filteredBooks && filteredBooks.length === 0 && (
        <div className="flex flex-col w-full h-full items-center justify-center space-y-5">
          <p className="text-4xl text-slate-700">
            You do not have any books yet
          </p>
          <Link href={"add-book"} className="hover:underline">
            Add first here
          </Link>
        </div>
      )}
      <div className="gap-4 md:pt-10 ">
        {filteredBooks ? (
          <div className="grid grid-flow-row-dense lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 space-y-[1px]">
            {filteredBooks.map((book) => (
              <BookWidget key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <BookWidget.Skeleton />
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
