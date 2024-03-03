import BookBar from "@/components/book-bar";
import BookWidget from "@/components/book-widget";
import Navbar from "@/components/navbar";
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
  });

  if (!book) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm p-5">
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm p-5">
      <BookBar book={book} />
      <div className="flex gap-2 w-full"></div>
    </div>
  );
};

export default LibraryPage;
