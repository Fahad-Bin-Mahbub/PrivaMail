import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PrivaMail - Secure Email Encryption",
	description:
		"Military-grade encryption for your emails. Secure, private, and easy to use.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider>
					<AuthProvider>
						<Toaster position="top-right" />
						{children}
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
