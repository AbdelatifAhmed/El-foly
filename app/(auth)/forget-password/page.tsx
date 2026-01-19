'use client';
import api from "@/lib/axios";
import { forgetPasswordSchema, ForgetPasswordInput } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPasswordInput) => {
    alert(data.contact);
    try {
     const response = await api.post('/auth/forget-password', { email: data.contact });
        alert(response.data.message);
    //   router.push('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || "حدث خطأ أثناء إرسال كلمة السر");
    }
  };

  return (
    <div className="flex flex-col items-center width-full">
      <div className="mb-6 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold tracking-[0.2em]">Forget Password</h3>
        <p className="text-lg">Enter your email to receive a password reset link</p>
      </div>
      <form className="w-full flex flex-col gap-10 pr-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("contact")}
          placeholder="Email or Phone"
          className="w-full border-b border-black text-lg focus:outline-none focus:border-(--primary-color)"
        />
        {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
        <button type="submit" className="bg-(--primary-color) text-white px-4 py-2 rounded-md cursor-pointer">Send</button>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
