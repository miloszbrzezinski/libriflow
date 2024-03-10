import BookBar from "@/components/book-bar";
import BookBarMobile from "@/components/book-bar-mobile";
import BookDescription from "@/components/book-description";
import BookNotesList from "@/components/book-notes-list";
import BookSidebar from "@/components/book-sidebar";
import { BookWidget } from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Link from "next/link";

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

  return (
    <div className="md:flex w-full h-full bg-amber-50/20">
      <BookBarMobile book={book} />
      <BookSidebar book={book} />
      <div className="flex flex-col gap-2 w-full items-center justify-center md:p-5 mb-5 overflow-y-scroll">
        <BookNotesList notes={book.bookNotes} />
      </div>
    </div>
  );
};

export default LibraryPage;
