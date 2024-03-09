"use client";
import {
  Cog,
  Heart,
  Home,
  Library,
  PenTool,
  Plus,
  PlusCircle,
} from "lucide-react";
import SidebarButton from "./sidebar-button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { UserButton } from "./auth/user-button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-20 h-full bg-white shadow-md shadow-neutral-500 items-center justify-between">
      <div className="flex justify-center items-center h-20"></div>
      <ul className="space-y-4 justify-center items-center flex flex-col">
        <SidebarButton href="home" name="Home">
          <Home strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="library" name="Library">
          <Library strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="authors" name="Authors">
          <PenTool strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <button
          onClick={() => {
            router.push(`/add-book`);
          }}
          className="group flex items-center"
        >
          <div
            className={cn(
              "p-2 flex items-center justify-center rounded-[50px] group-hover:shadow-md group-hover:rounded-lg overflow-hidden transition-all group-hover:bg-slate-600 bg-slate-300 text-slate-800",
              pathname.split("/")[2] === "add-book" &&
                "bg-slate-600 hover:bg-slate-500 shadow-lg rounded-lg text-white",
            )}
          >
            <Plus
              strokeWidth={0.5}
              className={cn("w-10 h-10  group-hover:text-white")}
            />
          </div>
        </button>
      </ul>
      <div className="flex justify-center items-center h-20">
        <UserButton />
      </div>
    </nav>
  );
};

export default Sidebar;
