"use client";

import { useTheme } from "@/components/providers/theme-provider";
import * as LucideIcons from "lucide-react";

interface SocialLoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	provider: "google" | "facebook" | null;
	step: number;
}

export function SocialLoginModal({
	isOpen,
	onClose,
	provider,
	step,
}: SocialLoginModalProps) {
	const { darkMode } = useTheme();

	if (!isOpen || !provider) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className={`relative max-w-md w-full rounded-2xl shadow-2xl border p-8 ${
					darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
				}`}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
				>
					<LucideIcons.X className="h-5 w-5" />
				</button>

				{/* Modal content */}
				<div className="text-center">
					{/* Provider icon */}
					<div className="flex justify-center mb-6">
						<div
							className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg ${
								provider === "google"
									? "bg-gradient-to-br from-blue-500 to-red-500"
									: "bg-gradient-to-br from-blue-600 to-blue-700"
							}`}
						>
							{provider === "google" ? (
								<svg className="h-8 w-8" viewBox="0 0 24 24">
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="white"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="white"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="white"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="white"
									/>
								</svg>
							) : (
								<svg className="h-8 w-8" fill="white" viewBox="0 0 24 24">
									<path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
								</svg>
							)}
						</div>
					</div>

					{/* Title */}
					<h3
						className={`text-xl font-bold mb-2 ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						{provider === "google"
							? "Connecting to Google"
							: "Connecting to Facebook"}
					</h3>

					<p
						className={`text-sm mb-6 ${
							darkMode ? "text-gray-400" : "text-gray-600"
						}`}
					>
						Please wait while we securely authenticate your account
					</p>

					{/* Progress steps */}
					<div className="space-y-4">
						{[
							`Redirecting to ${
								provider === "google" ? "Google" : "Facebook"
							}`,
							`Authenticating with ${
								provider === "google" ? "Google" : "Facebook"
							}`,
							"Verifying permissions",
							"Creating secure session",
						].map((stepText, index) => (
							<div key={index} className="flex items-center space-x-3">
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center ${
										index <= step
											? "bg-green-500 text-white"
											: index === step + 1
											? "bg-indigo-500 text-white animate-pulse"
											: darkMode
											? "bg-gray-700 text-gray-400"
											: "bg-gray-200 text-gray-500"
									}`}
								>
									{index < step ? (
										<LucideIcons.Check className="h-4 w-4" />
									) : index === step ? (
										<div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
									) : (
										<span className="text-sm font-medium">{index + 1}</span>
									)}
								</div>
								<span
									className={`text-sm ${
										index <= step
											? darkMode
												? "text-green-400"
												: "text-green-600"
											: index === step
											? darkMode
												? "text-indigo-400"
												: "text-indigo-600"
											: darkMode
											? "text-gray-500"
											: "text-gray-400"
									}`}
								>
									{stepText}
								</span>
							</div>
						))}
					</div>

					{/* Loading bar */}
					<div
						className={`mt-6 w-full bg-gray-200 rounded-full h-2 ${
							darkMode ? "bg-gray-700" : "bg-gray-200"
						}`}
					>
						<div
							className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700"
							style={{ width: `${((step + 1) / 4) * 100}%` }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}
