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

const AddCoporateModal = ({
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
              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="firstName"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  disabled={isLoading}
                />
              <Input
                  type="text"
                  className="py-5 "
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="emailId"
                  placeholder="Email ID"
                  {...register("emailId", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="phone"
                  placeholder="Mobile Number"
                  {...register("phone", { required: true })}
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
              </div>
              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="nin"
                  placeholder="NIN"
                  {...register("nin", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="companyName"
                  placeholder="Company Name"
                  {...register("companyName", { required: true })}
                  disabled={isLoading}
                />
              <Input
                  type="text"
                  className="py-5 "
                  id="companyAddress"
                  placeholder="Company Address"
                  {...register("companyAddress", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="bg-[#FFFBEC] py-4 px-4">
                <h2 className="text-[#8F9BB3] font-semibold text-xl">Next of Kin</h2>
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
              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="emailKin"
                  placeholder="Email Address"
                  {...register("emailKin", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="homeAddress"
                  placeholder="Home Address"
                  {...register("homeAddress", { required: true })}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="relationship"
                  placeholder="Relationship"
                  {...register("relationship", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="occupation"
                  placeholder="Occupation"
                  {...register("occupation", { required: true })}
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

export default AddCoporateModal;
