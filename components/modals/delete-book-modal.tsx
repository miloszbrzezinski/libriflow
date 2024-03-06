"use client";

import { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { deleteBook } from "@/actions/delete-book";

export const DeleteBookModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const isModalOpen = isOpen && type === "deleteBook";
  const { book } = data;

  if (!book) {
    return;
  }

  const onClick = async () => {
    startTransition(() => {
      deleteBook(book.id).then((data) => {
        if (data.success) {
          onClose();
          router.push(`/${params.userId}/library`);
          router.refresh();
        }
      });
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Remove book
          </DialogTitle>
          <Separator />
          <DialogDescription className="text-zinc-500 dark:text-neutral-400">
            Are you sure you want to do this? <br />
            <span className="text-black dark:text-white font-semibold text-base">
              {book?.bookName}
            </span>
            <br />
            Book will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="py-4">
          <Button disabled={isPending} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isPending} variant="destructive" onClick={onClick}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
