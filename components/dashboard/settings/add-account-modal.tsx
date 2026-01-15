"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface AddAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (provider: string) => void;
}

export function AddAccountModal({
	isOpen,
	onClose,
	onAdd,
}: AddAccountModalProps) {
	const { darkMode } = useTheme();

	return (
		<AnimatePresence>
			{isOpen && (
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
						<div>
							<div className="flex justify-between items-center">
								<h3
									className={`text-lg font-medium ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									Connect Email Account
								</h3>
								<button
									type="button"
									onClick={onClose}
									className={`rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
										darkMode
											? "bg-gray-800 text-gray-400 hover:text-gray-300"
											: "bg-white text-gray-400 hover:text-gray-500"
									}`}
								>
									<span className="sr-only">Close</span>
									<LucideIcons.X className="h-6 w-6" />
								</button>
							</div>
							<p
								className={`mt-2 text-sm ${
									darkMode ? "text-gray-400" : "text-gray-500"
								}`}
							>
								Connect your existing email accounts to send and receive encrypted
								emails through PrivaMail.
							</p>

							<div className="mt-6 space-y-4">
								<button
									onClick={() => onAdd("Gmail")}
									className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors duration-200 ${
										darkMode
											? "border-gray-600 hover:bg-gray-700"
											: "border-gray-300 hover:bg-gray-50"
									}`}
								>
									<div className="flex items-center">
										<div
											className={`h-10 w-10 flex items-center justify-center rounded-full ${
												darkMode ? "bg-red-900" : "bg-red-100"
											}`}
										>
											<svg
												className={`h-6 w-6 ${
													darkMode ? "text-red-400" : "text-red-600"
												}`}
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
										</div>
										<div className="ml-4">
											<h4
												className={`text-sm font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Connect Gmail
											</h4>
											<p
												className={`text-xs ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												Secure your Gmail messages with end-to-end encryption
											</p>
										</div>
									</div>
									<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
								</button>

								{/* Outlook */}
								<button
									onClick={() => onAdd("Outlook")}
									className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors duration-200 ${
										darkMode
											? "border-gray-600 hover:bg-gray-700"
											: "border-gray-300 hover:bg-gray-50"
									}`}
								>
									<div className="flex items-center">
										<div
											className={`h-10 w-10 flex items-center justify-center rounded-full ${
												darkMode ? "bg-blue-900" : "bg-blue-100"
											}`}
										>
											<svg
												className={`h-6 w-6 ${
													darkMode ? "text-blue-400" : "text-blue-600"
												}`}
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path d="M2 6L10 4V20L2 18V6Z" fill="#0078D4" />
												<path d="M12 4L22 2V22L12 20V4Z" fill="#0078D4" />
											</svg>
										</div>
										<div className="ml-4">
											<h4
												className={`text-sm font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Connect Outlook
											</h4>
											<p
												className={`text-xs ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												Secure your Outlook messages with end-to-end encryption
											</p>
										</div>
									</div>
									<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
								</button>

								{/* Yahoo */}
								<button
									onClick={() => onAdd("Yahoo")}
									className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors duration-200 ${
										darkMode
											? "border-gray-600 hover:bg-gray-700"
											: "border-gray-300 hover:bg-gray-50"
									}`}
								>
									<div className="flex items-center">
										<div
											className={`h-10 w-10 flex items-center justify-center rounded-full ${
												darkMode ? "bg-purple-900" : "bg-purple-100"
											}`}
										>
											<svg
												className={`h-6 w-6 ${
													darkMode ? "text-purple-400" : "text-purple-600"
												}`}
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path
													d="M19.828 7.242H16.3V3h-3.194v4.242h-3.523v3.872h3.523v12.244h3.194V11.114h3.528v-3.872z"
													fill="#6001D2"
												/>
											</svg>
										</div>
										<div className="ml-4">
											<h4
												className={`text-sm font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Connect Yahoo Mail
											</h4>
											<p
												className={`text-xs ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												Secure your Yahoo messages with end-to-end encryption
											</p>
										</div>
									</div>
									<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
								</button>

								{/* Other Provider */}
								<button
									onClick={() => onAdd("Other Provider")}
									className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors duration-200 ${
										darkMode
											? "border-gray-600 hover:bg-gray-700"
											: "border-gray-300 hover:bg-gray-50"
									}`}
								>
									<div className="flex items-center">
										<div
											className={`h-10 w-10 flex items-center justify-center rounded-full ${
												darkMode ? "bg-gray-700" : "bg-gray-100"
											}`}
										>
											<LucideIcons.Mail
												className={`h-6 w-6 ${
													darkMode ? "text-gray-400" : "text-gray-600"
												}`}
											/>
										</div>
										<div className="ml-4">
											<h4
												className={`text-sm font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Connect Other Email
											</h4>
											<p
												className={`text-xs ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												Connect any other email provider via IMAP/SMTP
											</p>
										</div>
									</div>
									<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
								</button>
							</div>

							<div className="mt-6 flex justify-end">
								<button
									type="button"
									onClick={onClose}
									className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
										darkMode
											? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
											: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
									}`}
								>
									Cancel
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
