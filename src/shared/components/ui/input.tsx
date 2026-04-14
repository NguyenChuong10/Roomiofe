import * as React from "react"
import { cn } from "@/shared/utils/index"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {variant?: 'default' | 'error'}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // base style kiểu Ant
          "w-full h-10 px-3 text-sm",
          "border border-gray-300 rounded-md",
          "outline-none transition-all",

          // focus kiểu Ant
          "focus:border-primary focus:ring-1 focus:ring-primary/20",

          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
export { Input }