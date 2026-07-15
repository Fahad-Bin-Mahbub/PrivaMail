"use client";

import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface EmailConnectProps {
	onConnect: (provider: "gmail" | "outlook" | "yahoo" | "other") => void;
	onSkip?: () => void;
	isLoading: boolean;
}

export function EmailConnect({ onConnect, onSkip, isLoading }: EmailConnectProps) {
	const { darkMode } = useTheme();

	return (
		<>
			<div>
				<div className="flex justify-center">
					<div
						className={`w-16 h-16 rounded-full flex items-center justify-center ${
							darkMode ? "bg-green-900" : "bg-green-100"
						}`}
					>
						<LucideIcons.CheckCircle
							className={`h-10 w-10 ${
								darkMode ? "text-green-400" : "text-green-600"
							}`}
						/>
					</div>
				</div>
				<h2
					className={`mt-6 text-center text-3xl font-extrabold ${
						darkMode ? "text-white" : "text-gray-900"
					}`}
				>
					Account Created Successfully
				</h2>
				<p
					className={`mt-2 text-center text-sm ${
						darkMode ? "text-gray-400" : "text-gray-600"
					}`}
				>
					Now let's connect your existing email account
				</p>
			</div>

			<div className="mt-8 space-y-4">
				<div className={`p-4 rounded-lg text-sm ${darkMode ? "bg-brand-900/30 text-brand-200 border border-brand-800" : "bg-brand-50 text-brand-800 border border-brand-100"}`}>
					<div className="flex">
						<LucideIcons.Info className="h-5 w-5 mr-3 flex-shrink-0" />
						<p>
							You can connect an existing email account to sync your emails, or skip this step — a PrivaMail account will be created for sending and receiving encrypted emails.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 mt-6">
					<button
						onClick={() => onConnect("gmail")}
						disabled={isLoading}
						className={`flex items-center justify-between py-4 px-4 border rounded-lg shadow-sm transition-colors duration-200 ${
							darkMode
								? "border-gray-600 bg-gray-800 hover:bg-gray-700"
								: "border-gray-300 bg-white hover:bg-gray-50"
						}`}
					>
						<div className="flex items-center">
							<svg
								className="h-6 w-6 mr-4 text-red-500 flex-shrink-0"
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
							<div className="text-left">
								<span className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
									Connect Gmail Account
								</span>
								<span className={`block text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
									Sync your Gmail inbox and send encrypted emails
								</span>
							</div>
						</div>
						<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
					</button>

					<button
						onClick={() => onConnect("outlook")}
						disabled={isLoading}
						className={`flex items-center justify-between py-4 px-4 border rounded-lg shadow-sm transition-colors duration-200 ${
							darkMode
								? "border-gray-600 bg-gray-800 hover:bg-gray-700"
								: "border-gray-300 bg-white hover:bg-gray-50"
						}`}
					>
						<div className="flex items-center">
							<svg
								className="h-6 w-6 mr-4 text-blue-500 flex-shrink-0"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M2 6L10 4V20L2 18V6Z" fill="#0078D4" />
								<path d="M12 4L22 2V22L12 20V4Z" fill="#0078D4" />
							</svg>
							<div className="text-left">
								<span className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
									Connect Outlook Account
								</span>
								<span className={`block text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
									Sync your Outlook or Hotmail inbox
								</span>
							</div>
						</div>
						<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
					</button>

					<button
						onClick={() => onConnect("yahoo")}
						disabled={isLoading}
						className={`flex items-center justify-between py-4 px-4 border rounded-lg shadow-sm transition-colors duration-200 ${
							darkMode
								? "border-gray-600 bg-gray-800 hover:bg-gray-700"
								: "border-gray-300 bg-white hover:bg-gray-50"
						}`}
					>
						<div className="flex items-center">
							<svg
								className="h-6 w-6 mr-4 text-accent-600 flex-shrink-0"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M19.828 7.242H16.3V3h-3.194v4.242h-3.523v3.872h3.523v12.244h3.194V11.114h3.528v-3.872z"
									fill="#6001D2"
								/>
							</svg>
							<div className="text-left">
								<span className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
									Connect Yahoo Account
								</span>
								<span className={`block text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
									Sync your Yahoo Mail inbox
								</span>
							</div>
						</div>
						<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
					</button>

					<button
						onClick={() => onConnect("other")}
						disabled={isLoading}
						className={`flex items-center justify-between py-4 px-4 border rounded-lg shadow-sm transition-colors duration-200 ${
							darkMode
								? "border-gray-600 bg-gray-800 hover:bg-gray-700"
								: "border-gray-300 bg-white hover:bg-gray-50"
						}`}
					>
						<div className="flex items-center">
							<LucideIcons.Mail className="h-6 w-6 mr-4 text-gray-400 flex-shrink-0" />
							<div className="text-left">
								<span className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
									Connect Other Provider
								</span>
								<span className={`block text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
									Connect by entering your email settings manually
								</span>
							</div>
						</div>
						<LucideIcons.ArrowRight className="h-5 w-5 text-gray-400" />
					</button>
				</div>
				
				{onSkip && (
					<div className="mt-6 text-center">
						<button
							onClick={onSkip}
							disabled={isLoading}
							className={`w-full py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-colors duration-200 ${
								darkMode
									? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
									: "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
							}`}
						>
							Skip — I'll use PrivaMail only
						</button>
						<p className={`mt-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
							You can always connect an email account later from Settings
						</p>
					</div>
				)}
			</div>
		</>
	);
}
