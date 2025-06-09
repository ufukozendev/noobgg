"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function LogoutButton({ mobile = false }: { mobile?: boolean }) {
  return mobile ? (
    <button
      className="block w-full rounded-lg bg-gradient-to-r from-[#f45252] to-[#f59b87] py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  ) : (
    <Button
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-accent/10 border-accent/20 text-white"
      )}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <span>Log Out</span>
    </Button>
  );
}
