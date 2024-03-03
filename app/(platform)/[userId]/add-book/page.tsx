import { AddBookForm } from "@/components/add-book-form";
import Navbar from "@/components/navbar";

const AddBookPage = () => {
  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 p-5">
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
