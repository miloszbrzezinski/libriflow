"use client";
import { getAuthorsWithData } from "@/actions/user";
import { AddBookForm } from "@/components/add-book-form";
import { AddBookFormMobile } from "@/components/add-book-form-mobile";
import Navbar from "@/components/navbar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Author } from "@prisma/client";
import { useEffect, useState } from "react";

const AddBookPage = () => {
  const user = useCurrentUser();
  const [authors, setAuthors] = useState<Author[]>();

  useEffect(() => {
    getAuthorsWithData(user!.id!).then((data) => {
      if (data) {
        setAuthors(data!.authors);
      }
    });
  }, []);

  if (!authors) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full bg-amber-50/20 md:p-5 p-2">
      <Navbar title="add book" />
      <div className="flex w-full h-full items-center justify-center space-x-5">
        <div className="md:p-5 md:pb-5 pb-24 p-2 bg-white shadow-md rounded-lg md:w-min w-full">
          <AddBookForm authors={authors} />
          <AddBookFormMobile authors={authors} />
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
