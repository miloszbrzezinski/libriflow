"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Check, Gift, Heart, Loader, X } from "lucide-react";
import { Button } from "./ui/button";
import { Book, BookStatus } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookWithAuthors } from "@/types";

interface BookWidgetProps {
  book: BookWithAuthors;
}

const BookWidget = ({ book }: BookWidgetProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`library/book/${book.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="group flex p-2 bg-white rounded-lg shadow-md w-min"
    >
      <div className="w-48 items-center flex">
        {book.imageUrl.length > 0 ? (
          <Image src={book.imageUrl} alt="book" height={100} width={200} />
        ) : (
          <div className="w-full h-full items-center justify-center flex bg-neutral-200">
            <p>No book cover</p>
          </div>
        )}
      </div>
      <div className="p-2 justify-between flex flex-col">
        <div>
          <p className="whitespace-nowrap text-2xl">{book.bookName}</p>
          <Button
            variant="link"
            className="whitespace-nowrap text-xl font-light p-0 h-min m-0"
          >
            {book.author.name}
          </Button>
          <p className="whitespace-nowrap text-md font-extralight">
            {book.bookPublisher}
          </p>
          <div>
            <Badge className="font-light">{book.bookGenre}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className={cn(
              "flex space-x-2 p-1 px-3 font-extralight outline-none h-min rounded-full select-none",
              book.bookStatus === BookStatus.READED && "bg-green-700",
              book.bookStatus === BookStatus.READING && "bg-sky-700",
              book.bookStatus === BookStatus.NOT_REDED && "bg-neutral-700",
              book.bookStatus === BookStatus.WISH_LIST && "bg-orange-700",
            )}
          >
            {book.bookStatus === BookStatus.READED && (
              <div className="flex space-x-2 text-white whitespace-nowrap">
                <Check strokeWidth={1} />
                <span>Readed</span>
              </div>
            )}
            {book.bookStatus === BookStatus.READING && (
              <div className="flex space-x-2 text-white whitespace-nowrap">
                <Loader strokeWidth={1} />
                <span>Reading</span>
              </div>
            )}
            {book.bookStatus === BookStatus.NOT_REDED && (
              <div className="flex space-x-2 text-white whitespace-nowrap">
                <X strokeWidth={1} />
                <span>Not readed</span>
              </div>
            )}
            {book.bookStatus === BookStatus.WISH_LIST && (
              <div className="flex space-x-2 text-white whitespace-nowrap">
                <Gift strokeWidth={1} />
                <span>Wish list</span>
              </div>
            )}
          </div>
          <div className="flex w-10">
            <Badge
              className={cn(
                "bg-gradient-to-tr from-rose-900 to-rose-700 text-white space-x-2 hidden",
                book.isFavourite && "block",
              )}
            >
              <Heart strokeWidth={1.5} className="w-6 h-6" />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookWidget;
