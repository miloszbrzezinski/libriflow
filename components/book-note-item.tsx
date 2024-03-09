import { Edit, NotebookPen, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import BookNoteForm from "./edit-book-note-form";
import { BookNote } from "@prisma/client";

interface BookNoteItemProps {
  note: BookNote;
}

const BookNoteItem = ({ note }: BookNoteItemProps) => {
  const [editing, setEditing] = useState(false);

  const cancelEditing = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <BookNoteForm cancelEditing={cancelEditing} bookNote={note} />
      ) : (
        <div className="group flex space-x-3">
          <div className="flex space-x-2">
            <div className="flex flex-col items-end justify-between space-y-10">
              <div className="flex items-center space-x-2">
                <Edit
                  className={cn(
                    "text-transparent",
                    note.isQuotation
                      ? "group-hover:text-yellow-600"
                      : "group-hover:text-emerald-800",
                  )}
                  onClick={() => {
                    setEditing(!editing);
                  }}
                />
                <div>
                  {note.isQuotation ? (
                    <Quote
                      strokeWidth={2}
                      className="text-yellow-600 w-7 h-7"
                    />
                  ) : (
                    <NotebookPen
                      strokeWidth={2}
                      className="text-emerald-800 w-7 h-7"
                    />
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col items-end",
                  note.isQuotation ? "text-yellow-800" : "text-emerald-800",
                )}
              >
                <Label>Page</Label>
                <Label className="text-2xl">{note.page}</Label>
              </div>
            </div>
            <div
              className={cn(
                "flex w-2 h-full",
                note.isQuotation ? "bg-yellow-600" : "bg-emerald-800",
              )}
            />
          </div>
          <div>
            {note.note.split("\n").map((par, index) => (
              <p key={index}>{par}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNoteItem;
