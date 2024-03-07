"use client";
import { cn } from "@/lib/utils";
import { Author, Book } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Edit, Heart, PenTool, Star, Trash } from "lucide-react";
import BookStatusButton from "./book-status-button";
import { useParams, useRouter } from "next/navigation";
import { bookFavourite } from "@/actions/book-favourite";
import { AuthorWithBooks, BookWithAuthors } from "@/types";
import { useModal } from "@/hooks/use-modal-store";

const headingFont = localFont({
  src: "./../public/fonts/Lora-Regular.ttf",
});

interface AuthorBarProps {
  author: AuthorWithBooks;
}

const AuthorBar = ({ author }: AuthorBarProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-5 items-center">
        <div className="w-36 h-36 border-8 border-white rounded-full">
          {author.imageUrl.length > 0 ? (
            <Image
              src={author.imageUrl}
              alt="author image"
              height={100}
              width={200}
              className="rounded-full w-32 h-32"
            />
          ) : (
            <div className="w-full h-full rounded-full items-center justify-center flex bg-neutral-200">
              <PenTool />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-start space-y-0">
              <div
                className={cn(
                  "group space-x-4 flex justify-center items-center text-5xl font-light text-slate-800 p-0 m-0",
                  headingFont.className,
                )}
              >
                <p>{author.name}</p>
                <div className="ml-auto flex items-center gap-x-2">
                  <Edit
                    onClick={() => onOpen("editAuthor", { author })}
                    className="hidden group-hover:block w-6 h-6 text-slate-700 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                  />
                </div>
              </div>
              <p className={cn("text-xl font-light text-slate-800 p-0 m-0")}>
                <span className="font-medium">{author.books.length}</span> book
                {author.books.length > 1 && <span>s</span>} in library
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-4"></div>
        <div></div>
      </div>
    </div>
  );
};

export default AuthorBar;
