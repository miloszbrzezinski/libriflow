import { BookWithAuthors } from "@/types";
import BookBar from "./book-bar";
import { Separator } from "./ui/separator";
import BookDescription from "./book-description";

interface BookSidebar {
  book: BookWithAuthors;
}

const BookSidebar = ({ book }: BookSidebar) => {
  return (
    <div className="flex flex-col h-full w-[60%] shadow-lg shadow-stone-400 space-y-5 p-3">
      <div>
        <BookBar book={book} />
        <Separator />
      </div>
      <div className="flex flex-col justify-between h-full overflow-y-scroll">
        <BookDescription book={book} />
        <div>
          <Separator />
          <div className="flex justify-between items-center py-1 whitespace-nowrap">
            <div>
              <p>
                <span className="font-thin">ISBN:</span>
                {book.bookISBN}
              </p>
              <p className="font-light">{book.bookYear}</p>
            </div>

            <p className="text-xl font-thin">{book.bookPublisher}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSidebar;
