"use client";
import { Cog, Heart, Home, Library, Plus, PlusCircle } from "lucide-react";
import SidebarButton from "./sidebar-button";
import { useParams, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const params = useParams();

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
            router.push(`/${params.userId}/add-book`);
          }}
          className="group flex items-center"
        >
          <div className="p-2 flex items-center justify-center rounded-[50px] group-hover:shadow-md group-hover:rounded-lg overflow-hidden transition-all group-hover:bg-emerald-800/30 bg-emerald-800/10">
            <Plus strokeWidth={0.5} className="w-10 h-10" />
          </div>
        </button>
      </ul>
    </nav>
  );
};

export default Sidebar;
