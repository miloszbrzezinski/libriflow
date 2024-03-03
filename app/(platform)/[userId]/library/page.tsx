import BookWidget from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";

const LibraryPage = async ({ params }: { params: { userId: string } }) => {
  const books = await db.book.findMany({
    where: {
      userId: params.userId,
    },
    include: {
      author: true,
    },
  });

  if (!books) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5">
      <Navbar title="library" />
      <div className="flex gap-2 w-full pt-10">
        {books.map((book) => (
          <BookWidget key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
