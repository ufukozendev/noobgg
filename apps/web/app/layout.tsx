import { QueryProvider } from "@/components/query-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "noob.gg - Gaming Platform",
	description: "Discover and explore games on noob.gg gaming platform",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	return (
		<html lang={locale} className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<QueryProvider>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
