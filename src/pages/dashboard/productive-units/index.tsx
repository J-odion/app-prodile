import { useEffect, useState } from "react";
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
import {
  addCPU,
  getIPU,
  getCPU,
  addIPU,
  editCPU,
  editIPU,
  deleteIPU,
  deleteCPU,
} from "../../../../hooks/Others/api";

const ProductiveUnits: NextPageWithLayout = () => {
  interface ProductiveUnit {
    _id: string;
    businessName: string;
    entity: string;
    industry: string;
    businessAddress: string;
    promoterFullName: string;
  }

  interface ProductiveUnitsTableProps {
    IPU: ProductiveUnit[];
    CPU: ProductiveUnit[];
  }
  interface ModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    onSubmit: (unitData: any) => Promise<void>; // Ensure this is defined
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCoporateModal, setShowCoporateModal] = useState(false);

  const itemsPerPage = 7;

  // State for storing productive units data
  const [IPUs, setIPUs] = useState<ProductiveUnit[]>([]);
  const [CPUs, setCPUs] = useState<ProductiveUnit[]>([]);
  const [allProductiveUnits, setAllProductiveUnits] = useState<
    ProductiveUnit[]>(IPUs);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Fetch IPUs and CPUs data
  useEffect(() => {
    const loadIPUs = async () => {
      try {
        const ipusdata = await getIPU();
        setIPUs(ipusdata?.data);
        setAllProductiveUnits(ipusdata?.data);
      } catch (error) {
        console.error("Error fetching IPU:", error);
      }
    };
    loadIPUs();
  }, []);

  useEffect(() => {
    const loadCPUs = async () => {
      try {
        const cpusdata = await getCPU();
        // return response.data as ProductiveUnit[];
        setCPUs(cpusdata?.data);
      } catch (error) {
        console.error("Error fetching CPU:", error);
      }
    };
    loadCPUs();
  }, []);


  const filteredProductiveUnits = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    if (selectedValue === "individual") {
      setAllProductiveUnits(IPUs);
    } else if (selectedValue === "corporate") {
      setAllProductiveUnits(CPUs);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProductiveUnits.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // const handleAddIPU = async (ipuData: any) => {
  //   try {
  //     const newIPU = await addIPU(ipuData);
  //     setIPUs([...IPUs, newIPU?.data]);
  //     setShowModal(false);
  //   } catch (error) {
  //     console.error("Error adding productive unit:", error);
  //   }
  // };
  // const handleAddCPU = async (cpuData: any) => {
  //   try {
  //     const newCPU= await addCPU(cpuData);
  //     setCPUs([...CPUs, newCPU?.data]);
  //     setShowModal(false);
  //   } catch (error) {
  //     console.error("Error adding productive unit:", error);
  //   }
  // };

  // const handleUpdateIPU = async (id: string, updatedData: any) => {
  //   try {
  //     const updatedUnit = await editIPU(id, updatedData);
  //     setIPUs(
  //       IPUs.map((unit) =>
  //         unit._id === id ? updatedUnit : unit
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating productive unit:", error);
  //   }
  // };

  // const handleUpdateCPU = async (id: string, updatedData: any) => {
  //   try {
  //     const updatedUnit = await editCPU(id, updatedData);
  //     setCPUs(
  //       CPUs.map((unit) =>
  //         unit._id === id ? updatedUnit : unit
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating productive unit:", error);
  //   }
  // };

  const handleDeleteIPU = async (id: string) => {
    try {
      await deleteIPU(id);
      setIPUs(IPUs.filter((unit) => unit._id !== id));
    } catch (error) {
      console.error("Error deleting productive unit:", error);
    }
  };
  const handleDeleteCPU = async (id: string) => {
    try {
      await deleteCPU(id);
      setCPUs(CPUs.filter((unit) => unit._id !== id));
    } catch (error) {
      console.error("Error deleting productive unit:", error);
    }
  };


  // Handlers for modals
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowCoporateModal = () => {
    setShowCoporateModal(true);
  };

  return (
    <>
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
                  <Select onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Filter size="20" height={30} width={30} />
                </div>
              </div>
            </div>
            <div className="border-2 border-[#EFF4FA] rounded-2xl">
              <h1 className="text-[#222B45] font-semibold text-base p-6">
                List of Productive Units
              </h1>
              <Table>
                <TableHeader className="bg-[#FFC1074D]">
                  <TableRow>
                    <TableHead>Name of productive unit</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-[13px]">
                  {allProductiveUnits.map((unit) => (
                    <TableRow key={unit._id}>
                      <TableCell className="font-semibold">
                        {unit.businessName}
                      </TableCell>
                      <TableCell>{unit.entity}</TableCell>
                      <TableCell>{unit.industry}</TableCell>
                      <TableCell>{unit.businessAddress}</TableCell>
                      <TableCell>{unit.promoterFullName}</TableCell>
                      <TableCell>
                        <ul className="flex items-center gap-2 text-[#C5CEE0]">
                          <li>
                            <Eye size={20} />
                          </li>
                          <li>
                            <Pen
                              size={20}
                              // onClick={() => {
                              //   const isIPU = allProductiveUnits === IPUs;
                              //   if (isIPU) {
                              //     handleUpdateIPU(unit._id, unit);
                              //   } else {
                              //     handleUpdateCPU(unit._id, unit);
                              //   }
                              // }}
                            />
                          </li>
                          <li>
                            <Trash
                              size={20}
                              onClick={() => {
                                const isIPU = allProductiveUnits === IPUs;
                                if (isIPU) {
                                  handleDeleteIPU(unit._id);
                                } else {
                                  handleDeleteCPU(unit._id);
                                }
                              }}
                            />
                          </li>
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
        totalItems={filteredProductiveUnits.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <AddIndividualModal
        open={showModal}
        setOpen={setShowModal}
        title="Add Individual Productive Units"
        setIPUs = { setIPUs}
        IPUs = {IPUs}
      />
      <AddCoporateModal 
        open={showCoporateModal}
        setOpen={setShowCoporateModal}
        title="Add Corporate Productive Units"
        setCPUs = { setCPUs}
        CPUs = {CPUs}
      /> 
    </>
  );
};

export default ProductiveUnits;

ProductiveUnits.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"product-units"}>{page}</DashboardLayout>;
};
