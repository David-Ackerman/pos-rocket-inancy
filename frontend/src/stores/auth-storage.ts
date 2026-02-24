import type { AuthState } from "@/types/auth-state";
import { createJSONStorage, type StateStorage } from "zustand/middleware";

let rememberMe = false;

export const setRememberMe = (value: boolean) => {
  rememberMe = value;
};

export const dynamicStorage: StateStorage = {
  getItem: (name) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.getItem(name);
  },

  setItem: (name, value) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(name, value);
  },

  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const authPersistStorage = createJSONStorage<AuthState>(
  () => dynamicStorage,
);
