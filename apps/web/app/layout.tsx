import { QueryProvider } from "@/components/query-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "noob.gg - Gaming Platform",
  description: "Discover and explore games on noob.gg gaming platform",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className="dark">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
