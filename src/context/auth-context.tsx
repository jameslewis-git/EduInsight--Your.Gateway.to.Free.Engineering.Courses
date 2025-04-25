"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";
import { useCenterPopup } from "@/components/center-popup-provider";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCheck, setInitialCheck] = useState(true);
  const router = useRouter();
  const { showCenterPopup } = useCenterPopup();

  useEffect(() => {
    // Check for current user on component mount
    const checkUser = async () => {
      setIsLoading(true);
      const { user, error } = await getCurrentUser();
      
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
      setInitialCheck(false);
    };

    checkUser();
  }, []);

  // Show login popup when user logs in
  useEffect(() => {
    if (!initialCheck && !isLoading && user) {
      showCenterPopup({
        type: 'login',
        message: `Welcome back${user.user_metadata?.full_name ? ', ' + user.user_metadata.full_name : ''}! You are now logged in successfully.`,
        duration: 5000
      });
    }
  }, [user, isLoading, initialCheck, showCenterPopup]);

  const logout = async () => {
    // Show signout popup before actually signing out
    showCenterPopup({
      type: 'signout',
      message: 'Thank you for using EduInsight. You have been signed out successfully.',
      duration: 5000
    });
    
    // Wait for popup to be visible before signing out
    setTimeout(async () => {
      await signOut();
      setUser(null);
      router.push("/");
      router.refresh();
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 