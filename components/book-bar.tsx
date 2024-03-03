import { cn } from "@/lib/utils";
import { Book } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const headingFont = localFont({
  src: "./../public/fonts/IstokWeb-Regular.ttf",
});

interface BookBarProps {
  book: Book;
}

const BookBar = ({ book }: BookBarProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-5">
        <div className="w-36">
          <Image src={book.imageUrl} alt="book" height={100} width={200} />
        </div>
        <div className="flex flex-col space-y-2">
          <p
            className={cn(
              "text-6xl font-light text-slate-800",
              headingFont.className,
            )}
          >
            {book.bookName}
          </p>
          <Button
            variant="link"
            className={cn(
              "text-4xl p-0 font-extralight text-slate-800",
              headingFont.className,
            )}
          >
            {book.bookAuthor}
          </Button>
          <Badge className="font-extralight text-xl w-min">
            {book.bookGenre}
          </Badge>
        </div>
      </div>
      <div>
        <p>
          <span className="font-thin">ISBN:</span>
          {book.bookISBN}
        </p>
        <p>
          <span className="font-thin">Publisher:</span>
          {book.bookPublisher}
        </p>
      </div>
    </div>
  );
};

export default BookBar;
