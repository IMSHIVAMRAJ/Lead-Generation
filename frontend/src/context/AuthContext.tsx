import React, { createContext, useContext, useMemo, useState } from "react";
import { apiClient } from "../api/client";
import type { AuthUser, AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "leadgen.auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<{ user: AuthUser | null; token: string | null }>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { user: null, token: null };
    }
    return JSON.parse(stored) as { user: AuthUser; token: string };
  });

  const updateState = (next: { user: AuthUser | null; token: string | null }) => {
    setState(next);
    if (next.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (payload: LoginPayload) => {
    const response = await apiClient.post<AuthResponse>("/api/auth/login", payload);
    updateState({ user: response.user, token: response.token });
  };

  const register = async (payload: RegisterPayload) => {
    const response = await apiClient.post<AuthResponse>("/api/auth/register", payload);
    updateState({ user: response.user, token: response.token });
  };

  const logout = () => updateState({ user: null, token: null });

  const value = useMemo(
    () => ({ user: state.user, token: state.token, login, register, logout }),
    [state.user, state.token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
