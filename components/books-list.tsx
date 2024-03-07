import { BookWithAuthors } from "@/types";
import BookWidget from "./book-widget";
import { Separator } from "./ui/separator";

interface BooksListProps {
  books: BookWithAuthors[];
  noBooksMesage: String;
}

const BooksList = ({ books, noBooksMesage }: BooksListProps) => {
  return (
    <div className="flex flex-col gap-2 w-min p-2 h-full">
      <p className="text-2xl font-light">Reading</p>
      <Separator className="bg-slate-800 shadow-md" />
      <div className="h-full flex-col flex gap-2 overflow-y-scroll">
        {books.length > 0 ? (
          books.map((book) => <BookWidget key={book.id} book={book} />)
        ) : (
          <p className="whitespace-nowrap text-3xl px-5 pt-5 font-semibold text-stone-400">
            {noBooksMesage}
          </p>
        )}
      </div>
    </div>
  );
};

export default BooksList;
