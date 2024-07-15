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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";

const Legal: NextPageWithLayout = () => {
  const { toast } = useToast();

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

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
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <DashboardSidebar />
      <div className="w-full px-6 pt-10 lg:pt-28">
        <SettingsLayout>
          <h1 className="font-medium text-xl mb-2">Legal</h1>
          <p className="text-[#AEAEAE] font-medium text-base">
            Download your legal information
          </p>
          <Separator />
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="font-medium">Entity</p>
                <p>Business Name</p>
              </div>
              <div>
                <p className="font-medium">Phone Number</p>
                <p>08134578919</p>
              </div>
              <div>
                <p className="font-medium">CaC Reg. No.</p>
                <p>123456789</p>
              </div>
              <div>
                <p className="font-medium">Email Address</p>
                <p>example@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">Registered Business Address</p>
                <p>No 1 , Secretariat Road Igueben, Edo State </p>
              </div>
              <div>
                <p className="font-medium">Website</p>
                <p>www.google.com</p>
              </div>
            </div>

            <h2 className="font-bold text-[--prodile-yellow] mt-4">
              Director Information
            </h2>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="font-medium">Name</p>
                <p>Mary Johnson</p>
              </div>
              <div>
                <p className="font-medium">Phone Number</p>
                <p>+234012345678</p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p>No 1 , Secretariat Road Igueben, Edo State </p>
              </div>
            </div>

            <h2 className="font-bold text-[--prodile-yellow] mt-4">
              Shareholding Information
            </h2>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="font-medium">Name</p>
                <p>Anita John</p>
                <p>Victor Chinaza</p>
              </div>
              <div>
                <p className="font-medium">Phone Number</p>
                <p>08134578291</p>
                <p>09187628772</p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p>No 1, Secretariat Road Iguabem, Edo State</p>
                <p>No 1, Secretariat Road Iguabem, Edo State</p>
              </div>
            </div>

            <h2 className="font-bold text-[--prodile-yellow] mt-4">
              Outstanding Litigation
            </h2>
            <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="font-medium">Case Description</p>
              <p>*** *** ***</p>
            </div>
            <div>
              <p className="font-medium">See Const Details</p>
              <Eye />
            </div>

            <div>
              <p className="font-medium">Status Resolved</p>
            </div>
            </div>


            <div>
              <p>Click here to view document</p>
              <Button className="mt-4 bg-[--prodile-yellow] text-white">
                Download
              </Button>
            </div>
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Legal;

Legal.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"settings"}>{page}</DashboardLayout>;
};
