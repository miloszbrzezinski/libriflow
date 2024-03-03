"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Check, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Book } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";

interface BookWidgetProps {
  book: Book;
}

const BookWidget = ({ book }: BookWidgetProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`book/${book.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="group flex p-2 bg-white rounded-lg shadow-md w-min"
    >
      <div className="w-48">
        <Image src={book.imageUrl} alt="book" height={100} width={200} />
      </div>
      <div className="p-2 justify-between flex flex-col">
        <div>
          <p className="whitespace-nowrap text-2xl">{book.bookName}</p>
          <Button
            variant="link"
            className="whitespace-nowrap text-xl font-light p-0 h-min m-0"
          >
            {book.bookAuthor}
          </Button>
          <div>
            <Badge className="font-light">{book.bookGenre}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-900 text-white space-x-2">
            <Check strokeWidth={1} className="w-4 h-4" />{" "}
            <span className="font-light">Readed</span>
          </Badge>
          <Badge className="bg-rose-900 text-white space-x-2">
            <Heart strokeWidth={1} className="w-4 h-4" />{" "}
            <span className="font-light">432</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default BookWidget;
