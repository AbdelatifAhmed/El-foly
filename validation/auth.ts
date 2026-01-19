import { z } from "zod";

export const signupSchema = z.object({
  fName: z.string().min(3, "First name must be at least 3 characters"),
  lName: z.string().min(3, "Last name must be at least 3 characters"),

  contact: z.string().refine((val) => {
    const isEmail = z.string().email().safeParse(val).success;
    const isPhone = /^\d{11}$/.test(val); 
    return isEmail || isPhone;
  }, {
    message: "Please enter a valid email or an 11-digit phone number",
  }),

  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export type SignupInput = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
  contact: z.string().min(1, "الإيميل أو الهاتف مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export const forgetPasswordSchema = z.object({
  contact: z.string().min(1, "الإيميل أو الهاتف مطلوب"),
});

export type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;

export type LoginInput = z.infer<typeof loginSchema>;