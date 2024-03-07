import AuthorItem from "@/components/author-item";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import Link from "next/link";

const AuthorsPage = async ({ params }: { params: { userId: string } }) => {
  const authors = await db.author.findMany({
    where: {
      userId: params.userId,
    },
  });

  if (!authors) {
    return;
  }
  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5">
      <Navbar title="authors" />
      <div className="flex flex-col gap-[1px] w-full h-full pt-10">
        {authors.length === 0 && (
          <div className="flex flex-col w-full h-full items-center justify-center space-y-5">
            <p className="text-4xl text-slate-700">
              You do not have any authors yet
            </p>
            <Link href={"add-book"} className="hover:underline">
              Add first book here
            </Link>
          </div>
        )}
        {authors.map((author) => (
          <AuthorItem key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
