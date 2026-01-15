"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TwoFactorStepProps {
	onNext: () => void;
	onSkip: () => void;
}

export function TwoFactorStep({ onNext, onSkip }: TwoFactorStepProps) {
	const { darkMode } = useTheme();
	const [backupCodesVisible, setBackupCodesVisible] = useState(false);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

	// Generate QR code URL (in a real app, this would be a real QR code)
	const twoFactorQrCode =
		"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PrivaMail:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=PrivaMail";

	// Backup codes
	const backupCodes = [
		"ABCD-EFGH-IJKL",
		"MNOP-QRST-UVWX",
		"1234-5678-9012",
		"3456-7890-1234",
		"WXYZ-ABCD-EFGH",
		"5678-9012-3456",
		"IJKL-MNOP-QRST",
		"7890-1234-5678",
	];

	// Copy backup codes to clipboard
	const copyBackupCodes = async () => {
		try {
			const codesText = backupCodes.join("\n");
			await navigator.clipboard.writeText(codesText);
			toast.success("Backup codes copied to clipboard!");
		} catch (error) {
			console.error("Copy backup codes error:", error);
			toast.error("Failed to copy backup codes. Please copy them manually.");
		}
	};

	return (
		<div className="space-y-6">
			<div
				className={`p-5 rounded-lg border ${
					darkMode
						? "bg-indigo-900 bg-opacity-20 border-indigo-800"
						: "bg-indigo-50 border-indigo-100"
				}`}
			>
				<div className="flex">
					<div className="flex-shrink-0">
						<LucideIcons.Info
							className={`h-5 w-5 ${
								darkMode ? "text-indigo-400" : "text-indigo-600"
							}`}
						/>
					</div>
					<div className="ml-3">
						<h3
							className={`text-sm font-medium ${
								darkMode ? "text-indigo-200" : "text-indigo-800"
							}`}
						>
							Why use two-factor authentication?
						</h3>
						<p
							className={`mt-2 text-sm ${
								darkMode ? "text-indigo-300" : "text-indigo-700"
							}`}
						>
							Two-factor authentication adds an extra layer of security to your
							account. Even if someone discovers your password, they won't be
							able to access your encrypted emails without the second factor.
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col items-center space-y-6">
				<div
					className={`p-3 rounded-lg shadow-md ${
						darkMode ? "bg-gray-700" : "bg-white"
					}`}
				>
					<img
						src={twoFactorQrCode}
						alt="Two-factor authentication QR code"
						className="h-48 w-48 rounded-lg"
					/>
				</div>
				<div className="text-center">
					<p
						className={`text-sm mb-2 ${
							darkMode ? "text-gray-400" : "text-gray-600"
						}`}
					>
						Scan this QR code with your authenticator app (like Google
						Authenticator, Authy, or Microsoft Authenticator).
					</p>
					<p
						className={`text-sm font-medium ${
							darkMode ? "text-gray-300" : "text-gray-700"
						}`}
					>
						Or enter this code manually:{" "}
						<span
							className={`font-mono px-2 py-1 rounded ${
								darkMode ? "bg-gray-800" : "bg-gray-100"
							}`}
						>
							JBSWY3DPEHPK3PXP
						</span>
					</p>
				</div>

				{/* Backup codes section */}
				<div className="w-full">
					<div
						className={`border-t pt-4 w-full ${
							darkMode ? "border-gray-700" : "border-gray-200"
						}`}
					>
						<button
							onClick={() => setBackupCodesVisible(!backupCodesVisible)}
							className={`flex items-center justify-between w-full text-left text-sm font-medium transition-colors duration-200 ${
								darkMode
									? "text-indigo-400 hover:text-indigo-200"
									: "text-indigo-600 hover:text-indigo-800"
							}`}
						>
							<span>View backup codes</span>
							{backupCodesVisible ? (
								<LucideIcons.ChevronUp className="h-5 w-5" />
							) : (
								<LucideIcons.ChevronDown className="h-5 w-5" />
							)}
						</button>

						{backupCodesVisible && (
							<div
								className={`mt-4 p-4 rounded-lg border ${
									darkMode
										? "bg-gray-750 border-gray-700"
										: "bg-gray-50 border-gray-200"
								}`}
							>
								<div className="mb-2 flex justify-between items-center">
									<h4
										className={`text-sm font-medium ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Recovery Codes
									</h4>
									<button
										onClick={copyBackupCodes}
										className={`text-xs flex items-center transition-colors duration-200 ${
											darkMode
												? "text-indigo-400 hover:text-indigo-200"
												: "text-indigo-600 hover:text-indigo-800"
										}`}
									>
										<LucideIcons.Copy className="h-3 w-3 mr-1" />
										Copy All
									</button>
								</div>
								<p
									className={`text-xs mb-3 ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									Save these codes in a secure location. Each code can only be
									used once.
								</p>
								<div className="grid grid-cols-2 gap-2">
									{backupCodes.map((code, index) => (
										<div
											key={index}
											className={`font-mono text-xs p-2 rounded border text-center ${
												darkMode
													? "bg-gray-700 border-gray-600"
													: "bg-white border-gray-200"
											}`}
										>
											{code}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="flex items-center">
					<div className="flex items-center h-5">
						<input
							id="enable-2fa"
							name="enable-2fa"
							type="checkbox"
							checked={twoFactorEnabled}
							onChange={(e) => setTwoFactorEnabled(e.target.checked)}
							className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded ${
								darkMode ? "border-gray-600" : "border-gray-300"
							}`}
						/>
					</div>
					<div className="ml-3 text-sm">
						<label
							htmlFor="enable-2fa"
							className={`font-medium ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Enable two-factor authentication
						</label>
						<p className={darkMode ? "text-gray-400" : "text-gray-500"}>
							I have saved my recovery codes
						</p>
					</div>
				</div>
			</div>

			<div
				className={`flex justify-between mt-6 pt-6 border-t ${
					darkMode ? "border-gray-700" : "border-gray-200"
				}`}
			>
				<button
					onClick={onSkip}
					className={`text-sm font-medium transition-colors duration-200 flex items-center ${
						darkMode
							? "text-indigo-400 hover:text-indigo-300"
							: "text-indigo-600 hover:text-indigo-500"
					}`}
				>
					<LucideIcons.ArrowLeft className="mr-1 h-4 w-4" />
					Skip for now
				</button>
				<button
					onClick={onNext}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
				>
					Next
					<LucideIcons.ArrowRight className="ml-2 h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
