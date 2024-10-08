import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmEmailSchema } from "@/lib/formSchema";
import { useToast } from "@/components/ui/use-toast";
import FormRender from "@/components/FormRender";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const ConfirmEmail = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof confirmEmailSchema>>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleBacktoLogin = () => {
    router.push("/auth/login");
  };

  const onSubmit = async (data: z.infer<typeof confirmEmailSchema>) => {
    console.log(data);
    toast({
      title: "Code sent",
      description: "Copy code sent to your phone number to verify your account",
      variant: "default",
    });
    router.push("/auth/verifyOtp");
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
      <div
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
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <Card className="mx-auto max-w-sm bg-white shadow-lg rounded-lg p-6">
          <motion.div variants={itemVariants}>
            <CardHeader>
              <CardTitle className="text-2xl">Confirm your email</CardTitle>
              <CardDescription>
                Kindly provide your email to process
              </CardDescription>
            </CardHeader>
          </motion.div>
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
                  <div className="flex justify-center items-center flex-col gap-4">
                    <CustomButton
                      type="submit"
                      className="w-full bg-[--prodile-yellow] h-10 rounded-xl text-lg font-normal text-white py-4"
                    >
                      Send code
                    </CustomButton>
                    <Link href="/auth/login" className="hover:underline">
                      Back to login
                    </Link>
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
