"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function LoginButton({ mobile = false }: { mobile?: boolean }) {
  return mobile ? (
    <button
      className="block w-full rounded-lg bg-gradient-to-r from-[#6f52f4] to-[#9b87f5] py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg"
      onClick={() => signIn("keycloak", { callbackUrl: "/" })}
    >
      Sign In
    </button>
  ) : (
    <Button
      variant={"outline"}
      className={cn("bg-transparent hover:bg-accent/10 border-accent/20 text-white")}
      onClick={() => signIn("keycloak", { callbackUrl: "/" })}
    >
      <span>Sign In</span>
    </Button>
  );
}
