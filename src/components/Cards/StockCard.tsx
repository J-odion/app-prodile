import React, { useState } from "react";
import MetricsCard from "./MetricsCard";
import { ArrowRight } from "lucide-react";
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
import { seedings } from "@/data/data";
import Datapagination from "../pagination/Data-Pagination";

const itemsPerPage = 2;
const StockCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = seedings.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div>
        <div className="grid grid-cols-5 gap-6 mb-8 items-center">
          <div className="flex w-full">
            <h2 className="font-bold text-2xl text-[--prodile-yellow]">
              Stock(Animals)
            </h2>{" "}
            <span>
              <ArrowRight className=" w-14 text-[--prodile-yellow]" />
            </span>
          </div>
          <MetricsCard
            title="Total Quantity"
            value="1300kg"
            change="+33.3"
            changeType="increase"
          />
          <MetricsCard
            title="Total Value"
            value="₦984.28"
            change="+11.82"
            changeType="increase"
          />
          <MetricsCard
            title="Quantity Disbursement"
            value="10,000kg"
            change="-18.28"
            changeType="decrease"
          />
          <MetricsCard
            title="Quantity available"
            value="200kg"
            change="-18.27"
            changeType="decrease"
          />
        </div>
        <Table>
                <TableHeader className="bg-[#FFC1074D]">
                  <TableRow>
                    <TableHead className="">
                      Description
                    </TableHead>
                    <TableHead>Make/Type</TableHead>
                    <TableHead>Total Quantity</TableHead>
                    <TableHead>Price/KG</TableHead>
                    <TableHead>Quantity Available</TableHead>
                    <TableHead>Quantity Disbursement</TableHead>
                    <TableHead>Yield Expectation</TableHead>
                    <TableHead>Benediciary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-[13px]">
                  {currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-semibold">
                        {item.description}
                      </TableCell>
                      <TableCell className="">
                        {item.make}
                      </TableCell>
                      <TableCell>{item.totalQuantity}</TableCell>
                      <TableCell>{item.pricePerKg}</TableCell>
                      <TableCell>{item.quantityAvailable}</TableCell>
                      <TableCell>{item.quantityDisbursement}</TableCell>
                      <TableCell>{item.yield}</TableCell>
                      <TableCell>{item.beneficiary}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
      </div>
      {/* <Datapagination
        totalItems={seedings.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      /> */}
    </>
  );
};

export default StockCard;
