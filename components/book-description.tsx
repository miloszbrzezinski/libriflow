"use client";

import * as z from "zod";
import { Book } from "@prisma/client";
import { Edit } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";
import { editBookDescription } from "@/actions/edit-book-description";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditBookDescription } from "@/schemas";

interface BookDescriptionProps {
  book: Book;
}
const BookDescription = ({ book }: BookDescriptionProps) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(String);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const user = useCurrentUser();
  const params = useParams();

  const form = useForm<z.infer<typeof EditBookDescription>>({
    resolver: zodResolver(EditBookDescription),
    defaultValues: {
      bookDescription: "",
    },
  });

  useEffect(() => {
    form.setValue("bookDescription", book.bookDescription);
    setDescription(book.bookDescription);
  }, [form, book]);

  const onSubmit = (values: z.infer<typeof EditBookDescription>) => {
    startTransition(() => {
      editBookDescription(
        user!.id!,
        String(params.bookId!),
        values.bookDescription,
      ).then((data) => {
        if (data.success) {
          setEditing(false);
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="group flex text-lg w-[80%] h-full space-x-5">
      <div className="flex h-full w-28 space-x-3 justify-end">
        {editing ? (
          <Button
            variant="outline"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </Button>
        ) : (
          <Edit
            className="group-hover:text-stone-500 text-transparent"
            onClick={() => {
              setEditing(!editing);
            }}
          />
        )}
        <div
          className={cn(
            "flex group-hover:bg-stone-500/30 w-2 h-full",
            editing && "bg-stone-500/30",
          )}
        />
      </div>
      {editing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="bookDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="..."
                      className="resize-none h-96 w-full text-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};

export default BookDescription;
