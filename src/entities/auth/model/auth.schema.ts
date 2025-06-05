import { z } from "zod";

export const AuthFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8).max(20),
});

export type AuthFormValues = z.infer<typeof AuthFormSchema>;
