"use client";
import { Author } from "@prisma/client";
import { PenTool } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

interface AuthorItemProps {
  author: Author;
}

export const AuthorItem = ({ author }: AuthorItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`authors/${author.id}`);
  };
  return (
    <div onClick={onClick} className="flex w-full bg-white p-2 space-x-5">
      <div className="md:w-32 md:h-32 h-20 w-20 rounded-full">
        {author.imageUrl.length > 0 ? (
          <Image
            src={author.imageUrl}
            alt="book"
            height={100}
            width={200}
            className="rounded-full md:w-32 md:h-32 w-20 h-20"
          />
        ) : (
          <div className="w-full h-full rounded-full items-center justify-center flex bg-neutral-200">
            <PenTool />
          </div>
        )}
      </div>
      <div className="h-full flex items-center">
        <p className="md:whitespace-nowrap md:text-3xl text-xl">
          {author.name}
        </p>
      </div>
    </div>
  );
};

AuthorItem.Skeleton = function SkeletonAuthorItem() {
  return (
    <div className="flex w-full bg-white p-2 space-x-5">
      <Skeleton className="w-32 h-32 rounded-full" />
      <div className="h-full flex items-center">
        <Skeleton className="h-8 w-40" />
      </div>
    </div>
  );
};
