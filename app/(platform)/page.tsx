"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect, useRouter } from "next/navigation";

const LibraryPage = () => {
  const user = useCurrentUser();
  const router = useRouter();

  router.push(`/home`);
};

export default LibraryPage;
