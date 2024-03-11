"use client";

import * as z from "zod";

import { FileUpload } from "./cover-upload";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useForm } from "react-hook-form";
import { AddBookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBook } from "@/actions/edit-book";
import { BookWithAuthors } from "@/types";
import { Author } from "@prisma/client";
import { AuthorSelector } from "./author-selector";

interface EditBookFormProps {
  book: BookWithAuthors;
  authors: Author[];
  onClose: () => void;
}

export const EditBookFormMobile = ({
  book,
  authors,
  onClose,
}: EditBookFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const params = useParams();

  const form = useForm<z.infer<typeof AddBookSchema>>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      imageUrl: "",
      bookName: "",
      bookAuthor: "",
      bookGenre: "",
      bookPublisher: "",
      bookISBN: "",
      bookDescription: "",
    },
  });

  useEffect(() => {
    if (book) {
      form.setValue("imageUrl", book.imageUrl);
      form.setValue("bookName", book.bookName);
      form.setValue("bookAuthor", book.author.name);
      form.setValue("bookGenre", book.bookGenre);
      form.setValue("bookPublisher", book.bookPublisher);
      form.setValue("bookYear", +book.bookYear);
      form.setValue("bookISBN", book.bookISBN);
    }
  }, [form, book]);

  if (!book) {
    return;
  }

  const setAuthorName = (author: string) => {
    form.setValue("bookAuthor", author);
  };

  const onSubmit = (values: z.infer<typeof AddBookSchema>) => {
    startTransition(() => {
      editBook(user!.id!, String(params.bookId!), values).then((data) => {
        if (data.success) {
          onClose();
          router.refresh();
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:hidden space-y-6 w-full mb-10 h-96  overflow-y-visible"
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book cover</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint="serverImage"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookAuthor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <AuthorSelector
                  valueAuthor={book.author.name}
                  setAuthorName={setAuthorName}
                  authors={authors}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookGenre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="e.g. Biography, Sci-Fi"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookPublisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release year</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookISBN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="e.g. 978 1 83895 223 5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
