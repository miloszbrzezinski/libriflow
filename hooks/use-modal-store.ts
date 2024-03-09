import { BookWithAuthors } from "@/types";
import { Author, Book, BookNote } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "editBook"
  | "deleteBook"
  | "deleteBookNote"
  | "editAuthor"
  | "addBookNote";

interface ModalData {
  book?: BookWithAuthors;
  bookNote?: BookNote;
  author?: Author;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
