'use client';
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/validation/profile";
import api from "@/lib/axios";
import { User, Shield, Package, MapPin, Camera, Loader2 } from "lucide-react";

const ProfileDashboard = () => {
  const { user, setAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState("personal");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
    }
  });

  const onUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.put('/update-profile', data);
      // تحديث البيانات في الستور (نحتفظ بالتوكن القديم)
      const token = document.cookie.split('auth_token=')[1]?.split(';')[0];
      setAuth(res.data.user, token);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-10 mt-20">
      <div className="max-w-6xl mx-auto pt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* --- Sidebar --- */}
          <div className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 mb-4">
                <img src={user?.avatar || "/default-avatar.png"} className="rounded-full object-cover w-full h-full border-4 border-gray-100" />
                <button className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full shadow-lg">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="font-bold text-lg">{user?.name}</h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'personal', label: 'Personal Info', icon: User },
                { id: 'orders', label: 'My Orders', icon: Package },
                { id: 'address', label: 'Addresses', icon: MapPin },
                { id: 'security', label: 'Security', icon: Shield },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* --- Main Content Area --- */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              
              {activeTab === 'personal' && (
                <section>
                  <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
                  <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Full Name</label>
                        <input {...register("name")} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                        <input {...register("phone")} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-600">Bio</label>
                      <textarea {...register("bio")} rows={3} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Tell us about yourself..." />
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                      >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        Save Changes
                      </button>
                    </div>
                  </form>
                </section>
              )}

              {activeTab === 'orders' && (
                <div className="text-center py-20">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                </div>
              )}
              
              {/* باقي الـ Tabs بنفس المنطق */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;