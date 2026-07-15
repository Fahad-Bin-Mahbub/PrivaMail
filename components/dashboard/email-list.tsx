"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
	onRestore?: (emailIds: string[]) => void;
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
	onRestore,
}: EmailListProps) {
	const { darkMode } = useTheme();
	const router = useRouter();
	const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
	const [isSelectAll, setIsSelectAll] = useState(false);
	const [emailToDelete, setEmailToDelete] = useState<string[] | null>(null);

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
				? "bg-accent-500/20 text-accent-200"
				: "bg-accent-100 text-accent-800",
			indigo: darkMode
				? "bg-brand-500/20 text-brand-200"
				: "bg-brand-100 text-brand-800",
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
		setEmailToDelete(selectedEmails);
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
								title="Mark selected as read"
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
								title="Mark selected as unread"
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
								title="Archive selected"
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
								title="Delete selected"
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
									Your {activeFolder} is empty
								</h3>
								<p
									className={`mt-1 text-sm mb-6 ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									{activeFolder === "inbox" ? "You're all caught up! Enjoy your day." : `No emails found in ${activeFolder}.`}
								</p>
								{activeFolder === "inbox" && (
									<button onClick={() => window.dispatchEvent(new CustomEvent('open-compose'))} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none">
										<LucideIcons.PenBox className="mr-2 h-4 w-4" />
										Compose new email
									</button>
								)}
							</div>
						</div>
					) : (
						<div>
							{/* Select all header */}
							<div
								className={`px-4 py-3 flex items-center justify-between border-b ${
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
										className={`h-4 w-4 text-brand-600 focus:ring-brand-500 rounded cursor-pointer ${
											darkMode
												? "bg-gray-700 border-gray-600"
												: "border-gray-300"
										}`}
										checked={isSelectAll}
										onChange={toggleSelectAll}
									/>
									<span className={`ml-3 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Select All</span>
								</div>
								<div className="flex items-center space-x-4 text-xs tour-encrypted-legend">
									<span className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}><div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div> Encrypted</span>
									<span className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}><div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div> Not Encrypted</span>
									<span className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}><div className="w-2 h-2 rounded-full bg-brand-400 mr-1.5"></div> Unread</span>
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
										className={`relative group cursor-pointer border-l-4 ${
											email.isEncrypted
												? "border-l-green-500"
												: "border-l-amber-500"
										} ${
											!email.read
												? darkMode
													? "bg-brand-900/20"
													: "bg-brand-50"
												: ""
										} ${
											selectedEmails.includes(email.id)
												? darkMode
													? "bg-brand-900/40"
													: "bg-brand-100"
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
													className={`h-4 w-4 text-brand-600 focus:ring-brand-500 rounded cursor-pointer ${
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
															<div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white uppercase shadow-sm">
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
																			? "text-brand-400"
																			: "text-brand-500"
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
											
											{/* Hover Actions */}
											<div className={`hidden md:flex absolute right-4 bottom-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${darkMode ? "bg-gray-800" : "bg-white"} p-2 rounded-lg shadow-md border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
												{activeFolder === "trash" && onRestore ? (
													<button
														onClick={(e) => {
															e.stopPropagation();
															onRestore([email.id]);
														}}
														className={`p-1.5 rounded-md ${darkMode ? "text-gray-400 hover:text-green-400 hover:bg-gray-700" : "text-gray-500 hover:text-green-600 hover:bg-green-50"}`}
														title="Restore"
													>
														<LucideIcons.RotateCcw className="h-4 w-4" />
													</button>
												) : (
													<>
														<button
															onClick={(e) => {
																e.stopPropagation();
																onArchive([email.id]);
															}}
															className={`p-1.5 rounded-md ${darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
															title="Archive"
														>
															<LucideIcons.Archive className="h-4 w-4" />
														</button>
														<button
															onClick={(e) => {
																e.stopPropagation();
																onMarkAsRead([email.id], !email.read);
															}}
															className={`p-1.5 rounded-md ${darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
															title={email.read ? "Mark as unread" : "Mark as read"}
														>
															{email.read ? <LucideIcons.Mail className="h-4 w-4" /> : <LucideIcons.MailCheck className="h-4 w-4" />}
														</button>
													</>
												)}
												<button
													onClick={(e) => {
														e.stopPropagation();
														setEmailToDelete([email.id]);
													}}
													className={`p-1.5 rounded-md ${darkMode ? "text-gray-400 hover:text-red-400 hover:bg-gray-700" : "text-gray-500 hover:text-red-600 hover:bg-red-50"}`}
													title="Delete"
												>
													<LucideIcons.Trash2 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</motion.li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
			<AnimatePresence>
				{emailToDelete && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
						onClick={(e) => e.stopPropagation()}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className={`mx-4 p-6 rounded-xl shadow-2xl max-w-sm w-full ${
								darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
							}`}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center space-x-3 text-red-500 mb-4">
								<LucideIcons.AlertTriangle className="h-6 w-6" />
								<h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
									Delete {emailToDelete.length > 1 ? `${emailToDelete.length} Emails` : "Email"}
								</h3>
							</div>
							<p className={`mb-6 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
								Are you sure you want to move {emailToDelete.length > 1 ? "these emails" : "this email"} to the trash?
							</p>
							<div className="flex justify-end space-x-3">
								<button
									onClick={(e) => {
										e.stopPropagation();
										setEmailToDelete(null);
									}}
									className={`px-4 py-2 rounded-lg font-medium transition-colors ${
										darkMode
											? "bg-gray-700 hover:bg-gray-600 text-gray-300"
											: "bg-gray-100 hover:bg-gray-200 text-gray-700"
									}`}
								>
									Cancel
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										onDelete(emailToDelete);
										setSelectedEmails([]);
										setIsSelectAll(false);
										setEmailToDelete(null);
									}}
									className="px-4 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
								>
									Delete
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
