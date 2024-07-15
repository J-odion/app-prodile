import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken } from "@/services/authService";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    console.log("Access Token from localStorage:", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log("Authorization Header Set:", config.headers["Authorization"]);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
