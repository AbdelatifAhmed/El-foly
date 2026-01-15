'use client';
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/validation/profile";
import api from "@/lib/axios";
import { User, Shield, Package, MapPin, Camera, Loader2, Pencil, PencilOff } from "lucide-react";
import SecurityTab from "@/components/UI/SecurityTab";


const ProfileDashboard = () => {
  const { user, setAuth, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState("personal");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
    }
  });
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const handleToggleEdit = () => {
    if (isEditing) {
      if (isDirty) {
        setShowDiscardModal(true);
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const confirmDiscard = () => {
    reset();
    setIsEditing(false);
    setShowDiscardModal(false);
  };

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

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
  if (isLoading) return <div className="w-full min-h-screen flex items-center justify-center">
    <div className="loading loading-ring loading-xl"></div>
  </div>;

  if (!user) {
    return <div className="p-20 text-center">لم يتم العثور على بيانات، برجاء تسجيل الدخول.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10 mt-20">
      <div className="max-w-6xl mx-auto pt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* --- Sidebar --- */}
          <div className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 mb-4">
                <img src={user?.avatar || "/images/account-avatar-profile-user.svg"} className="rounded-full object-cover w-full h-full border-4 border-gray-100" />
                <button className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full shadow-lg curosr-pointer">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="font-bold text-lg">{user?.full_name}</h2>
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

              {showDiscardModal && (
                <div className="modal modal-open">
                  <div className="modal-box shadow-2xl border border-gray-100">
                    <h3 className="font-bold text-lg text-error flex items-center gap-2">
                      ⚠️ Unsaved Changes
                    </h3>
                    <p className="py-4 text-gray-600">
                      You have made some changes. Are you sure you want to discard them?
                    </p>
                    <div className="modal-action">
                      <button
                        className="btn btn-ghost"
                        onClick={() => setShowDiscardModal(false)}
                      >
                        Keep Editing
                      </button>
                      <button
                        className="btn btn-error text-white"
                        onClick={confirmDiscard}
                      >
                        Discard Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'personal' && (
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">Personal Information</h3>

                    <button
                      type="button"
                      onClick={handleToggleEdit}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${isEditing ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {isEditing ? <PencilOff size={20} /> : <Pencil size={20} />}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* First Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">First Name</label>
                        {isEditing ? (
                          <input {...register("first_name")} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />) : (
                          <div className="p-3 bg-gray-50 rounded-xl text-gray-500 border border-transparent">
                            {user?.first_name}
                          </div>
                        )}
                        {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message as string}</p>}
                      </div>

                      {/* Last Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Last Name</label>
                        {isEditing ? (
                          <input {...register("last_name")} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-xl text-gray-500 border border-transparent">
                            {user?.last_name}
                          </div>
                        )}
                        {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message as string}</p>}
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                        {isEditing ? (
                          <input {...register("phone")} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />) : (
                          <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
                            {user?.phone || 'Not set'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-600">Bio</label>
                      {isEditing ? (
                        <textarea {...register("bio")} rows={3} className="border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-500 italic">
                          {user?.bio || 'No bio yet...'}
                        </div>
                      )}
                    </div>

                    {/* زر حفظ التعديلات - يظهر فقط في وضع التعديل */}
                    {isEditing && (
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={loading || !isDirty} // معطل لو مفيش تغييرات
                          className="btn btn-primary px-10 rounded-xl"
                        >
                          {loading && <Loader2 className="animate-spin" size={18} />}
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </section>
              )}


              {activeTab === 'orders' && (
                <div className="text-center py-20">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                </div>
              )}


              {activeTab === 'security' && (
                <SecurityTab />
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