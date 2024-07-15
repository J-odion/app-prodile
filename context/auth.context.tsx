import React, { useContext, createContext, useState, useEffect } from "react";
import { useStorage } from "@/lib/useStorage";
import { useRouter } from "next/router";
import { axiosInstance } from "../hooks/axiosInstance";
import { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken, removeAccessToken, removeRefreshToken } from "@/services/authService";

type AuthType = {
  accessToken: string | null;
  setAuthTokens: (accessToken: string) => void;
  clearAuthTokens: () => void;
};

export const AuthContext = createContext<AuthType>({
  accessToken: null,
  setAuthTokens: () => {},
  clearAuthTokens: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const [accessToken, setAccessTokenState] = useState<string | null>(getAccessToken());


  useEffect(() => {
    setAccessToken(accessToken ?? '');
  }, [accessToken]);

  const setAuthTokens = (newAccessToken: string) => {
    setAccessTokenState(newAccessToken);
  };

  const clearAuthTokens = () => {
    setAccessTokenState(null);
    removeAccessToken();
  };


  const value: AuthType = {
    accessToken,
    setAuthTokens,
    clearAuthTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
