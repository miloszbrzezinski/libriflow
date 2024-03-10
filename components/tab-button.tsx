"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface TabButtonProps {
  param: string;
  value: string;
  name: string;
}

export const TabButton = ({ param, value, name }: TabButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get(param);

  const onClick = () => {
    router.push(`?${param}=${value}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center md:w-min w-full p-1 px-4 rounded-md whitespace-nowrap border border-slate-800 text-slate-800 bg-transparent select-none md:text-md text-sm",
        search === value && "text-white bg-slate-800",
      )}
    >
      {name}
    </button>
  );
};
