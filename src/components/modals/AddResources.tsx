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
import { addAgent, addResource } from "../../../hooks/Others/api"

interface ModalProps {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setResource: React.Dispatch<React.SetStateAction<any[]>>;
  resources: any[];
}

const AddResourcesModal = ({
  title,
  open,
  setOpen,
  className,
 setResource,
 resources
}: ModalProps) => {
  const { register, handleSubmit, reset, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();


  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const handleaddAgent = async (ResourcesData: any) => {
    try {
      setIsLoading(true);
      const newResource = await addResource(ResourcesData);
      setResource([...resources, newResource?.data]);
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
              onSubmit={handleSubmit(handleaddAgent)}
              className="space-y-8"
              autoComplete="off"
            >
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
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

              <div className="mb-3 flex w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="firstName"
                  placeholder="Full name of Agent"
                  {...register("name")}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 flex w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="address"
                  placeholder="Enter location of agent: e.g Gwarimpa, Abuja"
                  {...register("location")}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3 flex w-full items-center gap-1.5">
                <Input
                  type="text"
                  className="py-5 "
                  id="entity"
                  placeholder="Company Entity type"
                  {...register("entity")}
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

export default AddResourcesModal;
