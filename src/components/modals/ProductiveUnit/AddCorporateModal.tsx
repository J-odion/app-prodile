import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
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
  const { register, handleSubmit, reset, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();


  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const handleAddCPU = async (unitData: any) => {
    try {
      setIsLoading(true);
      const newUnit = await addCPU(unitData);
      setCPUs([...CPUs, newUnit?.data]);
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
              onSubmit={handleSubmit(handleAddCPU)}
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
                      <SelectItem value="Beef Production">
                        Beef Production
                      </SelectItem>
                      <SelectItem value="Poultry Eggs">Poultry Eggs</SelectItem>
                      <SelectItem value="stock animals">
                      stock animals
                      </SelectItem>
                      <SelectItem value="machinaries">Machineries</SelectItem>
                      <SelectItem value="feeds">Feeds</SelectItem>
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
                  {...register("firstName")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="lastName"
                  placeholder="lastName"
                  {...register("lastName")}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="email"
                  placeholder="Email ID"
                  {...register("email")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="bvn"
                  placeholder="BVN"
                  {...register("bvn")}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 grid grid-cols-3 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="NIN"
                  placeholder="NIN"
                  {...register("NIN")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="businessName"
                  placeholder="Company Name"
                  {...register("businessName")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="companyAddress"
                  placeholder="Company Address"
                  {...register("address")}
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
                  {...register("nextofkinFullName")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="nextofkinPhoneNumber"
                  placeholder="Next of kin Phone Number"
                  {...register("nextofkinPhoneNumber")}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="nextofkinEmail"
                  placeholder="next of kin Email"
                  {...register("nextofkinEmail")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="nextofkinOccupation"
                  placeholder="Occupation"
                  {...register("nextofkinOccupation")}
                  disabled={isLoading}
                />
                
              </div>

              <div className="mb-3 grid grid-cols-2 w-full items-center gap-1.5">
              <Input
                  type="text"
                  className="py-5 "
                  id="nexofkinAddress"
                  placeholder="Address"
                  {...register("nextofkinAddress")}
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  className="py-5 "
                  id="nextofkinOccupation"
                  placeholder="Relationship"
                  {...register("nextofkinRelationship")}
                  disabled={isLoading}
                />
                
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                  Cancel
                </Button>
                <CustomButton
                  type="submit"
                  className="bg-[--prodile-yellow] hover:bg-[--prodile-yellow]/50 focus-visible:outline-none text-[13px] font-semibold"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Submit
                </CustomButton>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCorporateModal;
