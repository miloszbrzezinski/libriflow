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

export const AddBookNoteModal = () => {
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

  const isModalOpen = isOpen && type === "addBookNote";
  const { book } = data;

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

  //   if (!book) {
  //     return;
  //   }

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
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden ">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Add note
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full h-full flex flex-col"
          >
            <Button disabled={isPending} type="submit" className="w-full">
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
