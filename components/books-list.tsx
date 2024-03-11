import { BookWithAuthors } from "@/types";
import { BookWidget } from "./book-widget";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface BooksListProps {
  books: BookWithAuthors[];
  title: String;
  noBooksMesage: String;
  lock: boolean;
}

export const BooksList = ({
  books,
  title,
  noBooksMesage,
  lock,
}: BooksListProps) => {
  return (
    <div className="flex flex-col gap-2 md:w-min w-full p-2 h-full">
      <p className="text-2xl font-light">{title}</p>
      <Separator className="bg-slate-800 shadow-md" />
      <div className="h-full flex-col flex gap-2 overflow-y-scroll">
        {books.length > 0 ? (
          books.map((book) => (
            <BookWidget key={book.id} book={book} lock={lock} />
          ))
        ) : (
          <p className="whitespace-nowrap text-3xl px-5 pt-5 font-semibold text-stone-400">
            {noBooksMesage}
          </p>
        )}
      </div>
    </div>
  );
};

BooksList.Skeleton = function SkeletonBooksList() {
  return (
    <div className="flex flex-col gap-2 w-min p-2 h-full">
      <Skeleton className="h-5 w-40 bg-stone-400" />
      <Separator className="bg-slate-800 shadow-md" />
      <div className="h-full flex-col flex gap-2 overflow-y-scroll">
        <BookWidget.Skeleton />
      </div>
    </div>
  );
};
