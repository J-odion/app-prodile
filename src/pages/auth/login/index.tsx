import React, { useState, useContext } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/formSchema";
import { useToast } from "@/components/ui/use-toast";
import FormRender from "@/components/FormRender";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { Query, useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../../../../hooks/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/utils";
import { LoginProps } from "../../../../hooks/auth/types";
import { useStorage } from "@/lib/useStorage";
import { AuthContext } from "../../../../context/auth.context";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuthTokens } = useContext(AuthContext);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.login],
    mutationFn: (data: LoginProps) => AuthLogin(data),
    onSuccess(res) {
      if (res.status === 200) {
        console.log("Login response:", res.data);
        toast({
          title: `Logged in successfully`,
          className: "toast-success",
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.login] });
        setAuthTokens(res.data.token);
        console.log(res.data.token);
        useStorage.setItem("token", res.data.token)
        router.push("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        className: "toast-error",
      });
    }
  }
});

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    mutate(values);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute md:block hidden md:w-1/2 top-0 left-8 h-full lg:w-1/2"
      >
        <Image
          src="/images/agricFarm.svg"
          alt="Agricultural Illustration Left"
          layout="fill"
          objectFit="contain"
        />
      </motion.div>
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
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <Card className="mx-auto max-w-sm bg-white shadow-lg rounded-lg p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
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
                    name="email"
                    render={({ field }) => (
                      <FormRender
                        placeholder="example@gmail.com"
                        field={field}
                        label="Email"
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
                      />
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="py-2 flex items-center justify-end w-full">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <CustomButton
                    type="submit"
                    className="w-full bg-[--prodile-yellow] h-10 rounded-xl text-lg font-normal text-white py-4"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    Login
                  </CustomButton>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="mt-4 text-center">
                    <p className="text-base font-normal">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/auth/signup"
                        className="text-[--prodile-yellow] underline hover:opacity-40"
                      >
                        Sign up
                      </Link>
                    </p>
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

export default Login;
