import AuthorBar from "@/components/author-bar";
import BookBar from "@/components/book-bar";
import BookItem from "@/components/book-item";
import { BookWidget } from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Link from "next/link";

const AuthorPage = async ({
  params,
}: {
  params: { userId: string; authorId: string };
}) => {
  const author = await db.author.findUnique({
    where: {
      id: params.authorId,
    },
    include: {
      books: {
        include: {
          author: true,
        },
      },
    },
  });

  if (!author) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center bg-neutral-200 p-5">
        <p>Author not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 md:p-5 p-2">
      <AuthorBar author={author} />
      <Separator className="my-4 bg-green-950" />
      <div className="flex flex-col gap-[1px] w-full md:pt-10">
        {author.books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;
