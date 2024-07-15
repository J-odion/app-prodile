import React from "react";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Success = () => {
  const router = useRouter();

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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400/5 to-yellow-400/15 overflow-hidden">
      <div
        className="absolute md:block hidden md:w-1/2 top-0 left-8 h-full lg:w-1/4"
      >
        {/* <Image
          src="/images/agricFarm.svg"
          alt="Agricultural Illustration Left"
          layout="fill"
          objectFit="contain"
        /> */}
      </div>
      {/* <motion.div
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
      <div className="w-full flex flex-col justify-center items-center px-8 md:px-14 lg:px-24 py-14 md:py-0">
        <Image
          src="/images/success.svg"
          alt="success icon"
          width={180}
          height={180}
        />
        <h2 className="text-[#4D4D4D] text-center text-3xl lg:text-4xl font-semibold my-2">
          Successful
        </h2>
        <p className="font-normal text-lg lg:text-2xl text-center my-4">
          You have successfully reset your password
        </p>
        <Button
          className="bg-[--prodile-yellow] py-4 px-6 w-full md:w-1/2 text-white h-[3em] rounded-xl text-lg font-normal mt-10"
          onClick={handleBacktoLogin}
        >
          Back to login
        </Button>
      </div>
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

export default Success;
