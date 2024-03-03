import AuthorItem from "@/components/author-item";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";

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
      <div className="flex flex-col gap-[1px] w-full pt-10">
        {authors.map((author) => (
          <AuthorItem key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
