"use client";
import { cn } from "@/lib/utils";
import { Author, Book } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Heart, PenTool, Star } from "lucide-react";
import BookStatusButton from "./book-status-button";
import { useParams, useRouter } from "next/navigation";
import { bookFavourite } from "@/actions/book-favourite";
import { BookWithAuthors } from "@/types";

const headingFont = localFont({
  src: "./../public/fonts/IstokWeb-Regular.ttf",
});

interface AuthorBarProps {
  author: Author;
}

const AuthorBar = ({ author }: AuthorBarProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-5 items-center">
        <div className="w-36 h-36 border-8 border-white rounded-full">
          {author.imageUrl.length > 0 ? (
            <Image src={author.imageUrl} alt="book" height={100} width={200} />
          ) : (
            <div className="w-full h-full rounded-full items-center justify-center flex bg-neutral-200">
              <PenTool />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-start space-y-0">
              <p
                className={cn(
                  "text-5xl font-light text-slate-800 p-0 m-0",
                  headingFont.className,
                )}
              >
                {author.name}
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
