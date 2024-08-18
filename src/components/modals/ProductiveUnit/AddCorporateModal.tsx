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
import { useForm, Controller } from "react-hook-form";
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
import { addCPU } from "../../../../hooks/Others/api";

type ModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setCPUs: React.Dispatch<React.SetStateAction<any[]>>;
  CPUs: any[];
};

const AddCorporateModal = ({
  title,
  open,
  setOpen,
  className,
  setCPUs,
  CPUs
}: ModalProps) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      category: "Beef Production",
      FirstName: "",LastName: "",businessName: "", NIN: '', bvn: '', email: '',
      address: '', nexofkinFullName:"", nexofkinPhoneNumber: '',  nexofkinEmail: '',
      nexofkinAddress: '', nexofkinOccupation: ''
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await addCPU(data);
      setIsLoading(false);
      setOpen(false);
      reset();
      toast({
        title: response?.status.toString(),
        description: response?.statusText,
        variant: "default",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to add productive unit",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
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
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              autoComplete="off"
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beef Production">Beef Production</SelectItem>
                      <SelectItem value="Poultry Eggs">Poultry Eggs</SelectItem>
                      <SelectItem value="Stock Animals">Stock Animals</SelectItem>
                      <SelectItem value="Machineries">Machineries</SelectItem>
                      <SelectItem value="Feeds">Feeds</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="firstName"
                  placeholder="First Name"
                  {...register("FirstName", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="lastName"
                  placeholder="Last Name"
                  {...register("LastName", { required: true })}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="email"
                  placeholder="Email ID"
                  {...register("email", { required: true })}
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
                  id="NIN"
                  placeholder="NIN"
                  {...register("NIN", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="businessName"
                  placeholder="Company Name"
                  {...register("businessName", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="companyAddress"
                  placeholder="Company Address"
                  {...register("address", { required: true })}
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
                  id="nexofkinFullName"
                  placeholder="Full Name"
                  {...register("nexofkinFullName", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="nexofkinPhoneNumber"
                  placeholder="Next of kin Phone Number"
                  {...register("nexofkinPhoneNumber", { required: true })}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="nexofkinEmail"
                  placeholder="next of kin Email"
                  {...register("nexofkinEmail", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="nexofkinOccupation"
                  placeholder="Occupation"
                  {...register("nexofkinOccupation", { required: true })}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="nexofkinAddress"
                  placeholder="Address"
                  {...register("nexofkinAddress", { required: true })}
                  disabled={isLoading}
                />
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Add Productive Unit
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCorporateModal;
