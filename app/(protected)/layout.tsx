"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ComposeModal } from "@/components/dashboard/compose-modal";
import { useAuth } from "@/components/providers/auth-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { db } from "@/lib/mock-db"; // Import db
import { Label } from "@/lib/types";

// Inner component that uses useSearchParams
function ProtectedLayoutContent({ children }: { children: React.ReactNode }) {
	const { user, logout, isLoggedIn } = useAuth();
	const { darkMode } = useTheme();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const showCompose = searchParams.get("compose") === "true";
	const [searchTerm, setSearchTerm] = useState("");
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
	const [notifications, setNotifications] = useState([
		{
			id: "1",
			title: "New encrypted message",
			description: "You have a new encrypted message from alex@example.com",
			time: "5 minutes ago",
			read: false,
		},
		{
			id: "2",
			title: "Encryption key expiring",
			description: "Your encryption key will expire in 14 days",
			time: "1 day ago",
			read: false,
		},
		{
			id: "3",
			title: "Security update available",
			description: "A new security update is available for your account",
			time: "3 days ago",
			read: true,
		},
	]);

	// Mock labels
	const [labels] = useState<Label[]>([
		{ id: "1", name: "Work", color: "blue" },
		{ id: "2", name: "Personal", color: "green" },
		{ id: "3", name: "Urgent", color: "red" },
		{ id: "4", name: "Projects", color: "purple" },
	]);

	// Mobile menu state
	const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Fetch unread counts
    useEffect(() => {
        if (user) {
            const fetchCounts = async () => {
                const counts = await db.getUnreadCounts(user.id);
                setUnreadCounts(counts);
            };
            fetchCounts();
            // Poll for updates (optional, or trigger on events)
            const interval = setInterval(fetchCounts, 5000);
            return () => clearInterval(interval);
        }
    }, [user]);

	// Ensure user is logged in
	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/login");
		}
	}, [isLoggedIn, router]);

	// Close mobile menu on route change
	useEffect(() => {
		setShowMobileMenu(false);
	}, [searchParams]);

	if (!isLoggedIn) {
		return null; // Don't render anything while redirecting
	}

	// Handle modal close by removing the 'compose' query param
	const handleCloseCompose = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("compose");
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div
			className={`h-screen flex flex-col ${
				darkMode ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			<Header
				user={user}
				onLogout={logout}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				notifications={notifications}
				setNotifications={setNotifications}
				onMenuClick={() => setShowMobileMenu(!showMobileMenu)}
			/>

			<div className="flex flex-1 overflow-hidden relative">
				{/* Desktop Sidebar */}
				<div className="hidden md:flex md:flex-shrink-0">
					<Sidebar
						user={user}
						labels={labels}
						onCompose={() => {
							const params = new URLSearchParams(searchParams.toString());
							params.set("compose", "true");
							router.push(`${pathname}?${params.toString()}`);
						}}
						unreadCounts={unreadCounts}
					/>
				</div>

				{/* Mobile Sidebar Overlay */}
				{showMobileMenu && (
					<div className="md:hidden fixed inset-0 z-40 flex">
						<div
							className="fixed inset-0 bg-gray-600 bg-opacity-75"
							onClick={() => setShowMobileMenu(false)}
						></div>

						<div
							className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<div className="absolute top-0 right-0 -mr-12 pt-2">
								<button
									className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
									onClick={() => setShowMobileMenu(false)}
								>
									<span className="sr-only">Close sidebar</span>
									<svg
										className="h-6 w-6 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<Sidebar
								user={user}
								labels={labels}
								onCompose={() => {
									const params = new URLSearchParams(searchParams.toString());
									params.set("compose", "true");
									router.push(`${pathname}?${params.toString()}`);
									setShowMobileMenu(false);
								}}
								unreadCounts={unreadCounts}
							/>
						</div>

						<div className="flex-shrink-0 w-14">
							{/* Force sidebar to shrink to fit close icon */}
						</div>
					</div>
				)}

				{/* Main Content */}
				<main className="flex-1 flex flex-col overflow-hidden relative z-0">
					{children}
				</main>
			</div>
			
			{showCompose && (
				<ComposeModal
					user={user}
					darkMode={darkMode}
					onClose={handleCloseCompose}
				/>
			)}
		</div>
	);
}

// Main layout export wraps in Suspense for useSearchParams
export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
			<ProtectedLayoutContent>{children}</ProtectedLayoutContent>
		</Suspense>
	);
}

