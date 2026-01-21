import { z } from "zod";

export const changePasswordSchema = z.object({
  current_password: z.string().min(8, "كلمة السر يجب أن تكون 8 رموز على الأقل"),
  new_password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirm_password: z.string(),
})
.refine((data) => data.new_password === data.confirm_password, {
  message: "كلمات السر غير متطابقة",
  path: ["confirm_password"],
});