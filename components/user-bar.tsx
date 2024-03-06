"use client";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import localFont from "next/font/local";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserWithBooks } from "@/types";

const headingFont = localFont({
  src: "./../public/fonts/Lora-Regular.ttf",
});

interface UserBarProps {
  user: UserWithBooks;
}

const UserBar = ({ user }: UserBarProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-5 items-center">
        <div className="w-36 h-36 border-8 border-white rounded-full">
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
                  "text-5xl font-light text-slate-800 p-0 m-0",
                  headingFont.className,
                )}
              >
                {user.name}
              </p>
              <p className={cn("text-xl font-light text-slate-800 p-0 m-0")}>
                <span className="font-medium">{user.books.length}</span> books
                in library
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

export default UserBar;
