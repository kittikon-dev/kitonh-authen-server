import { z } from "zod";

export const loginWithEmailAndPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginWithEmailAndPasswordDTO = z.infer<
  typeof loginWithEmailAndPasswordSchema
>;
