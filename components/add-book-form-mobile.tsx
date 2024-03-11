"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AddBookSchema, RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { FileUpload } from "./cover-upload";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addBook } from "@/actions/add-book";
import { AuthorSelector } from "./author-selector";
import { useParams, useRouter } from "next/navigation";
import { Author } from "@prisma/client";

interface AddBookFormMobileProps {
  authors: Author[];
}

export const AddBookFormMobile = ({ authors }: AddBookFormMobileProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();

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
  const router = useRouter();

  const setAuthorName = (author: string) => {
    form.setValue("bookAuthor", author);
  };

  const onSubmit = (values: z.infer<typeof AddBookSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addBook(user!.id!, values).then((data) => {
        if (data.success) {
          router.push(`library?status=all`);
        }
      });
    });
  };

  return (
    <div className="md:hidden w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full h-full flex flex-col"
        >
          <div className="space-y-4 w-full flex flex-col">
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
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="e.g. 1984"
                    />
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
            <div>
              <FormField
                control={form.control}
                name="bookDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="..."
                        className="resize-none h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};
