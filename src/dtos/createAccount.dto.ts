import { z } from "zod";

export const createAccountSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters, numbers without spaces and underscores",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long")
      .max(32, "Confirm Password must be at most 32 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateAccountDTO = z.infer<typeof createAccountSchema>;

export type CreateAccountInput = Omit<CreateAccountDTO, "confirmPassword">;
