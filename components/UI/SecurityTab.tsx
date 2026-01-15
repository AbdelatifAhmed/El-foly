'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/axios";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// 1. Validation Schema
const passwordSchema = z.object({
  new_password: z.string().min(8, "كلمة السر يجب أن تكون 8 رموز على الأقل"),
  confirm_password: z.string()
}).refine((data) => data.new_password === data.confirm_password, {
  message: "كلمات السر غير متطابقة",
  path: ["confirm_password"],
});

const SecurityTab = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (data: any) => {
    try {
      await api.put('/change-password', { password: data.new_password });
      showNotification("تم تحديث كلمة السر بنجاح! ✅", "success");
      reset();
    } catch (error: any) {
      showNotification(error.response?.data?.message || "حدث خطأ أثناء التحديث", "error");
    }
  };

  return (
    <section className="animate-in fade-in duration-500">
      {/* --- Toast Notification --- */}
      {toast && (
        <div className="toast toast-top toast-end z-100">
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} text-white shadow-lg`}>
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* --- Header Section --- */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Security Settings</h3>
          <p className="text-sm text-gray-500">Update your account password</p>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Password Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label font-semibold text-gray-700">New Password</label>
              <input
                type="password"
                {...register("new_password")}
                placeholder="••••••••"
                className={`input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary ${errors.new_password ? 'input-error' : ''}`}
              />
              {errors.new_password && <span className="text-error text-xs mt-1">{errors.new_password.message as string}</span>}
            </div>

            <div className="form-control">
              <label className="label font-semibold text-gray-700">Confirm New Password</label>
              <input
                type="password"
                {...register("confirm_password")}
                placeholder="••••••••"
                className={`input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary ${errors.confirm_password ? 'input-error' : ''}`}
              />
              {errors.confirm_password && <span className="text-error text-xs mt-1">{errors.confirm_password.message as string}</span>}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary px-10 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Update Password"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Password Rules & Tips */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 h-full">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Lock size={18} className="text-primary" /> Password Rules
            </h4>
            
            <ul className="text-sm space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5"></div>
                <span>Min 8 characters long</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5"></div>
                <span>Include special characters (@#$)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5"></div>
                <span>Mix uppercase & lowercase</span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
              <p className="text-xs text-yellow-800 leading-relaxed">
                <span className="font-bold block mb-1">💡 Pro Tip:</span>
                Don't use the same password you use for other accounts to keep your profile safe.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SecurityTab;