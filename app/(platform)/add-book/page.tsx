import { AddBookForm } from "@/components/add-book-form";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./../../../public/fonts/IstokWeb-Regular.ttf",
});

const AddBookPage = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-br from-slate-300  to-amber-100 backdrop-blur-sm p-5">
      <Navbar title="add book" />
      <div className="flex items-center justify-center space-x-5">
        <div className="flex bg-white w-80 h-full shadow-md rounded-md items-center justify-center">
          <span className="text-xl font-semibold text-green-900/40 select-none">
            add book cover
          </span>
        </div>
        <AddBookForm />
      </div>
    </div>
  );
};

export default AddBookPage;
