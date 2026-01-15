"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Email, Label, User } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface EmailListProps {
	emails: Email[];
	user: User | null;
	labels: Label[];
	activeFolder: string;
	onRefresh: () => void;
	isRefreshing: boolean;
	onToggleStar: (emailId: string) => void;
	onDelete: (emailIds: string[]) => void;
	onArchive: (emailIds: string[]) => void;
	onMarkAsRead: (emailIds: string[], read: boolean) => void;
}

export function EmailList({
	emails,
	user,
	labels,
	activeFolder,
	onRefresh,
	isRefreshing,
	onToggleStar,
	onDelete,
	onArchive,
	onMarkAsRead,
}: EmailListProps) {
	const { darkMode } = useTheme();
	const router = useRouter();
	const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
	const [isSelectAll, setIsSelectAll] = useState(false);

	// Handle email selection
	const toggleEmailSelection = (emailId: string) => {
		if (selectedEmails.includes(emailId)) {
			setSelectedEmails(selectedEmails.filter((id) => id !== emailId));
		} else {
			setSelectedEmails([...selectedEmails, emailId]);
		}
	};

	// Handle select all
	const toggleSelectAll = () => {
		if (isSelectAll) {
			setSelectedEmails([]);
		} else {
			setSelectedEmails(emails.map((email) => email.id));
		}
		setIsSelectAll(!isSelectAll);
	};

	// Handle email click
	const handleEmailClick = (emailId: string) => {
		router.push(`/dashboard/view/${emailId}`);
	};

	// Get label info by id
	const getLabelInfo = (labelId: string) => {
		return labels.find((label) => label.id === labelId);
	};

	// Get label color class
	const getLabelColorClass = (color: string) => {
		const colorMap: Record<string, string> = {
			blue: darkMode
				? "bg-blue-500/20 text-blue-200"
				: "bg-blue-100 text-blue-800",
			green: darkMode
				? "bg-green-500/20 text-green-200"
				: "bg-green-100 text-green-800",
			red: darkMode
				? "bg-red-500/20 text-red-200"
				: "bg-red-100 text-red-800",
			yellow: darkMode
				? "bg-yellow-500/20 text-yellow-200"
				: "bg-yellow-100 text-yellow-800",
			purple: darkMode
				? "bg-purple-500/20 text-purple-200"
				: "bg-purple-100 text-purple-800",
			indigo: darkMode
				? "bg-indigo-500/20 text-indigo-200"
				: "bg-indigo-100 text-indigo-800",
			pink: darkMode
				? "bg-pink-500/20 text-pink-200"
				: "bg-pink-100 text-pink-800",
		};

		return (
			colorMap[color] ||
			(darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800")
		);
	};

	// Actions wrapping
	const handleMarkAsRead = (read: boolean) => {
		onMarkAsRead(selectedEmails, read);
		setSelectedEmails([]);
		setIsSelectAll(false);
	};

	const handleArchive = () => {
		onArchive(selectedEmails);
		setSelectedEmails([]);
		setIsSelectAll(false);
	};

	const handleDelete = () => {
		onDelete(selectedEmails);
		setSelectedEmails([]);
		setIsSelectAll(false);
	};

	return (
		<div className="flex-1 overflow-auto flex flex-col h-full">
			{/* Email list header */}
			<div
				className={`relative z-5 flex-shrink-0 flex h-16 shadow-sm px-4 justify-between items-center ${
					darkMode ? "bg-gray-800" : "bg-white"
				}`}
			>
				<div className="flex items-center">
					<h1
						className={`text-xl font-semibold capitalize ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						{activeFolder}
					</h1>
					{selectedEmails.length > 0 && (
						<span
							className={`ml-2 text-sm ${
								darkMode ? "text-gray-400" : "text-gray-500"
							}`}
						>
							({selectedEmails.length} selected)
						</span>
					)}
				</div>
				<div className="flex items-center space-x-2">
					{/* Email actions buttons */}
					{selectedEmails.length > 0 ? (
						<>
							<button
								onClick={() => handleMarkAsRead(true)}
								className={`p-1.5 rounded-md transition-colors duration-200 group relative ${
									darkMode
										? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
										: "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span className="sr-only">Mark as read</span>
								<LucideIcons.MailCheck className="h-5 w-5" />
							</button>
							<button
								onClick={() => handleMarkAsRead(false)}
								className={`p-1.5 rounded-md transition-colors duration-200 group relative ${
									darkMode
										? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
										: "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span className="sr-only">Mark as unread</span>
								<LucideIcons.Mail className="h-5 w-5" />
							</button>
							<button
								onClick={handleArchive}
								className={`p-1.5 rounded-md transition-colors duration-200 group relative ${
									darkMode
										? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
										: "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
								}`}
							>
								<span className="sr-only">Archive</span>
								<LucideIcons.Archive className="h-5 w-5" />
							</button>
							<button
								onClick={handleDelete}
								className={`p-1.5 rounded-md transition-colors duration-200 group relative ${
									darkMode
										? "text-red-400 hover:text-red-300 hover:bg-gray-700"
										: "text-red-500 hover:text-red-700 hover:bg-red-50"
								}`}
							>
								<span className="sr-only">Delete</span>
								<LucideIcons.Trash2 className="h-5 w-5" />
							</button>
						</>
					) : (
						<button
							onClick={onRefresh}
							disabled={isRefreshing}
							className={`p-1.5 rounded-md transition-colors duration-200 group relative ${
								darkMode
									? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
									: "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
							} ${isRefreshing ? "animate-spin" : ""}`}
						>
							<span className="sr-only">Refresh</span>
							<LucideIcons.RefreshCw className="h-5 w-5" />
						</button>
					)}
				</div>
			</div>

			<div className={`flex-1 overflow-auto p-4`}>
				<div
					className={`rounded-lg shadow-sm overflow-hidden ${
						darkMode ? "bg-gray-800" : "bg-white"
					}`}
				>
					{emails.length === 0 ? (
						<div className="py-20">
							<div className="text-center">
								<LucideIcons.MailX
									className={`mx-auto h-12 w-12 ${
										darkMode ? "text-gray-600" : "text-gray-400"
									}`}
								/>
								<h3
									className={`mt-2 text-lg font-medium ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									No emails
								</h3>
								<p
									className={`mt-1 text-sm ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									No emails in {activeFolder}.
								</p>
							</div>
						</div>
					) : (
						<div>
							{/* Select all header */}
							<div
								className={`px-4 py-3 flex items-center border-b ${
									darkMode
										? "bg-gray-750 border-gray-700"
										: "bg-gray-50 border-gray-200"
								}`}
							>
								<div className="flex items-center">
									<input
										id="select-all"
										name="select-all"
										type="checkbox"
										className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded cursor-pointer ${
											darkMode
												? "bg-gray-700 border-gray-600"
												: "border-gray-300"
										}`}
										checked={isSelectAll}
										onChange={toggleSelectAll}
									/>
								</div>
							</div>

							<ul className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-100"}`}>
								{emails.map((email) => (
									<motion.li
										key={email.id}
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										whileHover={{
											backgroundColor: darkMode
												? "rgba(55, 65, 81, 0.5)"
												: "rgba(243, 244, 246, 0.5)",
										}}
										className={`relative group cursor-pointer ${
											!email.read
												? darkMode
													? "bg-indigo-900/20"
													: "bg-indigo-50"
												: ""
										} ${
											selectedEmails.includes(email.id)
												? darkMode
													? "bg-indigo-900/40"
													: "bg-indigo-100"
												: ""
										}`}
										onClick={() => handleEmailClick(email.id)}
									>
										<div className="px-4 py-4 sm:px-6 flex items-center">
											<div
												className="flex items-center pr-4"
												onClick={(e) => e.stopPropagation()}
											>
												<input
													id={`select-${email.id}`}
													name={`select-${email.id}`}
													type="checkbox"
													className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded cursor-pointer ${
														darkMode
															? "bg-gray-700 border-gray-600"
															: "border-gray-300"
													}`}
													checked={selectedEmails.includes(email.id)}
													onChange={() => toggleEmailSelection(email.id)}
												/>
											</div>

											<div className="flex-1 min-w-0">
												<div className="flex justify-between items-center mb-1">
													<div className="flex items-center space-x-3">
														<div className="flex-shrink-0">
															<div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white uppercase shadow-sm">
																{email.from.split("@")[0].charAt(0)}
															</div>
														</div>
														<div className="min-w-0 flex-1">
															<p
																className={`text-sm font-medium truncate ${
																	!email.read
																		? darkMode
																			? "text-white"
																			: "text-gray-900"
																		: darkMode
																		? "text-gray-300"
																		: "text-gray-700"
																}`}
															>
																{email.from === user?.email
																	? `Me (${user.email})`
																	: email.from}
															</p>
															<p
																className={`text-xs truncate ${
																	darkMode
																		? "text-gray-400"
																		: "text-gray-500"
																}`}
															>
																To: {email.to.join(", ")}
															</p>
														</div>
													</div>
													<div className="flex flex-shrink-0 flex-col items-end">
														<p
															className={`text-sm whitespace-nowrap ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															{formatDate(email.timestamp)}
														</p>
														<div className="mt-1 flex items-center space-x-2">
															<button
																onClick={(e) => {
																	e.stopPropagation();
																	onToggleStar(email.id);
																}}
																className={`transition-colors duration-200 ${
																	email.starred
																		? "text-yellow-500"
																		: darkMode
																		? "text-gray-400 hover:text-yellow-500"
																		: "text-gray-400 hover:text-yellow-500"
																}`}
															>
																{email.starred ? (
																	<LucideIcons.Star className="h-4 w-4 fill-current" />
																) : (
																	<LucideIcons.Star className="h-4 w-4" />
																)}
															</button>

															{email.isEncrypted && (
																<span
																	className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
																		darkMode
																			? "bg-green-900 text-green-200"
																			: "bg-green-100 text-green-800"
																	}`}
																>
																	<LucideIcons.Lock className="mr-1 h-3 w-3" />
																	Encrypted
																</span>
															)}

															{email.attachments.length > 0 && (
																<span
																	className={
																		darkMode
																			? "text-indigo-400"
																			: "text-indigo-500"
																	}
																>
																	<LucideIcons.Paperclip className="h-4 w-4" />
																</span>
															)}
														</div>
													</div>
												</div>

												<div className="mt-2">
													<h3
														className={`text-base truncate ${
															!email.read
																? darkMode
																	? "font-semibold text-white"
																	: "font-semibold text-gray-900"
																: darkMode
																? "font-normal text-gray-300"
																: "font-normal text-gray-700"
														}`}
													>
														{email.subject}
													</h3>
													<p
														className={`mt-1 text-sm line-clamp-1 ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														{email.body}
													</p>

													{/* Labels */}
													{email.labels && email.labels.length > 0 && (
														<div className="mt-2 flex flex-wrap gap-1.5">
															{email.labels.map((labelId) => {
																const label = getLabelInfo(labelId);
																if (!label) return null;
																return (
																	<span
																		key={labelId}
																		className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getLabelColorClass(
																			label.color
																		)}`}
																	>
																		{label.name}
																	</span>
																);
															})}
														</div>
													)}
												</div>
											</div>
										</div>
									</motion.li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
