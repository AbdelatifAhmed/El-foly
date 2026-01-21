'use client'
import Button from "@/components/common/Button"
import { SignupInput, signupSchema } from "@/validation/auth"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const SignupPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(signupSchema), 
  });

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: SignupInput) => {
  try {
    // setLoading(true); 

    const response = await axios.post('https://elfolystore.alkyall.com/api/auth/register', {
      first_name: data.fName,
      last_name: data.lName,
      email: data.contact.includes('@') ? data.contact : undefined,
      phone: !data.contact.includes('@') ? data.contact : undefined,
      password: data.password
    });

    if (response.status === 201 || response.status === 200) {
      router.push(`/verifyPage?email=${data.contact.includes('@') ? data.contact : ''}`);
    }
  } catch (error: any) {
    const serverMessage = error.response?.data?.message || "حدث خطأ ما";
    alert(serverMessage); 
  }
};
  return (
    <div className="flex flex-col items-center width-full ">
       <div className="mb-6 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold tracking-[0.2em]">Create an Account</h3>
        <p className="text-lg">Sign up to get started!</p>
       </div>
        <form className="w-full flex flex-col gap-10 pr-4" onSubmit={handleSubmit(onSubmit)}>
            <input 
            {...register("fName")}
            placeholder="First Name"
            className="w-full border-b border-black text-lg focus:outline-none  focus:border-(--primary-color)" 
            />
            {errors.fName && <span className="text-red-500 text-sm">{errors.fName.message}</span>}
            <input 
            {...register("lName")}
            placeholder="Last Name"
            className="w-full border-b border-black text-lg focus:outline-none  focus:border-(--primary-color)" 
            />
            {errors.lName && <span className="text-red-500 text-sm">{errors.lName.message}</span>}
            <input 
            {...register("contact")}
            placeholder="Email or Phone"
            className="w-full border-b border-black  text-lg focus:outline-none  focus:border-(--primary-color)"
            
            />
            {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
            <input 
            {...register("password")}
            placeholder="Password"
            className="w-full border-b border-black  text-lg focus:outline-none  focus:border-(--primary-color)"
            
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            <div className="flex flex-col gap">

              <button disabled={isSubmitting} type="submit" className="w-full bg-(--primary-color) py-3 px-4 text-white rounded-lg  cursor-pointer hover:bg-(--primary-color)/90">
                Sign up 
              </button>

              <button  className="w-full mt-4 py-3 px-4 border border-gray-300 rounded-lg text-lg
               font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer flex justify-center items-center">
                <Image 
                src="/images/Google.svg"
                width={24}
                height={24}
                alt='Google symbol'
                className="mr-2"
                />
                Sign up with Google
              </button>
            </div>
        </form>
        <p className="mt-4 ">Already have an Account ? <span>
          <Link href="/login" className=" underline" >
          Log in
          </Link>
          </span>
        </p>
    </div>
  )
}

export default SignupPage