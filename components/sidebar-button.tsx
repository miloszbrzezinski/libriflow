"use client";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";

interface SidebarButtonProps {
  href: string;
  name: string;
  children: React.ReactNode;
}

const SidebarButton = ({ href, name, children }: SidebarButtonProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`/${href}`);
  };
  return (
    <li
      onClick={onClick}
      className={cn(
        "p-2 items-center justify-center flex rounded-lg hover:bg-emerald-800/30 hover:shadow-md",
        pathname.split("/")[1] === href && "bg-emerald-800/30 shadow-lg",
      )}
    >
      {children}
    </li>
  );
};

export default SidebarButton;
