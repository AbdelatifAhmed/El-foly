'use client';
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { User, Shield, Package, MapPin, Camera, Loader2, Pencil, PencilOff } from "lucide-react";
import SecurityTab from "@/components/UI/SecurityTab";
import PersonalInfoTab from "@/components/UI/PersonalInfoTab";


const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { user, setAuth, isLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
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

              {/*  */}
                {activeTab === 'personal' && (
                  <PersonalInfoTab />
                )}

              {/* Orders */}
              {activeTab === 'orders' && (
                <div className="text-center py-20">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                </div>
              )}

              {/* Security */}
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