"use client";
import * as React from "react";
import FocusLock from "react-focus-lock";

export interface DialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: React.ReactNode;
}
export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      aria-label="Dialog Overlay"
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  );
}

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export const DialogTrigger = React.forwardRef<any, TriggerProps>(({ asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, { ...props });
  }
  return <button ref={ref} {...props}>{children}</button>;
});
DialogTrigger.displayName = "DialogTrigger";
export const DialogContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <FocusLock returnFocus>
    <div role="dialog" aria-modal="true" className={"rounded bg-white p-4 outline-none " + (className ?? "")} tabIndex={-1} {...props}>
      {children}
    </div>
  </FocusLock>
);
export const DialogHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
export const DialogTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-semibold">{children}</h2>; 