import BookBar from "@/components/book-bar";
import BookBarMobile from "@/components/book-bar-mobile";
import BookDescription from "@/components/book-description";
import BookNotesList from "@/components/book-notes-list";
import BookPage from "@/components/book-page";
import BookSidebar from "@/components/book-sidebar";
import { BookWidget } from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { BookWithAuthors } from "@/types";
import { BookNote } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LibraryPage = async ({
  params,
}: {
  params: { userId: string; bookId: string };
}) => {
  const book = await db.book.findUnique({
    where: {
      id: params.bookId,
    },
    include: {
      author: true,
      bookNotes: {
        orderBy: {
          page: "asc",
        },
      },
    },
  });

  if (!book) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center bg-neutral-200 p-5">
        <p>Book not found</p>
      </div>
    );
  }

  return <BookPage book={book} notes={book.bookNotes} />;
};

export default LibraryPage;
