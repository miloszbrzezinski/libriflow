import { BookWithAuthors } from "@/types";
import BookWidget from "./book-widget";
import { Separator } from "./ui/separator";

interface FavBooksListProps {
  favBooks: BookWithAuthors[];
}

const FavBooksList = ({ favBooks }: FavBooksListProps) => {
  return (
    <div className="flex flex-col gap-2 w-min p-2 h-full">
      <p className="text-2xl font-light">Reading</p>
      <Separator className="bg-slate-800 shadow-md" />
      <div className="h-full flex-col flex gap-2 overflow-y-scroll">
        {favBooks.map((favBook) => (
          <BookWidget key={favBook.id} book={favBook} />
        ))}
      </div>
    </div>
  );
};

export default FavBooksList;
