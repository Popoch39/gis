import { User } from "@/types/models/user"
import { create } from "zustand"
import { persist } from 'zustand/middleware';
import axios from "axios";
import Cookies from "js-cookie"

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;


  // actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            email,
            password
          });

          const { token, user } = response.data;

          Cookies.set('auth_token', token, { expires: 7 });

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false
          });

          return Promise.resolve();
        } catch (error) {
          set({ isLoading: false });
          return Promise.reject(new Error('Échec de la connexion. Vérifiez vos identifiants.'));
        }
      },

      register: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
            email,
            password,
          });

          const { token, user } = response.data;

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false
          });

          return Promise.resolve();
        } catch (error) {
          set({ isLoading: false });
          return Promise.reject(new Error("Échec de l'inscription. Veuillez réessayer."));
        }
      },

      logout: async () => {
        const { token } = get();

        set({ isLoading: true });

        try {
          if (token) {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
          }
        } catch (error) {
          console.error("Erreur lors de la déconnexion de l'API:", error);
        } finally {
          Cookies.remove('auth_token');
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },

      fetchUserProfile: async () => {
        const { token } = get();
        if (!token) return;

        set({ isLoading: true });

        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      }
    }),
    {
      name: 'auth-storage', // nom utilisé pour localStorage
      partialize: (state) => ({ token: state.token }), // On ne persiste que le token
    }
  )
);
