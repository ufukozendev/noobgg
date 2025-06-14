import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Gaming news, tips, and insights from noob.gg",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
