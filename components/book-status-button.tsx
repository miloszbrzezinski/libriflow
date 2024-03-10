"use client";
import { Check, Gift, Loader, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BookStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { changeBookStatus } from "@/actions/book-status";
import { useParams, useRouter } from "next/navigation";

interface BookStatusButtonProps {
  bookStatus: BookStatus;
}

const BookStatusButton = ({ bookStatus }: BookStatusButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();

  const onClick = (status: BookStatus) => {
    startTransition(() => {
      changeBookStatus(String(params.bookId), status).then((data) => {
        // setError(data.error);
        if (data.success) {
          router.refresh();
        }
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex space-x-2 p-1 md:px-4 px-2 outline-none h-min rounded-full select-none md:text-md text-sm w-min whitespace-nowrap",
          bookStatus === BookStatus.READED && "bg-green-700",
          bookStatus === BookStatus.READING && "bg-sky-700",
          bookStatus === BookStatus.NOT_REDED && "bg-neutral-700",
          bookStatus === BookStatus.WISH_LIST && "bg-orange-700",
        )}
      >
        {bookStatus === BookStatus.READED && (
          <div className="flex space-x-2 text-white items-center">
            <Check strokeWidth={1} className="w-5 h-5" />
            <span>Read</span>
          </div>
        )}
        {bookStatus === BookStatus.READING && (
          <div className="flex space-x-2 text-white items-center">
            <Loader strokeWidth={1} className="w-5 h-5" />
            <span>Reading</span>
          </div>
        )}
        {bookStatus === BookStatus.NOT_REDED && (
          <div className="flex space-x-2 text-white items-center">
            <X strokeWidth={1} className="w-5 h-5" />
            <span>Unread</span>
          </div>
        )}
        {bookStatus === BookStatus.WISH_LIST && (
          <div className="flex space-x-2 text-white items-center">
            <Gift strokeWidth={1} className="w-5 h-5" />
            <span>Wish list</span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="space-x-2"
          onClick={() => {
            onClick(BookStatus.READED);
          }}
        >
          <div className="rounded-full flex w-4 h-4 bg-green-700" />
          <span>Read</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="space-x-2"
          onClick={() => {
            onClick(BookStatus.READING);
          }}
        >
          <div className="rounded-full flex w-4 h-4 bg-sky-700" />
          <span>Reading</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="space-x-2"
          onClick={() => {
            onClick(BookStatus.NOT_REDED);
          }}
        >
          <div className="rounded-full flex w-4 h-4 bg-neutral-700" />
          <span>Unread</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="space-x-2"
          onClick={() => {
            onClick(BookStatus.WISH_LIST);
          }}
        >
          <div className="rounded-full flex w-4 h-4 bg-orange-700" />
          <span>Wish list</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookStatusButton;
