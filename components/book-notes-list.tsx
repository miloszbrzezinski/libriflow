"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { NotebookPen, Quote } from "lucide-react";
import BookNoteItem from "./book-note-item";
import { BookNote } from "@prisma/client";
import { addBookNote } from "@/actions/add-book-note";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BookNotesListProps {
  notes: BookNote[];
}

const BookNotesList = ({ notes }: BookNotesListProps) => {
  const router = useRouter();
  const user = useCurrentUser();
  const params = useParams();

  const newNote = () => {
    addBookNote(user!.id!, String(params.bookId!)).then((data) => {
      if (data.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-light whitespace-nowrap">
          Notes and quotes
        </p>
        <Button onClick={newNote} className="">
          Add note
        </Button>
      </div>
      <Separator className="my-4 bg-green-950" />
      <div
        className={cn(
          "flex flex-col space-y-4",
          notes.length === 0 && "h-full items-center justify-center",
        )}
      >
        {notes.length === 0 && <p>Nothing here</p>}
        {notes.map((note) => (
          <BookNoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default BookNotesList;
