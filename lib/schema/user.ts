import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    login: z.string(),
    password: z.string(),
    role: z.enum(["reviewer", "applicant"])

});

export type User = z.infer<typeof UserSchema>;
