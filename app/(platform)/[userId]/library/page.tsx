import BookWidget from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";

const LibraryPage = async ({ params }: { params: { userId: string } }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      books: true,
    },
  });

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5">
      <Navbar title="library" />
      <div className="flex gap-2 w-full">
        {user.books.map((book) => (
          <BookWidget key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
