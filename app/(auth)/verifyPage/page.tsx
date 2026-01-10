'use client';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";

const verifySchema = z.object({
  code: z.string().length(6, "الكود يجب أن يتكون من 6 أرقام"),
});

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [timeLeft, setTimeLeft] = useState(60); // 60 ثانية
  const [canResend, setCanResend] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // تنظيف الذاكرة عند مغادرة الصفحة
  }, [timeLeft]);

  // --- دالة التأكيد (Verify) ---
  const onSubmit = async (data: { code: string }) => {
    try {
      const response = await axios.post('https://elfolystore.alkyall.com/api/auth/verify-email', {
        email,
        code: data.code
      });
      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "الكود غير صحيح");
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      await axios.post('https://elfolystore.alkyall.com/api/auth/verify-reset-code', { email });
      alert("تم إعادة إرسال الكود لبريدك الإلكتروني");
      
      setTimeLeft(60);
      setCanResend(false);
    } catch (error: any) {
      alert("فشل إعادة الإرسال، حاول لاحقاً");
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-10 shadow-xl rounded-2xl mt-20 bg-white">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="text-center text-gray-500 mb-6">
        أدخل الكود المرسل إلى <br/> 
        <span className="font-bold text-black">{email || "بريدك الإلكتروني"}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <input 
          {...register("code")}
          type="text"
          placeholder="0 0 0 0 0 0"
          className="input input-bordered w-full text-center text-3xl tracking-[0.3em] font-mono focus:border-primary h-16"
          maxLength={6}
        />
        {errors.code && <span className="text-red-500 text-sm text-center">{errors.code.message}</span>}
        
        <button type="submit" disabled={isSubmitting} className="btn bg-(--primary-color) text-white w-full border-(--primary-color) hover:bg-transparent hover:text-(--primary-color)">
          {isSubmitting ? "Checking..." : "Verify"}
        </button>
      </form>

      <div className="mt-8 text-center">
        {canResend ? (
          <button 
            onClick={handleResend}
            className="btn btn-warning font-bold hover:underline cursor-pointer transition-all "
          >
            resed Code
          </button>
        ) : (
          <p className="text-gray-400 text-sm">
            يمكنك إعادة إرسال الكود بعد {" "}
            <span className="text-black font-mono font-bold">{timeLeft}</span> ثانية
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;