"use client";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BookWithAuthors, UserWithBooks } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "./ui/skeleton";

const headingFont = localFont({
  src: "./../public/fonts/Lora-Regular.ttf",
});

interface UserBarProps {
  books: BookWithAuthors[];
}

export const UserBar = ({ books }: UserBarProps) => {
  const user = useCurrentUser();

  if (!user) {
    return;
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex md:space-x-5 items-center">
        <div className="w-36 h-36 border-8 border-white rounded-full hidden md:block">
          {user.image ? (
            <Image src={user.image} alt="book" height={100} width={200} />
          ) : (
            <div className="w-full h-full rounded-full items-center justify-center flex bg-neutral-200">
              <UserIcon strokeWidth={1} className="w-20 h-20" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-start space-y-0">
              <p
                className={cn(
                  "md:text-5xl text-3xl font-light text-slate-800 p-0 m-0",
                  headingFont.className,
                )}
              >
                {user.name}
              </p>
              <p
                className={cn(
                  "text-sm md:text-xl font-light text-slate-800 p-0 m-0",
                )}
              >
                <span className="font-medium">{books.length}</span> books in
                library
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

UserBar.Skeleton = function SkeletonUserBar() {
  return (
    <div className="flex justify-between w-full">
      <div className="md:space-x-5 items-center flex">
        <Skeleton className="w-36 h-36 border-8 border-white bg-stone-400 rounded-full hidden md:block" />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col md:space-y-4 space-y-1">
            <div className="flex flex-col justify-start md:space-y-3 space-y-1">
              <Skeleton className="md:w-96 w-72 md:h-12 h-8 bg-stone-400" />
              <Skeleton className="w-40 h-5 bg-stone-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
