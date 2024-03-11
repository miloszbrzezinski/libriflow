import { UserIcon, UserPlus } from "lucide-react";
import { Separator } from "./ui/separator";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FriendsListProps {
  usersList: User[];
}

const FriendsList = ({ usersList }: FriendsListProps) => {
  const router = useRouter();

  if (!usersList) {
    return;
  }

  const onClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-2xl font-light">Following</p>
        <UserPlus strokeWidth={1} className="w-8 h-8 hidden" />
      </div>
      <Separator className="bg-slate-800 shadow-md" />
      {usersList.length === 0 && <p>No following users</p>}
      <div className="flex items-center gap-4 w-full pb-5  overflow-x-scroll">
        {usersList.map((user) => (
          <button
            key={user.id}
            onClick={() => {
              onClick(user.id);
            }}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <div className="w-36 h-36 border-8 border-white rounded-full hidden md:block">
              {user.image ? (
                <Image src={user.image} alt="book" height={100} width={200} />
              ) : (
                <div className="w-full h-full rounded-full items-center justify-center flex bg-neutral-200">
                  <UserIcon strokeWidth={1} className="w-20 h-20" />
                </div>
              )}
            </div>
            <p>{user.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
