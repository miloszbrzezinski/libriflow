import * as z from "zod";
//import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const AddBookSchema = z.object({
  imageUrl: z.string(),
  bookName: z.string().min(1, {
    message: "Name is required",
  }),
  bookAuthor: z.string().min(1, {
    message: "Author is required",
  }),
  bookGenre: z.string().min(1, {
    message: "Genre is required",
  }),
  bookPublisher: z.string(),
  bookISBN: z.string(),
  bookYear: z.coerce.number(),
  bookDescription: z.string(),
});

export const EditBookDescription = z.object({
  bookDescription: z.string(),
});

export const EditAuthor = z.object({
  imageUrl: z.string(),
  authorName: z.string().min(1, {
    message: "Name is required",
  }),
});

export const BookNoteSchema = z.object({
  pageNo: z.coerce.number(),
  bookNote: z.string(),
});
