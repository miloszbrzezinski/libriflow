import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/IstokWeb-Regular.ttf",
});

export const Logo = ({ className }: { className?: string }) => {
  const censored = false;
  return (
    <Link href="/">
      {censored ? (
        <div className="flex bg-black h-10 w-32"></div>
      ) : (
        <div className="hover:opacity-75 transition items-center gap-x-2 flex select-none">
          <p
            className={cn(
              "text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-sky-900 dark:from-emerald-100 dark:to-sky-200",
              headingFont.className,
              className,
            )}
          >
            Flow
          </p>
        </div>
      )}
    </Link>
  );
};
