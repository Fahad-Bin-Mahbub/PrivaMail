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
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [isLoadingEmail, setIsLoadingEmail] = useState(true);
	const [showEncryptedContent, setShowEncryptedContent] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [showReplyBox, setShowReplyBox] = useState(false);
	const [replyMessage, setReplyMessage] = useState("");
	const [showForwardBox, setShowForwardBox] = useState(false);
	const [forwardRecipient, setForwardRecipient] = useState("");
	const [forwardMessage, setForwardMessage] = useState("");

	// Animation for email view (using react-spring)
	const emailViewAnimation = useReactSpring({
		from: { opacity: 0, transform: "translateY(20px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		config: { tension: 280, friction: 24 },
	});

	// Fetch email data
	useEffect(() => {
		// Simulate API call to fetch email
		setTimeout(() => {
			// This is mock data, in a real app, you'd fetch from an API
            // In a real refactor, we should probably fetch from `db` in `mock-db.ts`
            // But preserving the hardcoded mock data for now to ensure we match the implementation.
            // Actually, querying the `db` would be better if we seeded it correctly.
            // Let's try to fetch from `db` first, if not found, use fallback?
            // The original code had hardcoded mockEmail inside the useEffect.
            
            // I will use the hardcoded email from the original file to guarantee fidelity as requested.
			const mockEmail: Email = {
				id: id as string || "1",
				from: "john.doe@example.com",
				to: [user?.email || "you@example.com"],
				subject: "Welcome to PrivaMail!",
				body: "Thank you for joining PrivaMail. We are excited to have you on board. This is a secure platform for all your email communication needs.\n\nWith PrivaMail, you can send end-to-end encrypted emails to anyone, even if they don't use our service. Your data is protected with military-grade encryption, ensuring that only you and your intended recipients can read your messages.\n\nSome key features include:\n- End-to-end encryption\n- Self-destructing messages\n- Password protection\n- Encrypted attachments\n\nIf you have any questions, feel free to reply to this email or contact our support team.\n\nBest regards,\nThe PrivaMail Team",
				attachments: [
					{
						id: "att1",
						name: "getting-started.pdf",
						type: "application/pdf",
						size: 2500000,
						url: "#",
						isEncrypted: true,
					},
				],
				isEncrypted: true,
				encryptionLevel: "high",
				timestamp: new Date(Date.now() - 3600000), // 1 hour ago
				read: true,
				starred: true,
				folder: "inbox",
				expiresAt: new Date(Date.now() + 604800000), // 7 days from now
				readReceipt: true,
				passwordProtected: true,
				passwordHint: "The name of our service (lowercase)",
				labels: ["2"],
			};

			setEmail(mockEmail);
			setIsLoadingEmail(false);

			// If email is password protected, show password modal
			if (mockEmail.passwordProtected) {
				setShowPasswordModal(true);
			} else {
				setIsDecrypted(true);
			}

			// Prepare forward message
			setForwardMessage(
				`\n\n---------- Forwarded message ----------\nFrom: ${
					mockEmail.from
				}\nDate: ${mockEmail.timestamp.toLocaleString()}\nSubject: ${
					mockEmail.subject
				}\nTo: ${mockEmail.to.join(", ")}\n\n${mockEmail.body}`
			);
		}, 1000);
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
			className={`min-h-screen flex flex-col ${
				darkMode ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			{/* Header */}
			<header className={`shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
					<div className="flex items-center">
						<button
							onClick={() => router.push("/dashboard")}
							className={`inline-flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200 ${
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
									darkMode ? "text-indigo-400" : "text-indigo-600"
								}`}
							/>
							View Email
						</span>
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={() => router.push("/dashboard")}
							className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
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
			<main className="flex-1 py-6">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{isLoadingEmail ? (
						<div
							className={`shadow-lg rounded-lg p-6 flex justify-center items-center h-96 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<div className="text-center">
								<div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
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
											<div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white uppercase shadow-sm">
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
												{isDecrypted ? "Decrypted" : "Encrypted"}
											</span>
										)}
										{email.encryptionLevel === "high" && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													darkMode
														? "bg-indigo-900 text-indigo-200"
														: "bg-indigo-100 text-indigo-800"
												}`}
											>
												<LucideIcons.Shield className="mr-1 h-3 w-3" />
												High Encryption
											</span>
										)}
										{email.passwordProtected && (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													darkMode
														? "bg-purple-900 text-purple-200"
														: "bg-purple-100 text-purple-800"
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
													className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
														darkMode
															? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
															: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
													}`}
												>
													{showEncryptedContent ? (
														<>
															<LucideIcons.EyeOff className="mr-1.5 h-4 w-4" />
															Hide Encrypted Version
														</>
													) : (
														<>
															<LucideIcons.Eye className="mr-1.5 h-4 w-4" />
															View Encrypted Version
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
																? "AES-256 + ChaCha20"
																: "AES-256"}
														</span>
													</div>
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
																		darkMode ? "bg-indigo-900" : "bg-indigo-100"
																	}`}
																>
																	<LucideIcons.FileText
																		className={`h-6 w-6 ${
																			darkMode
																				? "text-indigo-400"
																				: "text-indigo-600"
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
																				className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
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
																className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
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
																		className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked
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
																		className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
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
																	className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																		darkMode
																			? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																			: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																	}`}
																>
																	Cancel
																</button>
																<button
																	type="submit"
																	className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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
																	className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
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
																	className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md font-mono ${
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
																		className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked
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
																		className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded ${
																			darkMode
																				? "border-gray-600"
																				: "border-gray-300"
																		}`}
																		checked
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
																	className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																		darkMode
																			? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																			: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																	}`}
																>
																	Cancel
																</button>
																<button
																	type="submit"
																	className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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
														? "bg-indigo-900 bg-opacity-20"
														: "bg-indigo-100"
												}`}
											>
												<LucideIcons.Lock
													className={`h-12 w-12 ${
														darkMode ? "text-indigo-400" : "text-indigo-600"
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
													className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
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
											className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
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
												className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
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
												className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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
										darkMode ? "bg-indigo-900" : "bg-indigo-100"
									}`}
								>
									<LucideIcons.KeySquare
										className={`h-10 w-10 ${
											darkMode ? "text-indigo-400" : "text-indigo-600"
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
									<div className="mt-1 relative rounded-md shadow-sm">
										<input
											type="password"
											id="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md pr-10 ${
												darkMode
													? "border-gray-600 bg-gray-700 text-white"
													: "border-gray-300 bg-white text-gray-900"
											}`}
											placeholder="Enter password"
											autoFocus
										/>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
											<LucideIcons.KeySquare className="h-5 w-5 text-gray-400" />
										</div>
									</div>
								</div>
								<div className="mt-6 flex justify-end space-x-3">
									<button
										type="button"
										onClick={() => router.push("/dashboard")}
										className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
											darkMode
												? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
												: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
										}`}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
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
