import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import UserBar from "@/components/user-bar";
import { db } from "@/lib/db";

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
      books: true,
    },
  });

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5">
      <UserBar user={user} />
      <div className="flex flex-col gap-[1px] w-full pt-10"></div>
    </div>
  );
};

export default HomePage;
