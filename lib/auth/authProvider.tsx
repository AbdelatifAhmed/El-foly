'use client';
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import Cookies from 'js-cookie';
import api from "../axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('auth_token');
      if (token) {
        try {
          const res = await api.get('https://api-friend.com/v1/me');
          setUser(res.data.user);
        } catch (err) {
          Cookies.remove('auth_token');
        }
      }
    };
    fetchUser();
  }, []);

  return <>{children}</>;
}