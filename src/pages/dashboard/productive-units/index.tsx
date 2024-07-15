import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationModal from "@/components/layout/NotificationModal";
import { users } from "@/data/data";
import {
  ChevronDown,
  CreditCard,
  Eye,
  Filter,
  Pen,
  Plus,
  Search,
  Trash,
  User,
} from "lucide-react";
import { notifications } from "..";
import MetricsCard from "@/components/Cards/MetricsCard";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Datapagination from "@/components/pagination/Data-Pagination";
import AddIndividualModal from "@/components/modals/ProductiveUnit/AddIndividualModal";
import AddCoporateModal from "@/components/modals/ProductiveUnit/AddCorporateModal";



const itemsPerPage = 5;

const ProductiveUnits: NextPageWithLayout = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCoporateModal, setShowCoporateModal] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleShowCoporateModal = () => {
    setShowCoporateModal(true);
  }

  return (
    <>
    {/* <DashboardSidebar /> */}
      <div className="w-full p-6">

        <div>
          <div className="grid grid-cols-4 gap-6 mb-8">
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

          <div className="flex flex-col gap-6">
            <div className="flex justify-between gap-8">
              <div className="w-1/3 relative">
                <Input
                  type="text"
                  placeholder="Search"
                  className="border rounded-lg px-4 py-2"
                />
                <Search size="20" className="absolute top-3 right-2 " />
              </div>
              <div className="w-2/3">
                <div className="flex w-2/3 gap-4 items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="default"
                        className="bg-[--prodile-yellow]"
                      >
                        Add productive units <Plus size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Units</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={handleShowModal}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Individual Productive units</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleShowCoporateModal}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Corporate Productive units</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Saved search" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Filter size="20" height={30} width={30} />
                </div>
              </div>
            </div>
            <div className="border-2 border-[#EFF4FA] rounded-2xl">
              <h1 className="text-[#222B45] font-semibold text-base p-6">
                List of users
              </h1>
              <Table>
                <TableHeader className="bg-[#FFC1074D]">
                  <TableRow>
                    <TableHead className="">
                      Name of productive unit
                    </TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Agent</TableHead>
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
                        {item.entity}
                      </TableCell>
                      <TableCell>{item.industry}</TableCell>
                      <TableCell>{item.Location}</TableCell>
                      <TableCell>{item.agent}</TableCell>
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
      </div>
      <Datapagination
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <AddIndividualModal open={showModal} setOpen={setShowModal} title="Add productive units" />
      <AddCoporateModal open={showCoporateModal} setOpen={setShowCoporateModal} title="Add Productive Units" />
    </>
  );
};

export default ProductiveUnits;

ProductiveUnits.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"product-units"}>{page}</DashboardLayout>;
};
