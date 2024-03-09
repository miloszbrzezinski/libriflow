"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { NotebookPen, Quote } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface BookNoteFormProps {
  cancelEditing: () => void;
}

const BookNoteForm = ({ cancelEditing }: BookNoteFormProps) => {
  const [isQuote, setIsQuote] = useState(false);
  return (
    <div className="group flex space-x-3">
      <div className="flex space-x-2">
        <div className="flex flex-col items-end justify-between space-y-10">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => {
                setIsQuote(!isQuote);
              }}
              variant={"outline"}
              className="flex items-center justify-between p-1"
            >
              {isQuote ? (
                <Quote strokeWidth={2} className="text-yellow-600 w-7 h-7" />
              ) : (
                <NotebookPen
                  strokeWidth={2}
                  className="text-emerald-800 w-7 h-7"
                />
              )}
            </Button>
          </div>

          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1 items-end">
              <Label>Page</Label>
              <Input type="number" className="w-24 text-lg" />
            </div>

            <div className="flex flex-col w-full space-y-2">
              <Button onClick={cancelEditing} variant="outline">
                Cancel
              </Button>
              <Button
                variant="default"
                className={cn(isQuote ? "bg-yellow-600" : "bg-emerald-800")}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex w-2 h-full",
            isQuote ? "bg-yellow-600" : "bg-emerald-800",
          )}
        />
      </div>
    </div>
  );
};

export default BookNoteForm;
