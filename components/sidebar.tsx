import { Cog, Heart, Home, Library } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <nav className="flex w-20 h-full bg-white shadow-md shadow-neutral-500 items-center justify-center">
      <ul className="space-y-4">
        <SidebarButton href="/settings" name="Settings">
          <Home strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="/settings" name="Settings">
          <Library strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="/settings" name="Settings">
          <Heart strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
        <SidebarButton href="/settings" name="Settings">
          <Cog strokeWidth={0.5} className="w-10 h-10" />
        </SidebarButton>
      </ul>
    </nav>
  );
};

export default Sidebar;
