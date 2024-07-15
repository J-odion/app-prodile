import React, { HTMLAttributes, InputHTMLAttributes, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

type FormRenderProps = {
  label?: string;
  placeholder: string;
  field: any;
  type?: string;
  classNameLabel?: string;
} & React.ComponentProps<"input">;

const FormRender = ({
  label,
  placeholder,
  field,
  classNameLabel,
  ...inputProps
}: FormRenderProps) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <FormItem className="w-full">
      <FormLabel className={cn(classNameLabel)}>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <input
            placeholder={placeholder}
            {...field}
            {...inputProps}
            type={showPass ? "text" : inputProps.type}
            className="bg-yellow-200 border-transparent border-[1px] text-black rounded-lg h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[--prodile-yellow] focus:border-[--prodile-yellow] placeholder:text-[#646464]"
          />


          {inputProps.type === "password" ? (
            <Button
              type="button"
              variant={"ghost"}
              className="absolute right-0 top-0 text-[#0000003B] hover:bg-transparent"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOffIcon size="18" /> : <EyeIcon size="18" />}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormRender;
