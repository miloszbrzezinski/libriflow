"use client";

import { useEffect, useState } from "react";
import { DeleteBookModal } from "../modals/delete-book-modal";
import { EditBookModal } from "../modals/edit-book-modal";
import { EditAuthorModal } from "../modals/edit-author-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteBookModal />
      <EditBookModal />
      <EditAuthorModal />
    </>
  );
};
