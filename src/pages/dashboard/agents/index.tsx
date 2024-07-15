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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { agents } from "@/data/data";
import MetricsCard from "@/components/Cards/MetricsCard";
import Datapagination from "@/components/pagination/Data-Pagination";

const itemsPerPage = 5;

const Agents: NextPageWithLayout = () => {

    const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = agents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="w-full p-6">

        <div>
          <div className="grid grid-cols-4 gap-6 mb-8">
          <MetricsCard
              title="Agents"
              value="406"
              change="+33.3"
              changeType="increase"
            />
            <MetricsCard
              title="Subscription"
              value="₦984.28"
              change="+11.82"
              changeType="increase"
            />
            <MetricsCard
              title="Resources"
              value="169"
              change="-18.28"
              changeType="decrease"
            />
            <MetricsCard
              title="Disbursement"
              value="102"
              change="-18.27"
              changeType="decrease"
            />
          </div>

          <div className="border-2 border-[#EFF4FA] rounded-2xl">
              <h1 className="text-[#222B45] font-semibold text-base p-6">
                List of Agents
              </h1>
              <Table>
                <TableHeader className="bg-[#FFC1074D]">
                  <TableRow>
                    <TableHead className="">
                      Name of agents
                    </TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-[13px]">
                  {currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-semibold">
                        {item.name}
                      </TableCell>
                      <TableCell className="">
                        {item.category}
                      </TableCell>
                      <TableCell>{item.industry}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <ul className="flex items-center gap-2 text-[#C5CEE0]">
                          <li><Eye size={20} /></li>
                          <li><Pen size={20} /></li>
                          <li><Trash size={20} /></li>
                        </ul>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </div>
      </div>
      <Datapagination
        totalItems={agents.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Agents;

Agents.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"agents"}>{page}</DashboardLayout>;
};
