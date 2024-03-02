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
      <div className="flex w-full h-full items-center justify-center space-x-5">
        <div className="p-5 bg-white shadow-md rounded-lg">
          <AddBookForm />
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
