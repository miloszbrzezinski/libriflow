"use client";
import { Cog, Heart, Home, Library, Plus, PlusCircle } from "lucide-react";
import SidebarButton from "./sidebar-button";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <nav className="flex w-20 h-full bg-white shadow-md shadow-neutral-500 items-center justify-center">
      <ul className="space-y-4 justify-center items-center flex flex-col">
        <SidebarButton href="home" name="Settings">
          <Home strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="library" name="Settings">
          <Library strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="favourites" name="Settings">
          <Heart strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <button
          onClick={() => {
            router.push(`/add-book`);
          }}
          className="p-2 flex items-center justify-center rounded-full hover:shadow-md hover:rounded-lg transition-all hover:bg-emerald-800/30 bg-emerald-800/10"
        >
          <Plus strokeWidth={0.5} className="w-10 h-10" />
        </button>
      </ul>
    </nav>
  );
};

export default Sidebar;
