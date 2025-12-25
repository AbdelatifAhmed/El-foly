import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  image?: string;
}

interface AuthStore {
  user: User | null; // إذا كان null يعني غير مسجل
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null, // الحالة الافتراضية: غير مسجل (البروفايل سيختفي)
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));