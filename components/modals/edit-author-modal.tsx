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
import { AddBookSchema, EditAuthor } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBook } from "@/actions/edit-book";
import { useCurrentUser } from "@/hooks/use-current-user";
import { editAuthor } from "@/actions/edit-author";
import { ProfileImageUpload } from "../profile-image-upload";

export const EditAuthorModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const params = useParams();

  const form = useForm<z.infer<typeof EditAuthor>>({
    resolver: zodResolver(EditAuthor),
    defaultValues: {
      imageUrl: "",
      authorName: "",
    },
  });

  const isModalOpen = isOpen && type === "editAuthor";
  const { author } = data;

  useEffect(() => {
    if (author) {
      form.setValue("imageUrl", author.imageUrl);
      form.setValue("authorName", author.name);
    }
  }, [form, author]);

  if (!author) {
    return;
  }

  const onSubmit = (values: z.infer<typeof EditAuthor>) => {
    startTransition(() => {
      editAuthor(user!.id!, String(params.authorId!), values).then((data) => {
        if (data.success) {
          onClose();
          router.refresh();
        }
        if (data.error) {
          console.log(data.error);
        }
      });
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden w-min max-w-lg lg:max-w-full">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Edit author
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full h-full flex flex-col"
          >
            <div className="flex flex-col w-full h-full space-y-5">
              <div className="md:flex h-full w-full md:space-x-10">
                <div className="flex bg-white rounded-md items-center justify-center">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ProfileImageUpload
                            endpoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:space-y-4 md:w-96 w-full flex flex-col">
                  <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
