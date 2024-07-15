import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 character(s) long",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
});

export const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 character(s) long",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
  confirmPassword: z.string()
    .min(8, {
      message: "Password must be at least 8 character(s) long",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
})


export const confirmEmailSchema = z.object({
  email: z.string().email(),
})

export const emailVerificationSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "otp must contain at least 6 character(s)",
    })
    .max(6, {
      message: "otp must contain at most 6 character(s)",
    }),
});


export const profileFormSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  phone: z.string().min(11).max(11),
  address: z.string().min(10).max(100),
  dob: z.string().min(10).max(10),
  promoterName: z.string().min(2).max(30),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  website: z.string().url({ message: "Please enter a valid URL." }),
  nin: z.string().min(11).max(11),
  bvn: z.string().min(11).max(11),
})
