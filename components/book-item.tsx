"use client";
import { BookWithAuthors } from "@/types";
import { PenTool } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

interface AuthorItemProps {
  book: BookWithAuthors;
}

const BookItem = ({ book }: AuthorItemProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`/library/book/${book.id}`);
  };
  return (
    <div onClick={onClick} className="flex w-full bg-white p-2 md:space-x-5">
      <div className="h-40 hidden md:block">
        {book.imageUrl.length > 0 ? (
          <Image src={book.imageUrl} alt="book" height={70} width={105} />
        ) : (
          <div className="w-full h-full items-center justify-center flex bg-neutral-200">
            <p>No book cover</p>
          </div>
        )}
      </div>
      <div className="h-full flex flex-col items-start">
        <p className="whitespace-nowrap text-3xl">{book.bookName}</p>
        <p className="whitespace-nowrap text-2xl font-light">
          {book.bookPublisher}
        </p>
        <p className="whitespace-nowrap text-1xl font-extralight">
          ISBN: {book.bookISBN}
        </p>
        <div className="bg-slate-800 text-white px-4 py-1 mt-5 rounded-full">
          {book.bookGenre}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
