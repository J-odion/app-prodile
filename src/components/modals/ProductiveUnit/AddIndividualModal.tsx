import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addIPU } from "../../../../hooks/Others/api";

type ModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setIPUs: React.Dispatch<React.SetStateAction<any[]>>; // Added props for updating IPUs
  IPUs: any[];
};

const AddIndividualModal = ({
  title,
  open,
  setOpen,
  className,
  setIPUs,
  IPUs,
}: ModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const handleAddIPU = async (unitData: any) => {
    try {
      setIsLoading(true);
      const newUnit = await addIPU(unitData);
      setIPUs([...IPUs, newUnit?.data]);
      setOpen(false);
      toast({
        title: "Success",
        description: "Productive Unit added successfully.",
      });
    } catch (error) {
      console.error("Error adding productive unit:", error);
      toast({
        title: "Error",
        description: "Failed to add Productive Unit.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-4 sm:rounded-none">
        <DialogHeader>
          <DialogTitle
            className={`font-bold flex items-center text-center pb-5 text-xl ${className}`}
          >
            {title}
          </DialogTitle>
          <div>
            <form
              onSubmit={handleSubmit(handleAddIPU)}
              className="space-y-8"
              autoComplete="off"
            >
              <Select {...register("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beef Production">
                    Beef Production
                  </SelectItem>
                  <SelectItem defaultValue={'Poultry Eggs'} value="Poultry Eggs">Poultry Eggs</SelectItem>
                  <SelectItem value="stock animals">Stock Animals</SelectItem>
                  <SelectItem value="machinaries">Machineries</SelectItem>
                  <SelectItem value="feeds">Feeds</SelectItem>
                </SelectContent>
              </Select>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5"
                  id="businessName"
                  placeholder="Name of business"
                  {...register("businessName")}
                  disabled={isLoading}
                />
                <Select {...register("entity")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporation">
                      Corporation
                    </SelectItem>
                    <SelectItem value="Limited">
                      Limited Liability Company
                    </SelectItem>
                    <SelectItem value="Partnerships">
                      Partnerships
                    </SelectItem>
                    <SelectItem value="Sole">
                      Sole Proprietorship
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  className="py-5"
                  id="regDetails"
                  placeholder="CAC Reg Details"
                  {...register("cacRegDetails")}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5"
                  id="businessDescription"
                  placeholder="Description of business activities"
                  {...register("description")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="industry"
                  placeholder="Industry"
                  {...register("industry")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="website"
                  placeholder="Website Address"
                  {...register("website")}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5"
                  id="numberDeflation"
                  placeholder="Deflation of Number"
                  {...register("deflationNumber")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="email"
                  placeholder="Email Address"
                  {...register("businessEmail")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="businesssAddress"
                  placeholder="Business Address"
                  {...register("businessAddress")}
                  disabled={isLoading}
                />
              </div>
              <div className="bg-[#FFFBEC] py-4 px-4">
                <h2 className="text-[#8F9BB3] font-semibold text-xl">
                  Detail of promoters
                </h2>
              </div>
              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5"
                  id="fullName"
                  placeholder="Full Name"
                  {...register("promoterFullName")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="phone"
                  placeholder="Phone number"
                  {...register("promoterPhoneNumber")}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5"
                  id="emailPromoter"
                  placeholder="Email Address"
                  {...register("promoterEmail")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="bvn"
                  placeholder="BVN"
                  {...register("promoterBVN", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5"
                  id="nin"
                  placeholder="NIN"
                  {...register("promoterNIN", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end gap-6">
                <CustomButton
                  type="submit"
                  className="bg-[--prodile-yellow] hover:bg-[--prodile-yellow]/50 focus-visible:outline-none text-[13px] font-semibold"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Submit
                </CustomButton>
                <Button
                  variant={"outline"}
                  className="text-[--prodile-yellow] text-[13px] font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddIndividualModal;
