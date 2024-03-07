import BookWidget from "@/components/book-widget";
import FavBooksList from "@/components/fav-books-list";
import FriendsList from "@/components/friends-list";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import UserBar from "@/components/user-bar";
import { db } from "@/lib/db";
import { BookStatus } from "@prisma/client";
import { UserPlus } from "lucide-react";

const HomePage = async ({
  params,
}: {
  params: { userId: string; authorId: string };
}) => {
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

  if (!user) {
    return;
  }

  const favouriteBooks = user.books.filter(
    (book) => book.bookStatus === BookStatus.READING,
  );

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5 overflow-y-scroll">
      <UserBar user={user} />
      <div className="flex gap-10 w-full pt-10 px-[5%] h-full">
        <div className="flex flex-col w-full h-full gap-20 p-2">
          <FriendsList />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-light">Today&apos;s quotes</p>
            <Separator className="bg-slate-800 shadow-md" />
          </div>
        </div>
        <FavBooksList favBooks={favouriteBooks} />
      </div>
    </div>
  );
};

export default HomePage;
