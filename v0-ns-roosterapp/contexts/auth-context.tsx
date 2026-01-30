"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  registerUser,
  loginUser,
  getUserById,
  saveRoosterSettings,
  getRoosterSettings,
  type User,
  type RoosterSettings,
} from "@/lib/auth-store";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  settings: RoosterSettings | null;
  saveSettings: (settings: Omit<RoosterSettings, "userId">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<RoosterSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  // TODO: Replace with proper session management (JWT, cookies, etc.)
  useEffect(() => {
    const storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (storedUserId) {
      const existingUser = getUserById(storedUserId);
      if (existingUser) {
        setUser(existingUser);
        const userSettings = getRoosterSettings(storedUserId);
        if (userSettings) {
          setSettings(userSettings);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: Make actual API call to authentication endpoint
    const loggedInUser = loginUser(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("userId", loggedInUser.id);
      const userSettings = getRoosterSettings(loggedInUser.id);
      if (userSettings) {
        setSettings(userSettings);
      }
      return { success: true };
    }
    return { success: false, error: "Ongeldige e-mail of wachtwoord" };
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    // TODO: Make actual API call to registration endpoint
    const newUser = registerUser(email, password);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem("userId", newUser.id);
      return { success: true };
    }
    return { success: false, error: "E-mailadres is al in gebruik" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSettings(null);
    localStorage.removeItem("userId");
    // TODO: Invalidate session on server
  }, []);

  const saveSettingsHandler = useCallback(
    (newSettings: Omit<RoosterSettings, "userId">) => {
      if (!user) return;
      const fullSettings: RoosterSettings = {
        ...newSettings,
        userId: user.id,
      };
      saveRoosterSettings(fullSettings);
      setSettings(fullSettings);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        settings,
        saveSettings: saveSettingsHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
