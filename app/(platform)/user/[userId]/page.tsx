import { getUserWithData } from "@/actions/user";
import { BooksList } from "@/components/books-list";
import FriendsList from "@/components/friends-list";
import QuotesList from "@/components/quotes-list";
import { UserBar } from "@/components/user-bar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { BookWithAuthors } from "@/types";
import { BookStatus } from "@prisma/client";
import { useEffect, useState } from "react";

const HomePage = async ({ params }: { params: { userId: string } }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      books: {
        include: {
          author: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 md:p-5 md:pb-5 p-2 pb-28 overflow-y-scroll">
      <UserBar user={user!} />
      <div className="md:flex gap-10 w-full pt-10 h-full justify-center">
        {user!.books ? (
          <BooksList
            title={"Favourites"}
            books={user?.books!}
            noBooksMesage="Nothing here"
            lock={true}
          />
        ) : (
          <BooksList.Skeleton />
        )}
      </div>
    </div>
  );
};

export default HomePage;
