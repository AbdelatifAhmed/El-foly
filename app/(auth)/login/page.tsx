'use client';
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/validation/auth";
import { useAuthStore } from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import api from '@/lib/axios';

export default function LoginPage() {
  return (
    <Suspense fallback={<span className="loading loading-ring loading-lg"></span>}>
      <LoginContent />
    </Suspense>
  );
}

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");
  // if middlereware redirects to login page, it may add a callbackUrl param
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginInput) => {
    try {
      setServerError("");
      const response = await api.post('/auth/login', {
        email: data.contact,
        password: data.password
      });
      const user = response.data?.data?.customer;
      const token = response.data?.data?.token;

      if (token) {

        setAuth(user, token);
        router.push(callbackUrl);
        router.refresh(); // مهمة جداً عشان الميدل وير يحس بالتوكن الجديد
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "بيانات الدخول غير صحيحة");
    }
  };
  return (
    <div className="flex flex-col items-center width-full ">
       <div className="mb-6 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold tracking-[0.2em]">Login to El-Foly</h3>
        <p className="text-lg">Sign in to continue!</p>
       </div>
       {serverError && (
        <div className="alert alert-error mb-4 shadow-sm py-2">
          <span className='text-white'>{serverError}</span>
        </div>
      )}
        <form className="w-full flex flex-col gap-10 pr-4" onSubmit={handleSubmit(onSubmit)}>
            <input 
            {...register("contact")}
            placeholder="Email or Phone"
            className="w-full border-b border-black  text-lg focus:outline-none focus:border-(--primary-color) "
            />
            {errors.contact && <span className="text-red-500 text-xs">{errors.contact.message}</span>}
            <input 
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border-b border-black  text-lg focus:outline-none  focus:border-(--primary-color)"
            
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            <div className="flex justify-between items-center">
              <button
              type="submit"
              disabled={isSubmitting}
              className='btn bg-(--primary-color) border-(--primary-color) text-white hover:bg-transparent hover:text-(--primary-color) transition-colors'
              >{isSubmitting ? "Logging in..." : "Log In"}</button>
              <p className='text-lg text-(--primary-color) underline cursor-pointer '>Forget Password ? </p>
            </div>
        </form>
        <p className="mt-4 ">Don&apos;t have an Account ? <span>
          <Link href="/signup" className=" underline">
          Sign up
          </Link>
          </span>
        </p>
    </div>
  )
}

