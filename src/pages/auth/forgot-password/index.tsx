import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/formSchema";
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
import { motion } from "framer-motion";
import { AuthChangePassword } from "../../../../hooks/auth";
import { ResetPasswordProps } from "../../../../hooks/auth/types";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/utils";

const ForgotPassword = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleBacktoLogin = () => {
    router.push("/auth/login");
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.resetPassword],
    mutationFn: (data: ResetPasswordProps) => AuthChangePassword(data),
    onSuccess(res) {
      console.log(res)
      if (res) {
        console.log("Reset response:", res.data);
        router.push("/auth/login");
      } else {
        toast({
          title: "Reset password failed",
          description: "An error occurred while restting password",
          className: "toast-error",
        });
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    const payload = {
      password: data.password,
    };
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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400/5 to-yellow-400/15 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <Card className="mx-auto max-w-sm z-10 bg-white w-full py-8">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-black">Reset Password</CardTitle>
            <CardDescription>
              Type in your new password
            </CardDescription>
          </CardHeader>

          <CardContent>
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
                    name="password"
                    render={({ field }) => (
                      <FormRender
                        placeholder="Enter new password"
                        field={field}
                        label="New password"
                        classNameLabel="dark:text-[#646464]"
                      />
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="flex justify-center items-center flex-col gap-4">
                    <CustomButton
                      type="submit"
                      className="w-full dark:bg-[--prodile-yellow] bg-[--prodile-yellow] h-10 rounded-xl text-lg font-normal text-white py-4"
                      isLoading={isPending}
                      disabled={isPending}
                    >
                      Continue
                    </CustomButton>
                    <Link href="/auth/login" className='dark:text-black hover:underline'>Back to login</Link>
                  </div>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
          <motion.div variants={itemVariants}>
            <div className="text-xs mt-4 justify-center flex gap-6 items-center">
              <ul className="flex gap-6 items-center dark:text-black">
                <li>Terms and conditions</li>
                <li className="bg-black h-[5px] w-[5px] rounded-full"></li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </motion.div>
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

export default ForgotPassword;
