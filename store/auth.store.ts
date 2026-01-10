import { create } from 'zustand';
import Cookies from 'js-cookie';
interface AuthState {
  user: any | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
  isHydrated?: boolean;
  setUser: (user: any | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setAuth: (user, token) => {
  if (token) {
    Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict' });
    set({ user });
  } else {
    console.error("Token is undefined!");
  }
},
  logout: () => {
    Cookies.remove('auth_token');
    set({ user: null });
  },
  setUser: (user) => set({ user }),
}));