import { AddBookForm } from "@/components/add-book-form";
import { AddBookFormMobile } from "@/components/add-book-form-mobile";
import Navbar from "@/components/navbar";

const AddBookPage = () => {
  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 md:p-5 p-2">
      <Navbar title="add book" />
      <div className="flex w-full h-full items-center justify-center space-x-5">
        <div className="md:p-5 md:pb-5 pb-24 p-2 bg-white shadow-md rounded-lg md:w-min w-full">
          <AddBookForm />
          <AddBookFormMobile />
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
