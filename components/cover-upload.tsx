"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { Button } from "./ui/button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "imageUploader" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="flex flex-col gap-2 h-96 w-64">
        <Image
          src={value}
          alt="Upload"
          className="h-96 w-64"
          width={200}
          height={400}
        />
        <Button
          variant="destructive"
          onClick={() => onChange("")}
          className="text-white p-1 shadow-sm space-x-2"
          type="button"
        >
          <X className="h-4 w-4" />
          <p>Remove cover</p>
        </Button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
