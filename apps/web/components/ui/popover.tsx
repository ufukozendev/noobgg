"use client";
import * as React from "react";
export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}
export function Popover({ children }: PopoverProps) {
  return <div className="relative inline-block">{children}</div>;
}
interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export const PopoverTrigger = React.forwardRef<HTMLButtonElement, TriggerProps>(({ asChild, ...props }, ref) => (
  asChild ? <span ref={ref as any} {...props} /> : <button ref={ref} {...props} />
));
PopoverTrigger.displayName = "PopoverTrigger";
export const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={"absolute z-20 mt-2 rounded-md border bg-popover p-2 shadow-md " + (className ?? "")} {...props} />
));
PopoverContent.displayName = "PopoverContent"; 