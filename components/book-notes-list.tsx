"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { NotebookPen, Quote } from "lucide-react";
import BookNoteItem from "./book-note-item";

const BookNotesList = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex flex-col w-full h-full pt-12 px-44">
      <div className="flex items-center justify-between">
        <p className="text-2xl whitespace-nowrap"> Notes and quotes</p>
        <Button
          onClick={() => {
            onOpen("addBookNote");
          }}
          variant="outline"
          className=""
        >
          Add note
        </Button>
      </div>
      <Separator className="my-4 bg-green-950" />
      <div className="flex flex-col space-y-4">
        <BookNoteItem />
      </div>
    </div>
  );
};

export default BookNotesList;
