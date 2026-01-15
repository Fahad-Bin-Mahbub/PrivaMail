"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface DeleteAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function DeleteAccountModal({
	isOpen,
	onClose,
	onConfirm,
}: DeleteAccountModalProps) {
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
						<div className="text-center">
							<div
								className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
									darkMode ? "bg-red-900" : "bg-red-100"
								}`}
							>
								<LucideIcons.AlertOctagon
									className={`h-10 w-10 ${
										darkMode ? "text-red-400" : "text-red-600"
									}`}
								/>
							</div>
							<h3
								className={`mt-4 text-xl font-bold ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Delete Account
							</h3>
							<p
								className={`mt-2 text-base ${
									darkMode ? "text-gray-400" : "text-gray-500"
								}`}
							>
								Are you sure you want to delete your account? This action is
								permanent and all of your data will be erased.
							</p>
							<div
								className={`mt-6 p-4 rounded-md border text-left ${
									darkMode
										? "bg-red-900 bg-opacity-20 border-red-800"
										: "bg-red-50 border-red-100"
								}`}
							>
								<div className="flex">
									<div className="flex-shrink-0">
										<LucideIcons.AlertTriangle className="h-5 w-5 text-red-400" />
									</div>
									<div className="ml-3">
										<h3
											className={`text-sm font-medium ${
												darkMode ? "text-red-200" : "text-red-800"
											}`}
										>
											Warning
										</h3>
										<div
											className={`mt-2 text-sm ${
												darkMode ? "text-red-300" : "text-red-700"
											}`}
										>
											<ul className="list-disc pl-5 space-y-1">
												<li>
													All your encrypted emails will be permanently deleted
												</li>
												<li>
													Your encryption keys will be permanently destroyed
												</li>
												<li>Connected email accounts will be disconnected</li>
												<li>This action cannot be undone</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between">
							<button
								type="button"
								onClick={onClose}
								className={`mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
									darkMode
										? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
										: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
								}`}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={onConfirm}
								className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
							>
								<LucideIcons.Trash2 className="mr-1.5 h-4 w-4" />
								Permanently Delete Account
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
