import { QueryProvider } from "@/components/query-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "../styles/globals.css";

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
                        <body className="antialiased">
				<QueryProvider>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
