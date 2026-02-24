import { apolloClient } from "@/lib/apollo";
import { LOGIN } from "@/lib/graphql/mutations/login";
import { REGISTER } from "@/lib/graphql/mutations/register";
import type { LoginInput, RegisterInput, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authPersistStorage, setRememberMe } from "./auth-storage";

type RegisterMutationData = {
  register: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

type LoginMutationData = {
  login: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signup: (data: RegisterInput) => Promise<boolean>;
  login: (data: LoginInput) => Promise<boolean>;
  logout: VoidFunction;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        setRememberMe(!!loginData.rememberMe);

        try {
          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: { data: loginData },
          });

          if (data?.login) {
            const { token, user } = data.login;
            set({
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      signup: async (data: RegisterInput) => {
        setRememberMe(true);
        console.log("Signing up with data:", data);
        try {
          const { data: response } = await apolloClient.mutate<
            RegisterMutationData,
            { data: RegisterInput }
          >({
            mutation: REGISTER,
            variables: { data },
          });

          if (response?.register) {
            const { token, user } = response.register;
            set({
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });
          }
          return true;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      logout: () => {
        setRememberMe(false);
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage");
        sessionStorage.removeItem("auth-storage");
        apolloClient.clearStore();
      },
    }),
    {
      name: "auth-storage",
      storage: authPersistStorage,
    },
  ),
);
