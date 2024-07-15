import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddIndividualModal = ({
  title,
  open,
  setOpen,
  className,
}: ModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
      toast({
        title: "Success",
        description: "Productive unit added successfully",
        variant: "default",
      });
    }, 2000);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  }


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
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              autoComplete="off"
            >
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                </SelectContent>
              </Select>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="businessName"
                  placeholder="Name of business"
                  {...register("businessName", { required: true })}
                  disabled={isLoading}
                />
                <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Entity" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                </SelectContent>
              </Select>
              <Input
                  type="text"
                  className="py-5 "
                  id="regDetails"
                  placeholder="CAC Reg Details"
                  {...register("regDetails", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="businessDescription"
                  placeholder="Description of business activities"
                  {...register("businessDescription", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="industry"
                  placeholder="Industry"
                  {...register("industry", { required: true })}
                  disabled={isLoading}
                />
              <Input
                  type="text"
                  className="py-5 "
                  id="website"
                  placeholder="Website Address"
                  {...register("website", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="numberDeflation"
                  placeholder="Deflation of Number"
                  {...register("numberDeflation", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="email"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                  disabled={isLoading}
                />
              <Input
                  type="text"
                  className="py-5 "
                  id="businesssAddress"
                  placeholder="Businesss Address"
                  {...register("businesssAddress", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="bg-[#FFFBEC] py-4 px-4">
                <h2 className="text-[#8F9BB3] font-semibold text-xl">Detail of promoters</h2>
              </div>
              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="fullName"
                  placeholder="full Name"
                  {...register("fullName", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="phone"
                  placeholder="Phone number"
                  {...register("phone", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="emailPromoter"
                  placeholder="Email Address"
                  {...register("emailPromoter", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="bvn"
                  placeholder="BVN"
                  {...register("bvn", { required: true })}
                  disabled={isLoading}
                />
              <Input
                  type="text"
                  className="py-5 "
                  id="nin"
                  placeholder="NIN"
                  {...register("nin", { required: true })}
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
              <Button variant={'outline'} className="text-[--prodile-yellow] text-[13px] font-semibold" onClick={handleCancel}>Cancel</Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddIndividualModal;
