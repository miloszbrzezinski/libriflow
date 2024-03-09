"use client";
import { getUserWithData } from "@/actions/user";
import BookWidget from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { BookWithAuthors } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const LibraryPage = () => {
  const user = useCurrentUser();
  const [books, setBooks] = useState<BookWithAuthors[] | undefined>();

  useEffect(() => {
    getUserWithData(user!.id!).then((data) => {
      if (data) {
        setBooks(data.user?.books);
        console.log(books);
      }
    });
  }, []);

  // const books = await db.book.findMany({
  //   where: {
  //     userId: params.userId,
  //   },
  //   include: {
  //     author: true,
  //   },
  // });

  if (!books) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full space-y-3 bg-amber-50/20 p-5 overflow-y-scroll">
      <Navbar title="library" />
      <div className="flex gap-2 w-full">
        <div className="flex items-center justify-center w-min p-1 px-4 rounded-md whitespace-nowrap text-white bg-slate-800 select-none">
          All
        </div>
        <div className="flex items-center justify-center w-min p-1 px-4 rounded-md whitespace-nowrap text-slate-800 border border-slate-800 select-none">
          Favourites
        </div>
        <div className="flex items-center justify-center w-min p-1 px-4 rounded-md whitespace-nowrap text-slate-800 border border-slate-800 select-none">
          Readed
        </div>
        <div className="flex items-center justify-center w-min p-1 px-4 rounded-md whitespace-nowrap text-slate-800 border border-slate-800 select-none">
          Reading
        </div>
        <div className="flex items-center justify-center w-min p-1 px-4 rounded-md whitespace-nowrap text-slate-800 border border-slate-800 select-none">
          Not readed
        </div>
        <div className="flex items-center justify-center w-min p-1 px-4 rounded-md whitespace-nowrap text-slate-800 border border-slate-800 select-none">
          Wish list
        </div>
      </div>
      {books.length === 0 && (
        <div className="flex flex-col w-full h-full items-center justify-center space-y-5">
          <p className="text-4xl text-slate-700">
            You do not have any books yet
          </p>
          <Link href={"add-book"} className="hover:underline">
            Add first here
          </Link>
        </div>
      )}
      <div className="grid grid-flow-row-dense lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 pt-10 ">
        {books.map((book) => (
          <BookWidget key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
