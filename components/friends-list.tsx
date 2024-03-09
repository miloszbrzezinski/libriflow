import { UserPlus } from "lucide-react";
import { Separator } from "./ui/separator";

const FriendsList = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-2xl font-light">Following</p>
        <UserPlus strokeWidth={1} className="w-8 h-8" />
      </div>
      <Separator className="bg-slate-800 shadow-md" />
      <div className="flex items-center gap-4 w-full pb-5  overflow-x-scroll">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex min-w-36 min-h-36 bg-stone-400 rounded-full" />
          <p>John Smith</p>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
