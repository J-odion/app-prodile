import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricsCard from "@/components/Cards/MetricsCard";
import { OutcomeStatistics } from "@/components/OutcomeStatistics";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        </Tabs>
      </div>
    </>
  );
};

export default Overview;

Overview.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"overview"}>{page}</DashboardLayout>;
};
