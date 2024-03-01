import BookWidget from "@/components/book-widget";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookHeart, Check, Heart, HeartOff } from "lucide-react";
import localFont from "next/font/local";
import Image from "next/image";

const headingFont = localFont({
  src: "./../../../public/fonts/IstokWeb-Regular.ttf",
});

const LibraryPage = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm p-5">
      <Navbar title="library" />
      <div className="flex gap-2 w-full">
        <BookWidget
          name="Steve Jobs"
          author="Walter Isaacson"
          image="/book.jpg"
        />
        <BookWidget name="1984" author="George Orwell" image="/orwell.jpg" />
      </div>
    </div>
  );
};

export default LibraryPage;
