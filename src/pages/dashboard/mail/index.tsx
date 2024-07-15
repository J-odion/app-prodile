import React from 'react'
import { NextPageWithLayout } from "@/pages/_app";
import Image from "next/image"
import { Mail as MailComponent } from '@/components/mail/mail';
import { accounts, mails } from '@/data/mailData';
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Mail: NextPageWithLayout = () => {


  return (
    <>
        <DashboardSidebar />
        <div className="w-full px-6 pt-10 lg:pt-28">
      <div className="flex-col flex">
        <MailComponent
          accounts={accounts}
          mails={mails}
          navCollapsedSize={4}
        />
      </div>
        </div>
    </>
  )
}

export default Mail

Mail.getLayout = function getLayout(page: React.ReactElement) {
    return <DashboardLayout page={"mail"}>{page}</DashboardLayout>;
  };
