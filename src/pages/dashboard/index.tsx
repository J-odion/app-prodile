import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricsCard from "@/components/Cards/MetricsCard";
import NewSubscription from "@/components/NewSubscription";
import ChatCard from "@/components/Cards/ChatCard";
import OutcomeStatistics from "@/components/OutcomeStatistics";
import { ArrowDown, Bell, ChevronDown } from "lucide-react";
import NotificationModal from "@/components/layout/NotificationModal";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ProductiveUnits from "./productive-units";
import Agents from "./agents";
import Resources from "./resources";

export const notifications = {
  count: 2,
  results: [
    {
      id: 1,
      message: "New message from admin",
      is_read: false,
      created_at: "2022-02-02T12:00:00Z",
    },
    {
      id: 2,
      message: "New message from admin",
      is_read: false,
      created_at: "2022-02-02T12:00:00Z",
    },
  ],
};

const Overview: NextPageWithLayout = () => {
  return (
    <>
      <DashboardSidebar />
      <div className="w-full px-6 pt-10 lg:pt-28">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-[#404040]">Dashboard</h1>
            <p className="text-[#AEAEAE] font-medium text-base mt-2">
              Get summary of your weekly online transactions here.
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4 mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="productive-units">Productive Units</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            {/* <TabsTrigger value="notification">Notification</TabsTrigger> */}
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <MetricsCard
                title="Revenue"
                value="₦984.28"
                change="+11.82"
                changeType="increase"
              />
              <MetricsCard
                title="Subscription"
                value="169"
                change="-18.28"
                changeType="decrease"
              />
              <MetricsCard
                title="Agent"
                value="406"
                change="+33.3"
                changeType="increase"
              />
              <MetricsCard
                title="Disbursement"
                value="102"
                change="-18.27"
                changeType="decrease"
              />
            </div>
            <div className="w-full">
              <OutcomeStatistics />
            </div>
          </TabsContent>
          <TabsContent value="productive-units">
            <ProductiveUnits />
          </TabsContent>
          <TabsContent value="agents">
            <Agents />
          </TabsContent>
          <TabsContent value="resources">
            <Resources />
          </TabsContent>

          {/* <TabsContent value="notification" className="flex gap-4 justify-between flex-col md:flex-row">
            <div className="md:w-1/2 w-full">
             <NewSubscription />
             </div>
            <Card className=" bg-white p-4 rounded-lg shadow-md md:w-1/2 w-full">
              <h2 className="text-xl font-semibold mb-4">Chats</h2>
              {[
                {
                  name: "Victor Sunday",
                  message: "Lorem ipsum dolor sit amet...",
                  date: "Sep 27",
                },
                {
                  name: "Anita Collins",
                  message: "Lorem ipsum dolor sit amet...",
                  date: "Sep 27",
                },
                {
                  name: "Mary John",
                  message: "Lorem ipsum dolor sit amet...",
                  date: "Sep 27",
                },
              ].map((chat, idx) => (
                <ChatCard key={idx} {...chat} />
              ))}
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </>
  );
};

export default Overview;

Overview.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"overview"}>{page}</DashboardLayout>;
};
