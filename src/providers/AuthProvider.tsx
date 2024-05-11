"use client";

import { onToast } from "@/hooks/useToast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface AuthCtxProps {
  currentAdmin: null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  login: (values: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  fetchCurrentAdmin: () => Promise<any>;
  getCurrentAdmin: () => Promise<any>;
}

const defaultCtxVal: AuthCtxProps = {
  currentAdmin: null,
  loading: false,
  login: (values: { email: string; password: string }) =>
    new Promise((resolve, reject) => reject(null)),
  logout: () => {},
  fetchCurrentAdmin: () => new Promise((resolve, reject) => reject(null)),
  getCurrentAdmin: () => new Promise((resolve, reject) => reject(null)),
  setLoading: (value: SetStateAction<boolean>): void => {},
};

export const AuthCtx = createContext<AuthCtxProps>(defaultCtxVal);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (values: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
    } catch (error: AxiosError | any) {
      if (axios.isAxiosError(error)) {
        const { response } = error;

        if (response) {
          const { data, status } = response;

          if (data.code) {
            onToast(data.code, "error");
          }

          if (status === 500) {
            onToast(
              "Something went wrong! Please try again later or contact us.",
              "error",
            );
            setLoading(false);

            return;
          }
          if (Array.isArray(data.message)) {
            data.message.map((msg: string) => {
              onToast(msg, "error");
            });
          } else {
            onToast(data.message, "error");
          }
        }
      } else {
        onToast(
          "Something went wrong! Please try again later or contact us.",
          "error",
        );
      }
      setLoading(false);
    }
  };

  const logout = async () => {
    setCurrentAdmin(null);
    await router.push("/login");
  };

  const fetchCurrentAdmin = async () => {};

  return (
    <AuthCtx.Provider
      value={{
        currentAdmin,
        loading,
        setLoading,
        login,
        logout,
        fetchCurrentAdmin,
        getCurrentAdmin: async () => {
          if (!currentAdmin) {
            return fetchCurrentAdmin();
          }
          setLoading(false);
          return currentAdmin;
        },
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};
