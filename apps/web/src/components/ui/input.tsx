import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  variantSize?: 'sm' | 'md' | 'lg';
}

function Input({ className, type, variantSize, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-ring flex w-full min-w-0 rounded-md border-4 bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variantSize === 'sm' && 'h-10 text-sm',
        variantSize === 'md' && 'h-14 text-base',
        variantSize === 'lg' && 'h-16 text-lg',
        !variantSize && 'h-14 text-base',
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
