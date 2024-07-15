import axios, { AxiosRequestConfig } from "axios";
import {
  ConfirmOtpProps,
  LoginProps,
  SignUpProps,} from "./types";
import { toast } from "@/components/ui/use-toast";



export const AuthSignUp = async (payload: SignUpProps) => {
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log("Payload:", payload);
  return await axios(config);

};

export const AuthLogin = async ({ ...rest }: LoginProps) => {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    data: rest,
  };

  try {
    const response = await axios(config);
    console.log('Backend response:', response.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log('Error response from backend:', error.response.data);
      toast({
        title: `Something went wrong!`,
        description: error.response.data.message || "Unable to login",
        className: "toast-error",
      })
    }
    throw error;
  }
};

export const VerifyEmail = async (payload: {
    email: string;
}) => {
    const config = {
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-verification-email`,
        data: payload,
    };

    const { data } = await axios(config);

    return data;
}


export const AuthConfirmOtp = async (payload: {
  email: string;
  otp: string;
}) => {
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
    data: payload,
  };

  const { data } = await axios(config);

  return data;
};


export const ResendOtp = async (payload: {
}) => {
  /**
   * Sends a request to resend the OTP (One-Time Password) using the provided payload.
   *
   * @param payload - The data payload for the request.
   * @returns A configuration object for making a POST request to the OTP resend endpoint.
   */
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/otp/resend-otp`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    }
  };

  const { data } = await axios(config);

  return data;
};

export const AuthChangePassword = async (payload: {
}) => {
  const config = {
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_URL}/changePassword`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios(config);

  return data;
}
