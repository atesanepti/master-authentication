import { z } from "zod";
import { UserRole } from "@prisma/client";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid E-mail"),
  password: z.string(),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email("Enter a valid E-mail"),
  name: z.string().min(4, { message: "Name must be 4 characters" }),
  password: z.string().min(6, {
    message: "Passwrod must be 6 characters",
  }),
});

export const forgetPassSchema = z.object({
  email: z.string().email("Enter a valid E-mail"),
});

export const resetPassSchema = z.object({
  password: z.string().min(6, { message: "Passwrod must be 6 characters" }),
});

export const settingSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email("Enter a valid E-mail")),
    oldPassword: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    isTwoFA: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) {
        return false;
      }
      return true;
    },
    { path: ["oldPassword"], message: "Old Password is requried" }
  )
  .refine(
    (data) => {
      if (!data.newPassword && data.oldPassword) {
        return false;
      }
      return true;
    },
    { path: ["newPassword"], message: "New Password is requried" }
  )
  .refine(
    (data) => {
      if (
        data.newPassword &&
        data.oldPassword &&
        data.newPassword === data.oldPassword
      ) {
        return false;
      }
      return true;
    },
    { path: ["newPassword"], message: "You already have used this password" }
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        const passwordIsValid = z
          .string()
          .min(6, { message: "Passwrod must be 6 characters" })
          .parse(data.newPassword);
        if (!passwordIsValid) return false;
      }
      return true;
    },
    { path: ["newPassword"], message: "You already have used this password" }
  );
