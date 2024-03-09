"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useEffect, useState, useTransition } from "react";
import { NotebookPen, Quote } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { BookNote } from "@prisma/client";
import { BookNoteSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addBookNote } from "@/actions/add-book-note";

interface BookNoteFormProps {
  bookNote: BookNote;
  cancelEditing: () => void;
}

const BookNoteForm = ({ bookNote, cancelEditing }: BookNoteFormProps) => {
  const [isQuote, setIsQuote] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const user = useCurrentUser();
  const params = useParams();

  const form = useForm<z.infer<typeof BookNoteSchema>>({
    resolver: zodResolver(BookNoteSchema),
    defaultValues: {
      pageNo: 0,
      bookNote: "",
    },
  });

  useEffect(() => {
    form.setValue("pageNo", bookNote.page);
    form.setValue("bookNote", bookNote.note);
    setIsQuote(bookNote.isQuotation);
  }, [form, bookNote]);

  const onSubmit = (values: z.infer<typeof BookNoteSchema>) => {
    startTransition(() => {
      addBookNote(user!.id!, String(params.bookId!), values, isQuote).then(
        (data) => {
          if (data.success) {
            cancelEditing();
            router.refresh();
          }
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="group flex space-x-3 w-full ">
          <div className="flex space-x-2 ">
            <div className="flex flex-col items-end justify-between space-y-10 ">
              <div className="flex items-center space-x-2 ">
                <Button
                  onClick={() => {
                    setIsQuote(!isQuote);
                  }}
                  type="button"
                  variant={"outline"}
                  className="flex items-center justify-between p-1"
                >
                  {isQuote ? (
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
                </Button>
              </div>

              <div className="flex flex-col space-y-5 ">
                <div className="flex flex-col space-y-1 items-end">
                  <Label>Page</Label>
                  <FormField
                    control={form.control}
                    name="pageNo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                            placeholder="..."
                            className="w-24 text-lg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <Button onClick={cancelEditing} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    type="submit"
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
          <FormField
            control={form.control}
            name="bookNote"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="..."
                    className="min-h-96 w-full text-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default BookNoteForm;
