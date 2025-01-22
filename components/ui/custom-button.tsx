"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative bg-pastel-pink text-white border border-pastel-pink rounded-md px-8 py-3",
          "transition-all duration-200 ease-in-out",
          "hover:bg-pastel-cream hover:text-gray-800",
          "hover:translate-x-[-4px] hover:translate-y-[-4px]",
          "hover:shadow-[4px_4px_0_0_#eab5a6]",
          "active:translate-x-[0px] active:translate-y-[0px]",
          "active:shadow-none",
          "text-lg font-medium",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };