import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationModal from "@/components/layout/NotificationModal";
import { ChevronDown, Eye, Pen, Trash } from "lucide-react";
import { notifications } from "..";
import HeaderCard from "@/components/Cards/Settings/HeaderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsLayout from "./layout";
import { profileFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";

const Productivity: NextPageWithLayout = () => {
  const {toast} = useToast();

  type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
    firstName: "Shadcn",
    lastName: "Shadcn",
    phone: "08012345678",
    address: "123, Main Street, Lagos",
    dob: "01/01/1990",
    promoterName: "Millionaire Mentor",
    email: "example@gmail.com",
    website: "https://shadcn.com",
    nin: "12345678901",
    bvn: "12345678901",
}

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // })



  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <>
      <DashboardSidebar />
      <div className="w-full px-6 pt-10 lg:pt-28">
        <SettingsLayout>
        <h1 className="font-medium text-xl mb-2">Profile settings</h1>
        <p className="text-[#AEAEAE] font-medium text-base">These are your personal details</p>
        <Separator />
        </SettingsLayout>
      </div>
    </>
  );
};

export default Productivity;

Productivity.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"settings"}>{page}</DashboardLayout>;
};
