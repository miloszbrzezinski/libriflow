import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./../public/fonts/Lora-Regular.ttf",
});

function NotFoundPage() {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full items-center justify-center bg-amber-50 space-y-5",
        headingFont.className,
      )}
    >
      <h1 className="text-6xl">error 404</h1>
      <h1 className="text-5xl">Page not found</h1>
    </div>
  );
}

export default NotFoundPage;
