import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { UserButton } from "./auth/user-button";

const headingFont = localFont({
  src: "./../public/fonts/Lora-Regular.ttf",
});
interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <nav className="flex w-full h-16 items-center justify-between">
      <p
        className={cn(
          "text-5xl font-light text-slate-800",
          headingFont.className,
        )}
      >
        {title}
      </p>
    </nav>
  );
};

export default Navbar;
