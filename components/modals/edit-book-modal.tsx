"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { EditBookForm } from "../edit-book-form";
import { EditBookFormMobile } from "../edit-book-form-mobile";

export const EditBookModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editBook";
  const { book, authors } = data;

  if (!book || !authors) {
    return;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-y-scroll w-min md:max-w-lg lg:max-w-full">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Edit book
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <EditBookForm onClose={onClose} book={book} authors={authors} />
        <EditBookFormMobile onClose={onClose} book={book} authors={authors} />
      </DialogContent>
    </Dialog>
  );
};
