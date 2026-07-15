"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Note: transforming react-spring to framer-motion or keeping react-spring?
// The original code uses react-spring for `emailViewAnimation` and framer-motion for `AnimatePresence`.
// I will keep using react-spring for consistency with the original code if possible, or migrate to framer-motion.
// The original imports: `import { useSpring, animated } from "@react-spring/web";`
// But here I see `useSpring, animated, AnimatePresence, motion } from "framer-motion"` in my thought block?
// No, the original file uses:
// `import { useSpring, animated } from "@react-spring/web";`
// `import { motion, AnimatePresence } from "framer-motion";`
// I should import both properly.

import { useSpring as useReactSpring, animated as a } from "@react-spring/web";
import { motion, AnimatePresence as FramerAnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { User, Email } from "@/lib/types";
import { db } from "@/lib/db";

interface EmailViewProps {
	user: User | null;
	darkMode: boolean;
}

export function EmailView({ user, darkMode }: EmailViewProps) {
	const router = useRouter();
	const { id } = useParams();
	const [email, setEmail] = useState<Email | null>(null);
	const [isDecrypted, setIsDecrypted] = useState(false);
	const [password, setPassword] = useState("");
	const [showDecryptPassword, setShowDecryptPassword] = useState(false);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [isLoadingEmail, setIsLoadingEmail] = useState(true);
	const [showEncryptedContent, setShowEncryptedContent] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [showReplyBox, setShowReplyBox] = useState(false);
	const [replyMessage, setReplyMessage] = useState("");
	const [showForwardBox, setShowForwardBox] = useState(false);
	const [forwardRecipient, setForwardRecipient] = useState("");
	const [forwardMessage, setForwardMessage] = useState("");
	const [encryptReply, setEncryptReply] = useState(true);
	const [replyReadReceipt, setReplyReadReceipt] = useState(false);
	const [encryptForward, setEncryptForward] = useState(true);
	const [includeAttachments, setIncludeAttachments] = useState(true);

	// Animation for email view (using react-spring)
	const emailViewAnimation = useReactSpring({
		from: { opacity: 0, transform: "translateY(20px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		config: { tension: 280, friction: 24 },
	});

	// Fetch email data
	useEffect(() => {
		// Simulate API call to fetch email
		setTimeout(async () => {
            const foundEmail = await db.getEmail(id as string);
            
			if (foundEmail) {
                if (!foundEmail.read) {
                    await db.updateEmail(id as string, { read: true });
                    foundEmail.read = true;
                }
				setEmail(foundEmail);
				setIsLoadingEmail(false);

				// If email is password protected, show password modal
				if (foundEmail.passwordProtected) {
					setShowPasswordModal(true);
				} else {
					setIsDecrypted(true);
				}

				// Prepare forward message
				setForwardMessage(
					`\n\n---------- Forwarded message ----------\nFrom: ${
						foundEmail.from
					}\nDate: ${foundEmail.timestamp.toLocaleString()}\nSubject: ${
						foundEmail.subject
					}\nTo: ${foundEmail.to.join(", ")}\n\n${foundEmail.body}`
				);
			} else {
				// Handle email not found
				setIsLoadingEmail(false);
			}
		}, 600);
	}, [id, user]);

	// Handle password submission
	const handlePasswordSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!password) {
			toast.error("Password is required");
			return;
		}

		// For demo, just check if password is "PrivaMail" (the hint says "name of our service lowercase")
		if (password.toLowerCase() === "privamail") {
			setIsDecrypted(true);
			setShowPasswordModal(false);
			toast.success("Email decrypted successfully");
		} else {
			toast.error("Incorrect password. Please try again.");
		}
	};

	// Handle reply submission
	const handleReplySubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!replyMessage.trim()) {
			toast.error("Reply message is required");
			return;
		}

		toast.success("Reply sent securely");
		setShowReplyBox(false);
		setReplyMessage("");
	};

	// Handle forward submission
	const handleForwardSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!forwardRecipient.trim()) {
			toast.error("Recipient is required");
			return;
		}

		toast.success("Email forwarded securely");
		setShowForwardBox(false);
	};

	// Format date for display
	const formatDate = (date: Date) => {
		return date.toLocaleString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Format expiration date
	const formatExpirationDate = (date: Date) => {
		const now = new Date();
		const diff = date.getTime() - now.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

		if (days > 0) {
			return `${days} day${days > 1 ? "s" : ""} and ${hours} hour${
				hours > 1 ? "s" : ""
			}`;
		} else {
			return `${hours} hour${hours > 1 ? "s" : ""}`;
		}
	};

	// Format file size
	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return bytes + " B";
		else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
		else return (bytes / 1048576).toFixed(1) + " MB";
	};

	// Handle download
	const handleDownload = () => {
		setIsDownloading(true);

		// Simulate download
		setTimeout(() => {
			toast.success("File downloaded securely");
			setIsDownloading(false);
		}, 1500);
	};

	return (
		<div
			className={`flex-1 flex flex-col ${
				darkMode ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			{/* Header */}
			<header className={`shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
					<div className="flex items-center">
						<button
							onClick={() => router.push("/dashboard")}
							aria-label="Back to inbox"
							title="Back to inbox"
							className={`inline-flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 transition-colors duration-200 ${
								darkMode
									? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
									: "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
							}`}
						>
							<LucideIcons.ArrowLeft className="h-6 w-6" />
						</button>
						<span
							className={`ml-2 text-xl font-semibold flex items-center ${
								darkMode ? "text-white" : "text-gray-900"
							}`}
						>
							<LucideIcons.Mail
								className={`mr-2 h-5 w-5 ${
									darkMode ? "text-brand-400" : "text-brand-600"
								}`}
							/>
							View Email
						</span>
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={() => router.push("/dashboard")}
							className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
								darkMode
									? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
									: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
							}`}
						>
							<LucideIcons.Inbox className="mr-1.5 h-5 w-5" />
							Back to Inbox
						</button>
					</div>
				</div>
			</header>

			{/* Email content */}
			<main className="flex-1 py-6 pb-12">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{isLoadingEmail ? (
						<div
							className={`shadow-lg rounded-lg p-6 flex justify-center items-center h-96 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<div className="text-center">
								<div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mb-4"></div>
								<h2
									className={`text-xl font-medium ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									Loading email...
								</h2>
								<p
									className={`mt-1 text-sm ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									Please wait while we retrieve your secure message
								</p>
							</div>
						</div>
					) : email ? (
						<a.div style={emailViewAnimation}>
							<div
								className={`shadow-lg rounded-lg overflow-hidden ${
									darkMode ? "bg-gray-800" : "bg-white"
								}`}
							>
								{/* Email header */}
								<div
									className={`px-6 py-4 border-b ${
										darkMode
											? "border-gray-700 bg-gray-750"
											: "border-gray-200 bg-gray-50"
									}`}
								>
									<div className="flex justify-between items-start">
										<h1
											className={`text-xl font-bold ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											{email.subject}
										</h1>
										<div className="flex space-x-2">
											<button
												aria-label={email.starred ? "Remove star" : "Add star"}
												title={email.starred ? "Remove star" : "Add star"}
												className={`transition-colors duration-200 ${
													darkMode
														? "text-gray-400 hover:text-gray-300"
														: "text-gray-400 hover:text-gray-500"
												}`}
											>
												<LucideIcons.Star
													className={`h-5 w-5 ${
														email.starred ? "text-yellow-500 fill-current" : ""
													}`}
												/>
											</button>
											<button
												aria-label="More options"
												title="More options"
												className={`transition-colors duration-200 ${
													darkMode
														? "text-gray-400 hover:text-gray-300"
														: "text-gray-400 hover:text-gray-500"
												}`}
											>
												<LucideIcons.MoreHorizontal className="h-5 w-5" />
											</button>
										</div>
									</div>

									<div className="mt-4 flex flex-col sm:flex-row sm:items-start">
										<div className="flex-shrink-0 mb-3 sm:mb-0">
											<div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white uppercase shadow-sm">
												{email.from.split("@")[0].charAt(0)}
											</div>
										</div>
										<div className="sm:ml-4 flex-1">
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
												<div>
													<p
														className={`text-base font-medium ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														{email.from}
													</p>
													<p
														className={`text-sm ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														To: {email.to.join(", ")}
													</p>
												</div>
												<div
													className={`mt-2 sm:mt-0 text-sm ${
														darkMode ? "text-gray-400" : "text-gray-500"
													}`}
												>
													{formatDate(email.timestamp)}
												</div>
											</div>

											{/* Labels */}
											{email.labels && email.labels.length > 0 && (
												<div className="mt-2 flex flex-wrap gap-1.5">
													<span
														className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
															darkMode
																? "bg-green-900 bg-opacity-50 text-green-300"
																: "bg-green-100 text-green-800"
														}`}
													>
														Personal
													</span>
												</div>
											)}
										</div>
									</div>

									{/* Security badges */}
									<div className="mt-4 flex flex-wrap gap-2">
										{email.isEncrypted && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													isDecrypted
														? darkMode
															? "bg-green-900 text-green-200"
															: "bg-green-100 text-green-800"
														: darkMode
														? "bg-yellow-900 text-yellow-200"
														: "bg-yellow-100 text-yellow-800"
												}`}
											>
												<LucideIcons.Lock className="mr-1 h-3 w-3" />
												{isDecrypted ? "🔓 Unlocked" : "🔒 Locked"}
											</span>
										)}
										{email.encryptionLevel === "high" && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													darkMode
														? "bg-brand-900 text-brand-200"
														: "bg-brand-100 text-brand-800"
												}`}
											>
												<LucideIcons.Shield className="mr-1 h-3 w-3" />
												Maximum Security
											</span>
										)}
										{email.passwordProtected && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													darkMode
														? "bg-accent-900 text-accent-200"
														: "bg-accent-100 text-accent-800"
												}`}
											>
												<LucideIcons.KeySquare className="mr-1 h-3 w-3" />
												Password Protected
											</span>
										)}
										{email.expiresAt && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													darkMode
														? "bg-blue-900 text-blue-200"
														: "bg-blue-100 text-blue-800"
												}`}
											>
												<LucideIcons.Clock className="mr-1 h-3 w-3" />
												Expires in {formatExpirationDate(email.expiresAt)}
											</span>
										)}
										{email.readReceipt && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													darkMode
														? "bg-amber-900 text-amber-200"
														: "bg-amber-100 text-amber-800"
												}`}
												title="The sender will be notified that you opened this email"
											>
												<LucideIcons.Eye className="mr-1 h-3 w-3" />
												Read Receipt
											</span>
										)}
									</div>
								</div>

								{/* Email body */}
								<div className="px-6 py-6">
									{isDecrypted ? (
										<>
											{/* Decrypted content */}
											<div className="prose max-w-none">
												{email.body.split("\n\n").map((paragraph, index) => (
													<p
														key={index}
														className={`mb-4 ${
															darkMode ? "text-gray-300" : "text-gray-700"
														}`}
													>
														{paragraph}
													</p>
												))}
											</div>

											{/* View encrypted version button */}
											<div className="mt-6 flex justify-end">
												<button
													onClick={() =>
														setShowEncryptedContent(!showEncryptedContent)
													}
													className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
														darkMode
															? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
															: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
													}`}
												>
													{showEncryptedContent ? (
														<>
															<LucideIcons.EyeOff className="mr-1.5 h-4 w-4" />
															Hide scrambled view
														</>
													) : (
														<>
															<LucideIcons.Eye className="mr-1.5 h-4 w-4" />
															See how outsiders see this email
														</>
													)}
												</button>
											</div>

											{/* Encrypted content preview */}
											{showEncryptedContent && (
												<div
													className={`mt-4 p-4 rounded-md ${
														darkMode ? "bg-gray-900" : "bg-gray-100"
													}`}
												>
													<div className="flex justify-between items-center mb-2">
														<h3
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Encrypted Content
														</h3>
														<span
															className={`text-xs ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															{email.encryptionLevel === "high"
																? "Maximum Security Encryption"
																: "Standard Encryption"}
														</span>
													</div>
													<p className={`text-xs mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
														This scrambled text is all that anyone without permission can see:
													</p>
													<pre
														className={`font-mono text-xs whitespace-pre-wrap break-all overflow-auto max-h-60 p-3 rounded ${
															darkMode
																? "text-green-400 bg-black bg-opacity-30"
																: "text-green-600 bg-black bg-opacity-5"
														}`}
													>
														{`-----BEGIN ENCRYPTED MESSAGE-----
A4tB9wZ2EpQmFs8K7Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8
EpQmFs8K7Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8A4tB9wZ2
Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8A4tB9wZ2EpQmFs8K7
TbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8A4tB9wZ2EpQmFs8K7Lx1Dj3H6Y9o0vRn
A4tB9wZ2EpQmFs8K7Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8
EpQmFs8K7Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8A4tB9wZ2
Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8A4tB9wZ2EpQmFs8K7
A4tB9wZ2EpQmFs8K7Lx1Dj3H6Y9o0vRnTbUcVdPzX5WqSrG7IkMlO2NeQfJhCaB8
PzX5WqSrG7IkMlO2NeQfJhCaB8A4tB9wZ2EpQmFs8K7Lx1Dj3H6Y9o0vRnTbUcVd
-----END ENCRYPTED MESSAGE-----`}
													</pre>
													<div
														className={`mt-2 text-xs ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														This is what your email looks like to anyone who
														doesn"t have the decryption key.
													</div>
												</div>
											)}

											{/* Attachments */}
											{email.attachments.length > 0 && (
												<div className="mt-8">
													<h3
														className={`text-sm font-medium mb-4 flex items-center ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														<LucideIcons.Paperclip className="mr-2 h-4 w-4 text-gray-500" />
														Attachments ({email.attachments.length})
													</h3>
													<div className="space-y-3">
														{email.attachments.map((attachment) => (
															<div
																key={attachment.id}
																className={`flex items-center p-3 border rounded-lg ${
																	darkMode
																		? "border-gray-700 bg-gray-750"
																		: "border-gray-200 bg-gray-50"
																}`}
															>
																<div
																	className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded ${
																		darkMode ? "bg-brand-900" : "bg-brand-100"
																	}`}
																>
																	<LucideIcons.FileText
																		className={`h-6 w-6 ${
																			darkMode
																				? "text-brand-400"
																				: "text-brand-600"
																		}`}
																	/>
																</div>
																<div className="ml-4 flex-1">
																	<div className="flex items-center justify-between">
																		<div>
																			<h4
																				className={`text-sm font-medium ${
																					darkMode
																						? "text-white"
																						: "text-gray-900"
																				}`}
																			>
																				{attachment.name}
																			</h4>
																			<p
																				className={`text-xs ${
																					darkMode
																						? "text-gray-400"
																						: "text-gray-500"
																				}`}
																			>
																				{formatFileSize(attachment.size)}
																			</p>
																		</div>
																		<div className="flex items-center">
																			{attachment.isEncrypted && (
																				<span
																					className={`mr-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
																						darkMode
																							? "bg-green-900 text-green-200"
																							: "bg-green-100 text-green-800"
																					}`}
																				>
																					<LucideIcons.Lock className="mr-1 h-3 w-3" />
																					Encrypted
																				</span>
																			)}
																			<button
																				onClick={() => handleDownload()}
																				disabled={isDownloading}
																				className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
																					isDownloading
																						? "opacity-70 cursor-not-allowed"
																						: ""
																				}`}
																			>
																				{isDownloading ? (
																					<>
																						<svg
																							className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
																							xmlns="http://www.w3.org/2000/svg"
																							fill="none"
																							viewBox="0 0 24 24"
																						>
																							<circle
																								className="opacity-25"
																								cx="12"
																								cy="12"
																								r="10"
																								stroke="currentColor"
																								strokeWidth="4"
																							></circle>
																							<path
																								className="opacity-75"
																								fill="currentColor"
																								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
																							></path>
																						</svg>
																						Downloading...
																					</>
																				) : (
																					<>
																						<LucideIcons.Download className="mr-1.5 h-3 w-3" />
																						Download
																					</>
																				)}
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											)}

											{/* Reply box */}
											{showReplyBox && (
												<div
													className={`mt-8 border-t pt-6 ${
														darkMode ? "border-gray-700" : "border-gray-200"
													}`}
												>
													<h3
														className={`text-sm font-medium mb-4 ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Reply to {email.from}
													</h3>
													<form onSubmit={handleReplySubmit}>
														<div className="mt-1">
															<textarea
																rows={6}
																value={replyMessage}
																onChange={(e) =>
																	setReplyMessage(e.target.value)
																}
																className={`shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border rounded-md ${
																	darkMode
																		? "border-gray-600 bg-gray-700 text-white"
																		: "border-gray-300 bg-white text-gray-900"
																}`}
																placeholder="Write your reply here..."
															></textarea>
														</div>
														<div className="mt-4 flex justify-between items-center">
															<div className="flex items-center space-x-4">
																<div className="flex items-center">
																	<input
																		id="reply-encrypted"
																		name="reply-encrypted"
																		type="checkbox"
																		className={`focus:ring-brand-500 h-4 w-4 text-brand-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked={encryptReply}
																		onChange={(e) => setEncryptReply(e.target.checked)}
																	/>
																	<label
																		htmlFor="reply-encrypted"
																		className={`ml-2 block text-sm ${
																			darkMode
																				? "text-gray-300"
																				: "text-gray-700"
																		}`}
																	>
																		Encrypt reply
																	</label>
																</div>
																<div className="flex items-center">
																	<input
																		id="reply-receipt"
																		name="reply-receipt"
																		type="checkbox"
																		className={`focus:ring-brand-500 h-4 w-4 text-brand-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked={replyReadReceipt}
																		onChange={(e) => setReplyReadReceipt(e.target.checked)}
																	/>
																	<label
																		htmlFor="reply-receipt"
																		className={`ml-2 block text-sm ${
																			darkMode
																				? "text-gray-300"
																				: "text-gray-700"
																		}`}
																	>
																		Request read receipt
																	</label>
																</div>
															</div>
															<div className="flex space-x-2">
																<button
																	type="button"
																	onClick={() => setShowReplyBox(false)}
																	className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
																		darkMode
																			? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																			: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																	}`}
																>
																	Cancel
																</button>
																<button
																	type="submit"
																	className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
																>
																	<LucideIcons.Send className="mr-1.5 h-4 w-4" />
																	Send Reply
																</button>
															</div>
														</div>
													</form>
												</div>
											)}

											{/* Forward box */}
											{showForwardBox && (
												<div
													className={`mt-8 border-t pt-6 ${
														darkMode ? "border-gray-700" : "border-gray-200"
													}`}
												>
													<h3
														className={`text-sm font-medium mb-4 ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Forward Email
													</h3>
													<form onSubmit={handleForwardSubmit}>
														<div>
															<label
																htmlFor="forward-to"
																className={`block text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																To
															</label>
															<div className="mt-1">
																<input
																	type="email"
																	id="forward-to"
																	value={forwardRecipient}
																	onChange={(e) =>
																		setForwardRecipient(e.target.value)
																	}
																	className={`shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border rounded-md ${
																		darkMode
																			? "border-gray-600 bg-gray-700 text-white"
																			: "border-gray-300 bg-white text-gray-900"
																	}`}
																	placeholder="recipient@example.com"
																/>
															</div>
														</div>
														<div className="mt-4">
															<label
																htmlFor="forward-message"
																className={`block text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Message
															</label>
															<div className="mt-1">
																<textarea
																	id="forward-message"
																	rows={8}
																	value={forwardMessage}
																	onChange={(e) =>
																		setForwardMessage(e.target.value)
																	}
																	className={`shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border rounded-md font-mono ${
																		darkMode
																			? "border-gray-600 bg-gray-700 text-white"
																			: "border-gray-300 bg-white text-gray-900"
																	}`}
																></textarea>
															</div>
														</div>
														<div className="mt-4 flex justify-between items-center">
															<div className="flex items-center space-x-4">
																<div className="flex items-center">
																	<input
																		id="forward-encrypted"
																		name="forward-encrypted"
																		type="checkbox"
																		className={`focus:ring-brand-500 h-4 w-4 text-brand-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked={encryptForward}
																		onChange={(e) => setEncryptForward(e.target.checked)}
																	/>
																	<label
																		htmlFor="forward-encrypted"
																		className={`ml-2 block text-sm ${
																			darkMode
																				? "text-gray-300"
																				: "text-gray-700"
																		}`}
																	>
																		Encrypt message
																	</label>
																</div>
																<div className="flex items-center">
																	<input
																		id="forward-attachments"
																		name="forward-attachments"
																		type="checkbox"
																		className={`focus:ring-brand-500 h-4 w-4 text-brand-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked={includeAttachments}
																		onChange={(e) => setIncludeAttachments(e.target.checked)}
																	/>
																	<label
																		htmlFor="forward-attachments"
																		className={`ml-2 block text-sm ${
																			darkMode
																				? "text-gray-300"
																				: "text-gray-700"
																		}`}
																	>
																		Include attachments
																	</label>
																</div>
															</div>
															<div className="flex space-x-2">
																<button
																	type="button"
																	onClick={() => setShowForwardBox(false)}
																	className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
																		darkMode
																			? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																			: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																	}`}
																>
																	Cancel
																</button>
																<button
																	type="submit"
																	className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
																>
																	<LucideIcons.Send className="mr-1.5 h-4 w-4" />
																	Forward
																</button>
															</div>
														</div>
													</form>
												</div>
											)}
										</>
									) : (
										/* Locked content */
										<div className="text-center py-16">
											<div
												className={`rounded-full p-6 inline-flex items-center justify-center mb-4 ${
													darkMode
														? "bg-brand-900 bg-opacity-20"
														: "bg-brand-100"
												}`}
											>
												<LucideIcons.Lock
													className={`h-12 w-12 ${
														darkMode ? "text-brand-400" : "text-brand-600"
													}`}
												/>
											</div>
											<h3
												className={`mt-2 text-xl font-bold ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												This message is encrypted
											</h3>
											<p
												className={`mt-2 text-base max-w-md mx-auto ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												Enter the password to decrypt this message and view its
												contents securely.
											</p>
											<div className="mt-6">
												<button
													onClick={() => setShowPasswordModal(true)}
													className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200 transform hover:-translate-y-0.5"
												>
													<LucideIcons.KeySquare className="mr-2 h-5 w-5" />
													Enter Password
												</button>
											</div>
										</div>
									)}
								</div>

								{/* Actions */}
								<div
									className={`px-6 py-4 border-t flex justify-between ${
										darkMode
											? "bg-gray-750 border-gray-700"
											: "bg-gray-50 border-gray-200"
									}`}
								>
									<div>
										<button
											onClick={() => router.push("/dashboard")}
											className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
												darkMode
													? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
													: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
											}`}
										>
											<LucideIcons.ArrowLeft className="mr-1.5 h-5 w-5" />
											Back
										</button>
									</div>
									{isDecrypted && (
										<div className="flex space-x-3">
											<button
												onClick={() => {
													if (showReplyBox) {
														setShowReplyBox(false);
													} else {
														setShowReplyBox(true);
														setShowForwardBox(false);
													}
												}}
												className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
													darkMode
														? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
														: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
												}`}
											>
												<LucideIcons.Reply className="mr-1.5 h-5 w-5" />
												Reply
											</button>
											<button
												onClick={() => {
													if (showForwardBox) {
														setShowForwardBox(false);
													} else {
														setShowForwardBox(true);
														setShowReplyBox(false);
													}
												}}
												className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
											>
												<LucideIcons.Forward className="mr-1.5 h-5 w-5" />
												Forward
											</button>
										</div>
									)}
								</div>
							</div>
						</a.div>
					) : (
						<div
							className={`shadow-lg rounded-lg p-6 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<div className="text-center">
								<LucideIcons.AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
								<h3
									className={`mt-2 text-lg font-medium ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									No email found
								</h3>
								<p
									className={`mt-1 text-sm ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									The email you"re looking for does not exist or has been
									deleted.
								</p>
								<div className="mt-6">
									<button
										onClick={() => router.push("/dashboard")}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
									>
										<LucideIcons.Inbox className="mr-1.5 h-5 w-5" />
										Back to Inbox
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>

			{/* Password modal */}
			<FramerAnimatePresence>
				{showPasswordModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className={`rounded-lg shadow-xl max-w-md w-full p-6 mx-4 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<div className="text-center">
								<div
									className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
										darkMode ? "bg-brand-900" : "bg-brand-100"
									}`}
								>
									<LucideIcons.KeySquare
										className={`h-10 w-10 ${
											darkMode ? "text-brand-400" : "text-brand-600"
										}`}
									/>
								</div>
								<h3
									className={`mt-4 text-xl font-bold ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									Password Required
								</h3>
								<p
									className={`mt-2 text-base ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									This message is protected with a password. Please enter the
									password to view it.
								</p>
								{email?.passwordHint && (
									<div
										className={`mt-4 p-4 rounded-md border ${
											darkMode
												? "bg-yellow-900 bg-opacity-20 border-yellow-800"
												: "bg-yellow-50 border-yellow-100"
										}`}
									>
										<div className="flex">
											<div className="flex-shrink-0">
												<LucideIcons.HelpCircle className="h-5 w-5 text-yellow-400" />
											</div>
											<div className="ml-3 text-left">
												<h3
													className={`text-sm font-medium ${
														darkMode ? "text-yellow-200" : "text-yellow-800"
													}`}
												>
													Password Hint
												</h3>
												<p
													className={`mt-1 text-sm ${
														darkMode ? "text-yellow-300" : "text-yellow-700"
													}`}
												>
													{email.passwordHint}
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
							<form onSubmit={handlePasswordSubmit} className="mt-6">
								<div>
									<label
										htmlFor="password"
										className={`block text-sm font-medium ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Password
									</label>
									<div className="relative mt-1">
										<input
											type={showDecryptPassword ? "text" : "password"}
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Enter password to decrypt"
											className={`w-full px-4 py-3 border rounded-lg pr-12 ${
												darkMode
													? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
													: "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
											} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`}
											autoFocus
										/>
										<button
											type="button"
											onClick={() => setShowDecryptPassword(!showDecryptPassword)}
											className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
												darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
											}`}
										>
											{showDecryptPassword ? (
												<LucideIcons.EyeOff className="h-5 w-5" />
											) : (
												<LucideIcons.Eye className="h-5 w-5" />
											)}
										</button>
									</div>
								</div>
								<div className="mt-6 flex justify-end space-x-3">
									<button
										type="button"
										onClick={() => {
											setShowPasswordModal(false);
										}}
										className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200 ${
											darkMode
												? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
												: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
										}`}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200"
									>
										<LucideIcons.Unlock className="mr-1.5 h-5 w-5" />
										Decrypt Message
									</button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</FramerAnimatePresence>
		</div>
	);
}
