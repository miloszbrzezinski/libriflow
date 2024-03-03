"use client";
import { cn } from "@/lib/utils";
import { Book } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Heart, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import BookStatusButton from "./book-status-button";
import { useParams, useRouter } from "next/navigation";
import { bookFavourite } from "@/actions/book-favourite";

const headingFont = localFont({
  src: "./../public/fonts/IstokWeb-Regular.ttf",
});

interface BookBarProps {
  book: Book;
}

const BookBar = ({ book }: BookBarProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    bookFavourite(String(params.bookId), !book.isFavourite).then((data) => {
      // setError(data.error);
      if (data.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-5">
        <div className="w-36">
          <Image
            src={book.imageUrl}
            alt="book cover"
            height={100}
            width={200}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-start space-y-0">
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
              <p className="text-2xl font-thin">{book.bookPublisher}</p>
            </div>
            <Badge className="font-extralight px-4 text-xl w-min">
              {book.bookGenre}
            </Badge>
          </div>
          <div>
            <p>
              <span className="font-thin">ISBN:</span>
              {book.bookISBN}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-4">
          <BookStatusButton bookStatus={book.bookStatus} />
          <Button
            onClick={onClick}
            variant="outline"
            className={cn(
              "bg-transparent border-slate-500 space-x-3 hover:bg-rose-300 hover:text-rose-900",
              book.isFavourite &&
                "bg-gradient-to-tr from-rose-900 to-rose-700 text-white space-x-2 hover:from-rose-800 hover:to-rose-600 hover:text-white",
            )}
          >
            {book.isFavourite && <Heart strokeWidth={1} />}
            {book.isFavourite && <span>Favourite</span>}
            {!book.isFavourite && <span>Add to Favourite</span>}
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BookBar;
