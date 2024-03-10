"use client";
import { cn } from "@/lib/utils";
import { Book } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Edit, Heart, Star, Trash } from "lucide-react";
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
import { BookWithAuthors } from "@/types";
import { useModal } from "@/hooks/use-modal-store";

const headingFont = localFont({
  src: "./../public/fonts/Lora-Regular.ttf",
});

interface BookBarProps {
  book: BookWithAuthors;
}

const BookBar = ({ book }: BookBarProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const onClick = () => {
    bookFavourite(String(params.bookId), !book.isFavourite).then((data) => {
      // setError(data.error);
      if (data.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex space-x-5">
        <div className="min-w-36 h-54 space-y-2">
          {book.imageUrl.length > 0 ? (
            <Image src={book.imageUrl} alt="book" height={200} width={150} />
          ) : (
            <div className="w-full h-56 items-center justify-center flex bg-neutral-200">
              <p>No book cover</p>
            </div>
          )}
          <Button
            onClick={onClick}
            variant="outline"
            className={cn(
              "bg-transparent w-full border-slate-500 space-x-3 hover:bg-rose-300 hover:text-rose-900",
              book.isFavourite &&
                "bg-gradient-to-tr from-rose-900 to-rose-700 border-rose-500 text-white space-x-2 hover:from-rose-800 hover:to-rose-600 hover:text-white",
            )}
          >
            {book.isFavourite && <Heart strokeWidth={1} />}
            {book.isFavourite && <span>Favourite</span>}
            {!book.isFavourite && <span>Add to Favourite</span>}
          </Button>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-start space-y-0">
              <div
                className={cn(
                  "group space-x-4 flex justify-start items-center text-5xl font-light text-slate-800 p-0 m-0",
                  headingFont.className,
                )}
              >
                <p>{book.bookName}</p>
                <div className="ml-auto flex items-center gap-x-2">
                  <Edit
                    onClick={() => onOpen("editBook", { book })}
                    className="hidden group-hover:block w-6 h-6 text-slate-700 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                  />
                  <Trash
                    onClick={() => onOpen("deleteBook", { book })}
                    className="hidden group-hover:block w-6 h-6 text-slate-700 hover:text-rose-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push(`/authors/${book.author.id}`);
                }}
                variant="link"
                className={cn(
                  "text-3xl font-extralight text-slate-800 px-0 py-0 w-min h-min",
                )}
              >
                {book.author.name}
              </Button>
            </div>
            <div className="flex space-x-5">
              <Badge className="font-extralight px-4 text-md w-min whitespace-nowrap">
                {book.bookGenre}
              </Badge>
              <BookStatusButton bookStatus={book.bookStatus} />
            </div>
          </div>
          <div className="flex w-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex space-x-4"></div>
      </div>
    </div>
  );
};

export default BookBar;
