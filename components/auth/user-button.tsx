"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { User, X } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-gradient-to-r from-emerald-800 to-sky-900">
            <p className="text-white text-xl"> {Array.from(user.name!)[0]}</p>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <div className="flex w-full justify-center p-2">
          <p className="text-md font-light">{user.name!}</p>
        </div>
        <Separator />
        <LogoutButton>
          <DropdownMenuItem>
            <X className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
