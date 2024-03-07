import BooksList from "@/components/books-list";
import FriendsList from "@/components/friends-list";
import QuotesList from "@/components/quotes-list";
import UserBar from "@/components/user-bar";
import { db } from "@/lib/db";
import { BookStatus } from "@prisma/client";

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

  const currentBooks = user.books.filter(
    (book) => book.bookStatus === BookStatus.READING,
  );

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5 overflow-y-scroll">
      <UserBar user={user} />
      <div className="flex gap-10 w-full pt-10 px-[5%] h-full">
        <div className="flex flex-col w-full h-full gap-20 p-2">
          <FriendsList />
          <QuotesList />
        </div>
        <BooksList books={currentBooks} noBooksMesage="Nothing here" />
      </div>
    </div>
  );
};

export default HomePage;
