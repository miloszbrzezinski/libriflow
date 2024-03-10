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

const MobileBar = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  return (
    <nav className="flex h-20 w-full bg-white shadow-md shadow-neutral-500 items-center justify-center">
      <ul className="flex items-center justify-between space-x-2 w-full px-2">
        <SidebarButton href="home" name="Home">
          <Home strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>

        <SidebarButton href="library" query="?status=all" name="Library">
          <Library strokeWidth={0.5} className="w-10 h-10" />
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
        <SidebarButton href="authors" name="Authors">
          <PenTool strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>

        <UserButton />
      </ul>
    </nav>
  );
};

export default MobileBar;
