"use client";
import { BookWithAuthors } from "@/types";
import BookBarMobile from "./book-bar-mobile";
import BookNotesList from "./book-notes-list";
import BookSidebar from "./book-sidebar";
import { Author, BookNote } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

interface BookPageProps {
  book: BookWithAuthors;
  authors: Author[];
  notes: BookNote[];
}

const BookPage = ({ book, authors, notes }: BookPageProps) => {
  const user = useCurrentUser();
  const router = useRouter();

  if (user?.id !== book.userId) {
    router.push(`/home`);
  }

  if (user?.id === book.userId) {
    return (
      <div className="md:flex w-full h-full bg-amber-50/20">
        <BookBarMobile book={book} authors={authors} />
        <BookSidebar book={book} authors={authors} />
        <div className="flex flex-col gap-2 w-full items-center justify-center md:p-5 mb-5 overflow-y-scroll">
          <BookNotesList notes={notes} />
        </div>
      </div>
    );
  }
};

export default BookPage;
