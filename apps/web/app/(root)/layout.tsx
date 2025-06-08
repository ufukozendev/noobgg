import Header1 from "@/components/mvpblocks/header-1";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamers'Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Header1 />
      </header>
      <section>{children}</section>
      <footer></footer>
    </>
  );
}
