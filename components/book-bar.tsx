import { cn } from "@/lib/utils";
import { Book } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import BookStatusButton from "./book-status-button";

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
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-2">
            <p
              className={cn(
                "text-6xl font-light text-slate-800 p-0 m-0",
                headingFont.className,
              )}
            >
              {book.bookName}
            </p>
            <Button
              variant="link"
              className={cn(
                "text-3xl font-extralight text-slate-800 px-0 py-0 w-min h-min",
              )}
            >
              {book.bookAuthor}
            </Button>
            <Badge className="font-extralight px-4 text-xl w-min">
              {book.bookGenre}
            </Badge>
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
      </div>
      <div className="flex space-x-4">
        <BookStatusButton bookStatus={book.bookStatus} />
        <Button variant="outline" className="bg-transparent border-slate-500">
          <Star strokeWidth={1} />
          Add to Favourite
        </Button>
      </div>
    </div>
  );
};

export default BookBar;
