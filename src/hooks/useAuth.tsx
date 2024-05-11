"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthCtx } from "@/providers/AuthProvider";

export const useAuth = () => {
  const {
    currentAdmin,
    loading,
    login,
    fetchCurrentAdmin,
    getCurrentAdmin,
    setLoading,
    logout,
  } = useContext(AuthCtx);

  return {
    currentAdmin,
    loading,
    login,
    logout,
    setLoading,
    fetchCurrentAdmin,
    getCurrentAdmin,
  };
};

export const useAuthProtection = (options: {
  redirect: string;
  preventAuthenticatedUser?: boolean;
  preventUnAuthenticatedUser?: boolean;
}) => {
  const router = useRouter();
  const { currentAdmin, loading, getCurrentAdmin, setLoading } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const admin = await getCurrentAdmin();
      if (options?.preventAuthenticatedUser) {
        if (admin) {
          await router.replace(options.redirect);
        }
      } else if (options?.preventUnAuthenticatedUser) {
        if (!admin) {
          await router.back();
        }
      }
      setLoading(false);
      return;
    })();
  }, []);

  return { currentAdmin, loading };
};
