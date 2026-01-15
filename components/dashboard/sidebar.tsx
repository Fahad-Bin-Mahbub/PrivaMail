"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { User, Label } from "@/lib/types";

interface SidebarProps {
	user: User | null;
	labels: Label[];
	onCompose: () => void;
	unreadCounts: Record<string, number>;
}

export function Sidebar({
	user,
	labels,
	onCompose,
	unreadCounts,
}: SidebarProps) {
	const { darkMode } = useTheme();
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname.endsWith(path);
	};

	const getLabelColorClass = (color: string) => {
		const colorMap: Record<string, string> = {
			blue: darkMode
				? "bg-blue-900 bg-opacity-50 text-blue-300"
				: "bg-blue-100 text-blue-800",
			green: darkMode
				? "bg-green-900 bg-opacity-50 text-green-300"
				: "bg-green-100 text-green-800",
			red: darkMode
				? "bg-red-900 bg-opacity-50 text-red-300"
				: "bg-red-100 text-red-800",
			yellow: darkMode
				? "bg-yellow-900 bg-opacity-50 text-yellow-300"
				: "bg-yellow-100 text-yellow-800",
			purple: darkMode
				? "bg-purple-900 bg-opacity-50 text-purple-300"
				: "bg-purple-100 text-purple-800",
			indigo: darkMode
				? "bg-indigo-900 bg-opacity-50 text-indigo-300"
				: "bg-indigo-100 text-indigo-800",
			pink: darkMode
				? "bg-pink-900 bg-opacity-50 text-pink-300"
				: "bg-pink-100 text-pink-800",
		};

		return (
			colorMap[color] ||
			(darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800")
		);
	};

	return (
		<div
			className={`flex flex-col w-64 ${darkMode ? "bg-gray-800" : "bg-white"}`}
		>
			<div className="p-4">
			<div className="p-4">
				<button
					onClick={onCompose}
					className="w-full flex justify-center items-center py-2 px-4 rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
				>
					<LucideIcons.PenSquare className="mr-2 h-5 w-5" />
					Compose
				</button>
			</div>
			</div>
			<div className="flex-1 flex flex-col overflow-y-auto">
				<nav className="flex-1 px-2 py-2 space-y-1">
					<Link
						href="/dashboard/inbox"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/inbox") || pathname === "/dashboard"
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.Inbox className="mr-3 h-5 w-5" />
						Inbox
						{(unreadCounts["inbox"] || 0) > 0 && (
							<span className="ml-auto py-0.5 px-2 rounded-full text-xs bg-indigo-600 text-white">
								{unreadCounts["inbox"]}
							</span>
						)}
					</Link>

					<Link
						href="/dashboard/encrypted"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/encrypted")
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.Lock className="mr-3 h-5 w-5" />
						Encrypted
						{(unreadCounts["encrypted"] || 0) > 0 && (
							<span className="ml-auto py-0.5 px-2 rounded-full text-xs bg-indigo-600 text-white">
								{unreadCounts["encrypted"]}
							</span>
						)}
					</Link>

					<Link
						href="/dashboard/starred"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/starred")
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.Star className="mr-3 h-5 w-5" />
						Starred
					</Link>

					<Link
						href="/dashboard/sent"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/sent")
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.SendHorizontal className="mr-3 h-5 w-5" />
						Sent
					</Link>

					<Link
						href="/dashboard/drafts"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/drafts")
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.FileEdit className="mr-3 h-5 w-5" />
						Drafts
					</Link>

					<Link
						href="/dashboard/trash"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/trash")
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.Trash2 className="mr-3 h-5 w-5" />
						Trash
					</Link>

					<Link
						href="/settings"
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
							isActive("/settings")
								? darkMode
									? "bg-indigo-900 bg-opacity-20 text-indigo-200"
									: "bg-indigo-50 text-indigo-700"
								: darkMode
								? "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
								: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
						}`}
					>
						<LucideIcons.Settings className="mr-3 h-5 w-5" />
						Settings
					</Link>

					<div className="pt-4 mt-2 mb-2">
						<div
							className={`px-3 flex justify-between items-center text-xs font-semibold uppercase tracking-wider ${
								darkMode
									? "text-gray-400 after:content-[''] after:block after:h-[1px] after:bg-gray-700 after:w-full after:ml-2"
									: "text-gray-500 after:content-[''] after:block after:h-[1px] after:bg-gray-200 after:w-full after:ml-2"
							}`}
						>
							<div className="flex items-center space-x-2">
								<span>Labels</span>
								<button
									className={`transition-colors duration-200 p-0.5 rounded-full ${
										darkMode
											? "hover:bg-gray-700 hover:text-indigo-400"
											: "hover:bg-gray-200 hover:text-indigo-600"
									}`}
								>
									<LucideIcons.Plus className="h-3 w-3" />
								</button>
							</div>
						</div>
					</div>

					{labels.map((label) => (
						<button
							key={label.id}
							className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 ${
								darkMode
									? "text-gray-300 hover:bg-gray-700 hover:text-white"
									: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							}`}
						>
							<div
								className={`h-3 w-3 rounded-full mr-3`}
								style={{
									backgroundColor:
										label.color === "blue"
											? "#3b82f6"
											: label.color === "green"
											? "#10b981"
											: label.color === "red"
											? "#ef4444"
											: label.color === "purple"
											? "#8b5cf6"
											: "#6366f1",
								}}
							></div>
							{label.name}
						</button>
					))}
				</nav>

				<div
					className={`mt-6 px-3 py-4 mx-2 rounded-lg ${
						darkMode ? "bg-gray-750" : "bg-gray-50"
					}`}
				>
					<h3
						className={`text-xs font-semibold uppercase tracking-wider ${
							darkMode ? "text-gray-400" : "text-gray-500"
						}`}
					>
						Connected Accounts
					</h3>
					<ul className="mt-2 space-y-1">
						{user?.connectedAccounts.map((account) => (
							<li
								key={account.id}
								className={`flex items-center px-2 py-1.5 text-sm ${
									darkMode ? "text-gray-300" : "text-gray-700"
								}`}
							>
								{account.provider === "gmail" && (
									<svg
										className="mr-2 h-4 w-4 text-red-500"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											fill="#4285F4"
										/>
										<path
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											fill="#34A853"
										/>
										<path
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											fill="#FBBC05"
										/>
										<path
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											fill="#EA4335"
										/>
									</svg>
								)}
								{account.provider === "outlook" && (
									<svg
										className="mr-2 h-4 w-4 text-blue-500"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M2 6L10 4V20L2 18V6Z" fill="#0078D4" />
										<path d="M12 4L22 2V22L12 20V4Z" fill="#0078D4" />
									</svg>
								)}
								{account.provider === "yahoo" && (
									<svg
										className="mr-2 h-4 w-4 text-purple-600"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											d="M19.828 7.242H16.3V3h-3.194v4.242h-3.523v3.872h3.523v12.244h3.194V11.114h3.528v-3.872z"
											fill="#6001D2"
										/>
									</svg>
								)}
								{account.provider === "other" && (
									<LucideIcons.Mail className="mr-2 h-4 w-4 text-gray-500" />
								)}
								<span className="truncate">{account.email}</span>
								<div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
							</li>
						))}
						<li className="mt-3">
							<button
								className={`flex items-center px-2 py-1.5 text-sm transition-colors duration-200 ${
									darkMode
										? "text-indigo-400 hover:text-indigo-300"
										: "text-indigo-600 hover:text-indigo-700"
								}`}
							>
								<LucideIcons.Plus className="mr-2 h-4 w-4" />
								Add Account
							</button>
						</li>
					</ul>
				</div>

				<div className="px-3 py-4 mx-2 mt-4 mb-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
					<div className="flex items-center justify-between">
						<h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
							Storage
						</h3>
						<span className="text-xs text-indigo-100">30% used</span>
					</div>
					<div
						className={`mt-2 w-full rounded-full h-2.5 overflow-hidden ${
							darkMode ? "bg-indigo-100" : "bg-indigo-800"
						} bg-opacity-50`}
					>
						<div
							className={`${
								darkMode ? "bg-indigo-800" : "bg-indigo-100"
							} h-2.5 rounded-full w-[30%]`}
						></div>
					</div>
					<div className="mt-1 text-xs flex justify-between text-indigo-100">
						<span>1.5 GB of 5 GB used</span>
						<button className="transition-colors duration-200 font-medium hover:text-white hover:underline">
							Upgrade
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
