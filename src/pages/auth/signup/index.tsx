import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { any, set, z } from "zod";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/lib/formSchema";
import { useToast } from "@/components/ui/use-toast";
import FormRender from "@/components/FormRender";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignUpProps, ConfirmOtpProps } from "../../../../hooks/auth/types";
import { useMutation } from "@tanstack/react-query";
import { AuthSignUp, AuthConfirmOtp } from "../../../../hooks/auth";
import { QUERY_KEYS } from "@/lib/utils";
import { useAuth } from "../../../../context/auth.context";
import { Loader2Icon } from "lucide-react";
import { motion } from "framer-motion";
import { Form, FormField } from "@/components/ui/form";
import { useStorage } from "@/lib/useStorage";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const mutation = useMutation({
  //   mutationFn: AuthSignUp,
  //   onSuccess: () => {
  //     toast({
  //       title: "Signup successful",
  //       description: "Please confirm your email to continue",
  //       variant: "default",
  //     });
  //     router.push("/auth/verifyOtp");
  //   },
  //   onError: (error: any) => {
  //     setIsLoading(false);
  //     console.log(error);
  //     toast({
  //       title: "Signup failed",
  //       description: "An error occurred while signing up",
  //       variant: "destructive",
  //     });
  //   },
  // });

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.signUp],
    mutationFn: (data: SignUpProps) => AuthSignUp(data),
    onSuccess(res) {
      if (res.status === 200) {
        console.log("Signup response:", res.data);
        toast({
          title: `Signup successful`,
          description: "Please confirm your email to continue",
          className: "toast-success",
        });
        router.push("/auth/verifyOtp");
      } else {
        toast({
          title: "Signup failed",
          description: "An error occurred while signing up",
          className: "toast-error",
        });
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    useStorage.setItem('userEmail', payload.email);
    mutate(payload);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const floatingVariants = {
    float: {
      y: [0, 10, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const rotatingVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const handleBacktoLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400/5 to-yellow-400/15 overflow-hidden">
      <div className="md:flex flex-[0.5] h-screen hidden">
        <img
          src="/images/bg001.jpg"
          alt="background"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <Card className="mx-auto max-w-sm bg-white shadow-lg rounded-lg p-6 w-full">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-black">Signup</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
            <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormRender
                      placeholder="name"
                      field={field}
                      label="Name"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormRender
                      placeholder="example@domain.com"
                      field={field}
                      label="Email Address"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormRender
                      placeholder="Enter password"
                      field={field}
                      label="Password"
                      type="password"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormRender
                      placeholder="Confirm password"
                      field={field}
                      label="Confirm Password"
                      type="password"
                      className="w-full"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <CustomButton
                  type="submit"
                  className="w-full dark:bg-[--prodile-yellow] bg-[--prodile-yellow] h-10 rounded-xl text-lg font-normal text-white py-4"
                  isLoading={isPending}
                  disabled={isPending}
                >
                  Signup
                </CustomButton>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="mt-4 text-center">
                  <p className="text-base font-normal dark:text-black">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="text-[--prodile-yellow] dark:text-[--prodile-yellow] underline hover:opacity-40"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-300 rounded-full filter blur-2xl opacity-20"
        variants={floatingVariants}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-300 rounded-full filter blur-2xl opacity-20"
        variants={floatingVariants}
      ></motion.div>
    </div>
  );
};

export default Signup;
