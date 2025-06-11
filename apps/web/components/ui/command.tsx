"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Command({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
}
export const CommandInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={cn("w-full p-1 border rounded", props.className)} />
);
export const CommandEmpty = ({ children }: { children: React.ReactNode }) => (
  <p className="py-2 text-muted-foreground text-sm">{children}</p>
);
export const CommandGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1 py-1">{children}</div>
);
export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onSelect?: () => void;
}
export const CommandItem = ({ children, onSelect, className, ...props }: CommandItemProps) => (
  <div
    {...props}
    onClick={onSelect}
    className={cn("cursor-pointer rounded px-2 py-1 hover:bg-muted", className)}
  >
    {children}
  </div>
); 