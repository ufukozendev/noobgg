"use client";
import * as React from "react";

// Context to share popover open state between Trigger and Content
interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export interface PopoverProps {
  /**
   * Controlled open state. If provided, Popover becomes controlled.
   */
  open?: boolean;
  /**
   * Callback fired whenever open state intends to change.
   */
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}

/**
 * Popover root component that manages its open state (controlled or uncontrolled)
 * and provides it to Trigger & Content through context.
 */
export function Popover({ open, onOpenChange, children }: PopoverProps) {
  // Uncontrolled fallback state
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  // Determine if component is controlled
  const isControlled = open !== undefined;

  const currentOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider value={{ open: currentOpen, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const context = React.useContext(PopoverContext);

    const handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLSpanElement> = (e) => {
      onClick?.(e as any);
      context?.setOpen(!context.open);
    };

    if (asChild) {
      return (
        <span ref={ref as any} onClick={handleClick} {...props} />
      );
    }

    return <button ref={ref} onClick={handleClick} {...props} />;
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const context = React.useContext(PopoverContext);

    if (!context?.open) return null;

    return (
      <div
        ref={ref}
        className={
          "absolute z-20 mt-2 rounded-md border bg-popover p-2 shadow-md " + (className ?? "")
        }
        style={style}
        {...props}
      />
    );
  }
);
PopoverContent.displayName = "PopoverContent"; 