import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import z from "zod";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailVerificationSchema } from "@/lib/formSchema";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthConfirmOtp} from "../../../../hooks/auth";
import { useMutation } from "@tanstack/react-query";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { QUERY_KEYS } from "@/lib/utils";
import { ConfirmOtpProps } from "../../../../hooks/auth/types";
import { useStorage } from "@/lib/useStorage";

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  // const email = router.query.email as string;
  const email = useStorage.getItem("userEmail");

  const form = useForm<z.infer<typeof emailVerificationSchema>>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });



  const handleBacktoLogin = () => {
    router.push("/auth/login");
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

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.confirmOtp],
    mutationFn: (data: ConfirmOtpProps) => AuthConfirmOtp(data),
    onSuccess: () => {
      toast({
        title: "OTP verified successfully!",
        description: "You can now login to your account.",
        variant: "default",
      });
      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Something went wrong!",
        description: "Unable to verify OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof emailVerificationSchema>) => {
    // const payload = {
    //   email: email,
    //   otp: values.otp,
    // };
    if (email !== null) {
      const payload = {
        email: email,
        otp: values.otp,
      };
      mutate(payload);
    } else {
      toast({
        title: "Something went wrong!",
        description: "Unable to verify OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400/5 to-yellow-400/15 overflow-hidden">
      {/* <div
        className="absolute md:block hidden md:w-1/2 top-0 left-8 h-full lg:w-1/2"
      >
        <Image
          src="/images/agricFarm.svg"
          alt="Agricultural Illustration Left"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <motion.div
        variants={rotatingVariants}
        animate="rotate"
        className="absolute hidden lg:block top-0 right-8 h-full w-1/4"
      >
        <Image
          src="/images/globe.svg"
          alt="Agricultural Illustration Right"
          layout="fill"
          objectFit="contain"
        />
      </motion.div> */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
      <Card className="mx-auto max-w-sm z-10 bg-transparent lg:bg-white py-6 w-full">
      <CardHeader>
          <CardTitle className="text-2xl dark:text-black">OTP Verification</CardTitle>
          <CardDescription className="text-[--prodile-text-darkBlue]">
          A code has been sent to{" "}
          <span className="text-[--prodile-yellow]">********@mail.com</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="my-2">
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
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-center">
                    <InputOTP maxLength={6} {...field} className="flex justify-center">
                      <InputOTPGroup className="space-x-4 flex justify-center">
                        <InputOTPSlot
                          index={0}
                          {...form.register("otp")}
                          className="bg-[#1E1E1E0D]"
                        />
                        <InputOTPSlot
                          index={1}
                          {...form.register("otp")}
                          className="bg-[#1E1E1E0D]"
                        />
                        <InputOTPSlot
                          index={2}
                          {...form.register("otp")}
                          className="bg-[#1E1E1E0D]"
                        />
                        <InputOTPSeparator />
                        <InputOTPSlot
                          index={3}
                          {...form.register("otp")}
                          className="bg-[#1E1E1E0D]"
                        />
                        <InputOTPSlot
                          index={4}
                          {...form.register("otp")}
                          className="bg-[#1E1E1E0D]"
                        />
                        <InputOTPSlot
                          index={5}
                          {...form.register("otp")}
                          className="bg-[#1E1E1E0D]"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            </motion.div>
            <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-4">
              <CustomButton
                type="submit"
                className="w-full dark:bg-[--prodile-yellow] bg-[--prodile-yellow] h-10 rounded-xl text-lg font-normal text-white py-4"
                isLoading={isPending}
                disabled={isPending}
              >
                Continue
              </CustomButton>
              <Button
                className="w-full dark:text-white dark:hover:bg-blue-950 dark:hover:transition-all bg-[--prodile-blue] font-normal text-lg py-4 h-10"
                onClick={handleBacktoLogin}
              >
                Back to login
              </Button>
            </div>
            </motion.div>
          </motion.form>
        </Form>
        </CardContent>
      </Card>
      </motion.div>
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

export default ConfirmEmail;
