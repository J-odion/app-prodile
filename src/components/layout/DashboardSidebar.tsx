import React, { useState } from "react";
import {
  PieChart,
  ChevronRight,
  LogOut,
  BookOpen,
  BookText,
  ShoppingBag,
  MessageCircle,
  Users,
  UserCircle,
  Grid2X2,
  Scroll,
  Proportions,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { UserNav } from "./UserNav";



type DashboardSidebarProps = React.PropsWithChildren & {
  className?: string;
};

const DashboardSidebar = ({ children }: DashboardSidebarProps) => {
  const router = useRouter();
  const { route } = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      <nav className=" fixed w-full z-50">
        <div className="hidden h-30 w-full bg-white lg:flex border-b items-center px-14 justify-between">
          <div className="flex items-center">
            <Image src="/images/prodile-logo-yellow.svg" width={150} height={50} alt="prodile logo" />
            <div>
              <ul className="flex py-4 px-4 gap-4">
                <Link href="/dashboard">
                  <li
                    className={
                      route === "/dashboard"
                        ? "text-[--prodile-yellow] py-3 rounded-xl font-semibold text-sm"
                        : " py-3 pl-10 hover:underline hover:text-[#1C1C1C] font-semibold text-sm rounded-xl"
                    }
                  >
                    <div className="flex items-center">Dashboard</div>
                  </li>
                </Link>

                <Link href="/dashboard/mail">
                  <li
                    className={
                      route === "/dashboard/mail"
                        ? "text-[--prodile-yellow] py-3 rounded-xl font-semibold text-sm"
                        : " py-3 hover:underline hover:text-[#1C1C1C] font-semibold text-sm rounded-xl"
                    }
                  >
                    <div className="flex items-center">Mail</div>
                  </li>
                </Link>

                <Link href="/dashboard/settings">
                  <li
                    className={
                      route === "/dashboard/settings"
                        ? "text-[--prodile-yellow] py-3 rounded-xl font-semibold text-sm"
                        : " py-3 hover:underline hover:text-[#1C1C1C] font-semibold text-sm rounded-xl"
                    }
                  >
                    <div className="flex items-center">Settings</div>
                  </li>
                </Link>
              </ul>
              {/* </nav> */}
              <div
                className="fixed bottom-10  text-[#959190]"
                style={{ cursor: "pointer" }}
              >
                {/* <div
                className="flex items-center text-[#D06B0D]"
                onClick={handleLogout}
              >
                <span className="mr-3">
                  <LogOut size="20" color="#D06B0D" />
                </span>
                Logout
              </div> */}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
            <UserNav />
          </div>
        </div>
        {/* <div className="h-full min-h-screen w-full pl-5 pr-5 pt-12 py-10 md:pt-12 lg:min-h-40 lg:pl-[32rem] lg:pr-10">
                {children}
            </div> */}
        {/* <div className="h-full min-h-screen w-full pl-5 pr-5 pt-12 py-10 md:pt-10 lg:min-h-40 lg:pl-[19rem] lg:pr-2 pb-20">
          {children}
        </div> */}
      </nav>
    </>
  );
};

export default DashboardSidebar;
