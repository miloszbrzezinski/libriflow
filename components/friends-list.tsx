import { UserPlus } from "lucide-react";
import { Separator } from "./ui/separator";

const FriendsList = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-2xl font-light">Friends</p>
        <UserPlus strokeWidth={1} className="w-8 h-8" />
      </div>
      <Separator className="bg-slate-800 shadow-md" />
      <div className="flex items-center gap-4 w-full h-40  overflow-x-scroll">
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
        <div className="flex min-w-36 min-h-36 bg-rose-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default FriendsList;
