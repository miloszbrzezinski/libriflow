import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./../../../public/fonts/IstokWeb-Regular.ttf",
});

const FavouritesPage = () => {
  return (
    <div className="flex w-full h-full bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm p-5">
      <p
        className={cn(
          "text-5xl font-light text-slate-800",
          headingFont.className,
        )}
      >
        Favourites
      </p>
    </div>
  );
};

export default FavouritesPage;
