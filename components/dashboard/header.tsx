"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { User } from "@/lib/types";

interface HeaderProps {
	user: User | null;
	onLogout: () => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	notifications: any[];
	setNotifications: (notifications: any[]) => void;
	onMenuClick?: () => void;
}

export function Header({
	user,
	onLogout,
	searchTerm,
	setSearchTerm,
	notifications,
	setNotifications,
	onMenuClick,
}: HeaderProps) {
	const { darkMode, toggleDarkMode } = useTheme();
	const [showNotifications, setShowNotifications] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const notificationsRef = useRef<HTMLDivElement>(null);
	const userMenuRef = useRef<HTMLDivElement>(null);

	// Handle clicks outside of dropdown menus
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(event.target as Node)
			) {
				setShowUserMenu(false);
			}
			if (
				notificationsRef.current &&
				!notificationsRef.current.contains(event.target as Node)
			) {
				setShowNotifications(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header
			className={`z-10 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
		>
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
				{/* Logo section */}
				<div className="flex-shrink-0 flex items-center">
					<button
						type="button"
						className={`md:hidden mr-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ${
							darkMode
								? "text-gray-400 hover:text-white hover:bg-gray-700"
								: "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
						}`}
						onClick={onMenuClick}
					>
						<span className="sr-only">Open sidebar</span>
						<LucideIcons.Menu className="h-6 w-6" />
					</button>
					<div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
						<LucideIcons.Shield className="h-6 w-6" />
					</div>
					<span
						className={`ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r hidden sm:block ${
							darkMode
								? "from-indigo-400 to-purple-400"
								: "from-indigo-600 to-purple-600"
						}`}
					>
						PrivaMail
					</span>
				</div>

				{/* Search section */}
				<div className="flex-1 flex items-center justify-center px-4 max-w-xl mx-auto">
					<div className="w-full relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<LucideIcons.Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							id="search"
							className={`block w-full pl-10 pr-3 py-2 rounded-lg leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out ${
								darkMode
									? "bg-gray-700 border-none placeholder-gray-400 text-white"
									: "bg-gray-100 border-none text-gray-900"
							}`}
							placeholder="Search emails"
							type="search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{searchTerm && (
							<button
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setSearchTerm("")}
							>
								<LucideIcons.X className="h-4 w-4 text-gray-400 hover:text-gray-500" />
							</button>
						)}
					</div>
				</div>

				{/* Actions section */}
				<div className="flex items-center space-x-1">
					{/* Dark mode toggle */}
					<button
						onClick={toggleDarkMode}
						className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
							darkMode
								? "text-gray-300 hover:text-white hover:bg-gray-700"
								: "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
						}`}
						aria-label="Toggle dark mode"
					>
						{darkMode ? (
							<LucideIcons.Sun className="h-6 w-6" />
						) : (
							<LucideIcons.Moon className="h-6 w-6" />
						)}
					</button>

					{/* Notifications dropdown */}
					<div className="relative" ref={notificationsRef}>
						<button
							onClick={() => setShowNotifications(!showNotifications)}
							className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 relative ${
								darkMode
									? "text-gray-300 hover:text-white hover:bg-gray-700"
									: "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
							}`}
						>
							<span className="sr-only">View notifications</span>
							<LucideIcons.Bell className="h-6 w-6" />
							{notifications.some((n) => !n.read) && (
								<span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
							)}
						</button>

						<AnimatePresence>
							{showNotifications && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.2 }}
									className={`origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg focus:outline-none z-50 overflow-hidden ${
										darkMode ? "bg-gray-800" : "bg-white"
									}`}
								>
									<div
										className={`px-4 py-3 ${
											darkMode ? "bg-gray-750" : "bg-gray-50"
										}`}
									>
										<div className="flex justify-between items-center">
											<h3
												className={`text-sm font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Notifications
											</h3>
											<span
												className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
													darkMode
														? "bg-indigo-900 text-indigo-200"
														: "bg-indigo-100 text-indigo-800"
												}`}
											>
												{notifications.filter((n) => !n.read).length} new
											</span>
										</div>
									</div>
									<div className="max-h-60 overflow-y-auto">
										{notifications.length === 0 ? (
											<div
												className={`px-4 py-6 text-center ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												<LucideIcons.BellOff className="mx-auto h-8 w-8 mb-2" />
												<p>No notifications</p>
											</div>
										) : (
											notifications.map((notification) => (
												<div
													key={notification.id}
													className={`px-4 py-3 ${
														darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
													} ${
														!notification.read
															? darkMode
																? "bg-indigo-900 bg-opacity-20"
																: "bg-indigo-50"
															: ""
													}`}
												>
													<div className="flex justify-between items-start">
														<div>
															<p
																className={`text-sm font-medium ${
																	darkMode ? "text-white" : "text-gray-900"
																}`}
															>
																{notification.title}
															</p>
															<p
																className={`text-xs mt-0.5 ${
																	darkMode
																		? "text-gray-400"
																		: "text-gray-500"
																}`}
															>
																{notification.description}
															</p>
															<p
																className={`text-xs mt-1 ${
																	darkMode
																		? "text-gray-500"
																		: "text-gray-400"
																}`}
															>
																{notification.time}
															</p>
														</div>
														{!notification.read && (
															<span className="inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
														)}
													</div>
												</div>
											))
										)}
									</div>
									<div
										className={`px-4 py-2 text-center ${
											darkMode ? "bg-gray-750" : "bg-gray-50"
										}`}
									>
										<button
											className={`text-sm font-medium transition-colors duration-200 ${
												darkMode
													? "text-indigo-400 hover:text-indigo-300"
													: "text-indigo-600 hover:text-indigo-700"
											}`}
											onClick={() => {
												setNotifications(
													notifications.map((n) => ({ ...n, read: true }))
												);
											}}
										>
											Mark all as read
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Profile dropdown */}
					<div className="relative" ref={userMenuRef}>
						<button
							onClick={() => setShowUserMenu(!showUserMenu)}
							className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							id="user-menu"
							aria-expanded="false"
							aria-haspopup="true"
						>
							<span className="sr-only">Open user menu</span>
							<img
								className="h-9 w-9 rounded-full ring-2 ring-indigo-500 ring-opacity-50"
								src={
									user?.profileImage ||
									`https://ui-avatars.com/api/?name=${encodeURIComponent(
										user?.name || "User"
									)}&background=6366f1&color=fff`
								}
								alt={user?.name || "User"}
							/>
						</button>

						<AnimatePresence>
							{showUserMenu && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.2 }}
									className={`origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg focus:outline-none z-50 overflow-hidden ${
										darkMode ? "bg-gray-800" : "bg-white"
									}`}
								>
									<div className="py-1">
										<div
											className={`px-4 py-3 ${
												darkMode ? "bg-gray-750" : "bg-gray-50"
											}`}
										>
											<p
												className={`text-sm font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												{user?.name}
											</p>
											<p
												className={`text-xs truncate ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												{user?.email}
											</p>
										</div>
										<Link
											href="/settings"
											className={`block px-4 py-2 text-sm transition-colors duration-200 ${
												darkMode
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											Settings
										</Link>
										<Link
											href="/security-setup"
											className={`block px-4 py-2 text-sm transition-colors duration-200 ${
												darkMode
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											Security
										</Link>
										<button
											onClick={onLogout}
											className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
												darkMode
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											Sign out
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</header>
	);
}
