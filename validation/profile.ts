import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
  last_name: z.string().min(2, "اسم العائلة يجب أن يكون حرفين على الأقل"),
  bio: z.string().max(200, "الوصف طويل جداً").optional().nullable(),
  phone: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
});