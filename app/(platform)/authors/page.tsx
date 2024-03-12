"use client";
import { getAuthorsWithData } from "@/actions/user";
import { AuthorItem } from "@/components/author-item";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { AuthorWithBooks } from "@/types";
import { Author } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthorsPage = () => {
  const user = useCurrentUser();
  const [authors, setAuthors] = useState<Author[] | undefined>();

  useEffect(() => {
    getAuthorsWithData(user!.id!).then((data) => {
      if (data) {
        setAuthors(data!.authors);
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 md:p-5 p-2">
      <Navbar title="authors" />
      <div className="flex flex-col gap-[1px] w-full h-full md:pt-10">
        {authors && authors.length === 0 && (
          <div className="flex flex-col w-full h-full items-center justify-center space-y-5">
            <p className="text-4xl text-slate-700">
              You do not have any authors yet
            </p>
            <Link href={"add-book"} className="hover:underline">
              Add first book here
            </Link>
          </div>
        )}
        {authors ? (
          <div className="flex flex-col space-y-[1px] mb-20 overflow-y-scroll">
            {authors.map((author) => (
              <AuthorItem key={author.id} author={author} />
            ))}
          </div>
        ) : (
          <AuthorItem.Skeleton />
        )}
      </div>
    </div>
  );
};

export default AuthorsPage;
