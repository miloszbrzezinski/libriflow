import { Check, Gift, Loader, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BookStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

interface BookStatusButtonProps {
  bookStatus: BookStatus;
}

const BookStatusButton = ({ bookStatus }: BookStatusButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex space-x-2 hover:bg-stone-200 dark:hover:bg-neutral-700/60 p-2 px-4 outline-none h-min rounded-full",
          bookStatus === BookStatus.READED && "bg-green-700",
          bookStatus === BookStatus.READING && "bg-sky-700",
          bookStatus === BookStatus.NOT_REDED && "bg-neutral-700",
          bookStatus === BookStatus.WISH_LIST && "bg-orange-700",
        )}
      >
        {bookStatus === BookStatus.READED && (
          <div className="flex space-x-2 text-white">
            <Check />
            <span>Readed</span>
          </div>
        )}
        {bookStatus === BookStatus.READING && (
          <div className="flex space-x-2 text-white">
            <Loader />
            <span>Reading</span>
          </div>
        )}
        {bookStatus === BookStatus.NOT_REDED && (
          <div className="flex space-x-2 text-white">
            <X />
            <span>Not readed</span>
          </div>
        )}
        {bookStatus === BookStatus.WISH_LIST && (
          <div className="flex space-x-2 text-white">
            <Gift />
            <span>Wish list</span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="space-x-2">
          <div className="rounded-full flex w-4 h-4 bg-green-700"></div>
          <span>Readed</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2">
          <div className="rounded-full flex w-4 h-4 bg-sky-700"></div>
          <span>Reading</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2">
          <div className="rounded-full flex w-4 h-4 bg-neutral-700"></div>
          <span>Not readed</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2">
          <div className="rounded-full flex w-4 h-4 bg-orange-700"></div>
          <span>Wish list</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookStatusButton;
