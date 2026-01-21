import { create } from "zustand";
import Cookies from "js-cookie";
interface AuthState {
  user: any | null;
  isLoading: boolean; // إضافة حالة التحميل
  setAuth: (user: any, token: string) => void;
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // ابدأ بـ true
  setAuth: (user, token) => {
    Cookies.set('auth_token', token, { expires: 1 });
    set({ user, isLoading: false });
  },
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => {
    Cookies.remove('auth_token');
    set({ user: null, isLoading: false });
  },
}));