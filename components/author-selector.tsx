"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Author } from "@prisma/client";
import { useEffect, useState } from "react";
import { addAuthor } from "@/actions/add-author";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

interface AuthorSelectorProps {
  valueAuthor?: string;
  authors: Author[];
  setAuthorName: (authorName: string) => void;
}

export const AuthorSelector = ({
  valueAuthor,
  authors,
  setAuthorName,
}: AuthorSelectorProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [tmpAuthors, setTmpAuthors] = useState([...authors]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? tmpAuthors.find((author) => author.name.toLowerCase() === value)
                ?.name
            : valueAuthor
              ? valueAuthor
              : "Select author"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 px-2">
        <Command>
          <CommandInput
            placeholder="Author..."
            onValueChange={(e) => {
              setInputValue(e!);
            }}
          />
          <CommandEmpty>
            <Button
              onClick={() => {
                setTmpAuthors([
                  ...tmpAuthors,
                  { id: "", name: inputValue, imageUrl: "", userId: "" },
                ]);
                setAuthorName(inputValue);
                setValue(inputValue.toLowerCase());
                setOpen(false);
              }}
              className="w-full"
            >
              Add author
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {tmpAuthors.map((author) => (
              <CommandItem
                key={author.id}
                value={author.name}
                onSelect={(currentValue) => {
                  setValue(
                    currentValue.toLowerCase() === value ? "" : currentValue,
                  );
                  setAuthorName(author.name);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === author.name.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {author.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
