"use client";
import { Author } from "@prisma/client";
import { PenTool } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

interface AuthorItemProps {
  author: Author;
}

const AuthorItem = ({ author }: AuthorItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`authors/${author.id}`);
  };
  return (
    <div onClick={onClick} className="flex w-full bg-white p-2 space-x-5">
      <div className="w-32 h-32 rounded-full">
        {author.imageUrl.length > 0 ? (
          <Image
            src={author.imageUrl}
            alt="book"
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
      <div className="h-full flex items-center">
        <p className="whitespace-nowrap text-3xl">{author.name}</p>
      </div>
    </div>
  );
};

export default AuthorItem;
