import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 حروف على الأقل"),
  phone: z.string().optional().nullable(),
  bio: z.string().max(200, "الوصف طويل جداً").optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  birth_date: z.string().optional().nullable(),
});