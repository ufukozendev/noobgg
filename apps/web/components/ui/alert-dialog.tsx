"use client";
import * as React from "react";

export const AlertDialog = ({ children }: { children: React.ReactNode }) => <>{children}</>;

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean }
export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement | HTMLSpanElement, TriggerProps>(({ asChild, ...props }, ref) => (
  asChild ? <span ref={ref as any} {...props} /> : <button ref={ref as any} {...props} />
));
AlertDialogTrigger.displayName = "AlertDialogTrigger";

export const AlertDialogContent = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={"fixed inset-0 z-50 flex items-center justify-center bg-black/40"}>
    <div className={"rounded bg-white p-4 " + (className ?? "")}>{children}</div>
  </div>
);
export const AlertDialogHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
export const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-semibold">{children}</h2>;
export const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-muted-foreground">{children}</p>;
export const AlertDialogFooter = ({ children }: { children: React.ReactNode }) => <div className="mt-4 flex justify-end gap-2">{children}</div>;
export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button ref={ref} className="px-3 py-1 border rounded" {...props} />
));
AlertDialogCancel.displayName = "AlertDialogCancel";
export const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button ref={ref} className="px-3 py-1 bg-destructive text-white rounded" {...props} />
));
AlertDialogAction.displayName = "AlertDialogAction"; 