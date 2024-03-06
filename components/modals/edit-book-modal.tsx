"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FileUpload } from "../cover-upload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { AddBookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBook } from "@/actions/edit-book";
import { useCurrentUser } from "@/hooks/use-current-user";

export const EditBookModal = () => {
  const { isOpen, onClose, type, data } = useModal();
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

  const isModalOpen = isOpen && type === "editBook";
  const { book } = data;

  useEffect(() => {
    if (book) {
      form.setValue("imageUrl", book.imageUrl);
      form.setValue("bookName", book.bookName);
      form.setValue("bookAuthor", book.author.name);
      form.setValue("bookGenre", book.bookGenre);
      form.setValue("bookPublisher", book.bookPublisher);
      form.setValue("bookISBN", book.bookISBN);
    }
  }, [form, book]);

  if (!book) {
    return;
  }

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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden w-min max-w-lg lg:max-w-full">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Edit book
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full h-full flex flex-col"
          >
            <div className="flex flex-col w-full h-full space-y-5">
              <div className="flex h-full space-x-10">
                <div className="flex bg-white border mt-7 w-80 grow shadow-md rounded-md items-center justify-center">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
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
                </div>
                <div className="space-y-4 w-96 flex flex-col">
                  <FormField
                    control={form.control}
                    name="bookName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="..."
                          />
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
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="e.g. Christophet Hitchens"
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
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="..."
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
                </div>
              </div>
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
