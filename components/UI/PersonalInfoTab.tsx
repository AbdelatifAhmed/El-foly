import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/validation/profile";
import api from "@/lib/axios";
import Toast from "../common/toast";
import { Loader2, Pencil, PencilOff } from "lucide-react";
import Cookies from "js-cookie";
const PersonalInfoTab = () => {
    const { user, setAuth } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            date_of_birth: user?.date_of_birth || "",
            phone: user?.phone || "",
            gender: user?.gender || "",
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
                first_name: user?.first_name || "",
                last_name: user?.last_name || "",
                date_of_birth: user?.date_of_birth || "",
                phone: user?.phone || "",
                gender: user?.gender || "",
            });
        }
    }, [user, reset]);

    const onUpdateProfile = async (data: any) => {
        setLoading(true);
        try {
            const res = await api.put('/auth/update-profile', data);
            if (!res.data.success) {
                <Toast type="error" message={res.data.message || 'Error updating profile'} />
                throw new Error(res.data.message);
            }
            if (res.status === 200) {
                console.log(res);
                
                <Toast type="success" message={res.data.message} />
                const token = Cookies.get('auth_token');
                if (token) {
                    setAuth(res.data.data, token);
                }

            }

        } catch (error: any) {
            <Toast type="error" message={'Error updating profile'} />
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
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
                        {/* Gender */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600">Gender</label>
                            {isEditing ? (
                                <select
                                    {...register("gender")}
                                    className=" border p-3 w-full rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-500 capitalize">
                                    {user?.gender || 'Not set'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
                        {isEditing ? (
                            <input
                                type="date"
                                {...register("date_of_birth")}
                                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary outline-none border-gray-200"
                            />
                        ) : (
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
                                {user?.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('en-GB') : 'Not set'}
                            </div>
                        )}
                    </div>
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

        </>
    )
}

export default PersonalInfoTab
