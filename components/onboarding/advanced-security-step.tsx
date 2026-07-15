"use client";

import { useState, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import toast from "react-hot-toast";

interface AdvancedSecurityStepProps {
	onNext: () => void;
	onSkip: () => void;
}

export function AdvancedSecurityStep({ onNext, onSkip }: AdvancedSecurityStepProps) {
	const { darkMode } = useTheme();
	const [expandedSection, setExpandedSection] = useState<"2fa" | "recovery" | "score">("2fa");

	// 2FA state
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

	// Recovery state
	const [recoveryEmail, setRecoveryEmail] = useState("");
	const [recoveryPhone, setRecoveryPhone] = useState("");
	const [emailVerified, setEmailVerified] = useState(false);
	const [phoneVerified, setPhoneVerified] = useState(false);

	const twoFactorQrCode =
		"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PrivaMail:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=PrivaMail";

	const backupCodes = [
		"ABCD-EFGH-IJKL", "MNOP-QRST-UVWX", "1234-5678-9012", "3456-7890-1234",
		"WXYZ-ABCD-EFGH", "5678-9012-3456", "IJKL-MNOP-QRST", "7890-1234-5678",
	];

	const handleOtpChange = (index: number, value: string) => {
		if (value && !/^\d$/.test(value)) return;
		if (value.length > 1) value = value.slice(0, 1);
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < 5) {
			otpRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			otpRefs.current[index - 1]?.focus();
		}
	};

	const verifyOtp = () => {
		const code = otp.join("");
		if (code.length === 6) {
			// Mock success check
			setTwoFactorEnabled(true);
			toast.success("2FA Enabled successfully!");
		} else {
			toast.error("Please enter a 6-digit code.");
		}
	};

	const verifyEmail = () => {
		if (recoveryEmail.includes("@")) {
			setEmailVerified(true);
			toast.success("Recovery email saved!");
		} else {
			toast.error("Please enter a valid email.");
		}
	};

	const verifyPhone = () => {
		if (recoveryPhone.length > 5) {
			setPhoneVerified(true);
			toast.success("Recovery phone verified!");
		} else {
			toast.error("Please enter a valid phone number.");
		}
	};

	// Calculate security score
	let score = 2; // Base score (Strong password + Email account created)
	if (twoFactorEnabled) score++;
	if (emailVerified) score++;
	if (phoneVerified) score++;

	return (
		<div className="space-y-4">
			<div className="text-center mb-6">
				<h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Advanced Security</h2>
				<p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
					Protect your account against unauthorized access.
				</p>
			</div>

			{/* Section 1: 2FA */}
			<div className={`border rounded-lg overflow-hidden ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
				<button 
					onClick={() => setExpandedSection(expandedSection === "2fa" ? "" as any : "2fa")}
					className={`w-full px-4 py-3 flex items-center justify-between text-left ${darkMode ? "hover:bg-gray-750" : "hover:bg-gray-50"}`}
				>
					<div className="flex items-center">
						<LucideIcons.Shield className={`h-5 w-5 mr-3 ${twoFactorEnabled ? "text-green-500" : darkMode ? "text-gray-400" : "text-gray-500"}`} />
						<span className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
							Extra Login Protection (2FA)
						</span>
					</div>
					<div className="flex items-center">
						{twoFactorEnabled && <span className="text-xs text-green-500 font-medium mr-3 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Enabled</span>}
						{expandedSection === "2fa" ? <LucideIcons.ChevronUp className="h-4 w-4" /> : <LucideIcons.ChevronDown className="h-4 w-4" />}
					</div>
				</button>
				
				{expandedSection === "2fa" && (
					<div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
						{twoFactorEnabled ? (
							<div className="flex items-center text-green-500 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
								<LucideIcons.CheckCircle className="h-6 w-6 mr-3" />
								<div>
									<p className="font-medium text-green-800 dark:text-green-300">2FA Enabled!</p>
									<p className="text-sm text-green-700 dark:text-green-400">Your account is secured with an authenticator app.</p>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className={`p-4 rounded-lg text-sm ${darkMode ? "bg-brand-900/20 text-brand-200" : "bg-brand-50 text-brand-800"}`}>
									<p className="font-bold mb-2 flex items-center"><LucideIcons.Smartphone className="h-4 w-4 mr-2"/>What is an Authenticator App?</p>
									<p className="mb-4">An authenticator app generates a temporary 6-digit code that changes every 30 seconds. This code is required alongside your password when logging in, making your account much more secure.</p>
									
									<p className="font-bold mb-2">📥 Step 1: Download an Authenticator App</p>
									<ul className="list-disc pl-5 mb-4 space-y-1">
										<li>Google Authenticator</li>
										<li>Microsoft Authenticator</li>
										<li>Authy (Recommended for beginners)</li>
									</ul>
									
									<p className="font-bold mb-2">📷 Step 2: Open the App and Scan the QR Code</p>
									<p>Point your phone's camera at the QR code below.</p>
								</div>
								
								<div className="flex flex-col items-center justify-center p-4">
									<div className={`p-2 rounded-lg bg-white`}>
										<img src={twoFactorQrCode} alt="QR Code" className="h-40 w-40" />
									</div>
									<div className={`mt-4 w-full p-3 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
										<p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
											Can't scan the QR code? Enter this code manually:
										</p>
										<code className={`block mt-1 text-lg font-mono font-bold tracking-wider ${darkMode ? "text-brand-400" : "text-brand-600"}`}>
											JBSWY3DPEHPK3PXP
										</code>
										<p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
											In your authenticator app, tap "+" or "Add account" → choose "Enter manually" → paste or type this code.
										</p>
									</div>
								</div>

								<div className="flex flex-col justify-center items-center">
									<p className={`font-bold text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>🔢 Step 3: Enter the 6-Digit Code</p>
									<p className={`text-xs mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Enter the 6-digit code from your app to verify setup:</p>
									
									<div className="flex items-center space-x-2 mb-4">
										{otp.map((digit, index) => (
											<input
												key={index}
												ref={el => { otpRefs.current[index] = el; }}
												type="text"
												inputMode="numeric"
												pattern="[0-9]*"
												maxLength={1}
												value={digit}
												onChange={e => handleOtpChange(index, e.target.value)}
												onKeyDown={e => handleOtpKeyDown(index, e)}
												className={`w-10 h-12 text-center text-xl font-bold rounded-md border ${
													darkMode 
														? "bg-gray-900 border-gray-600 text-white focus:border-brand-500" 
														: "bg-white border-gray-300 text-gray-900 focus:border-brand-500"
												} focus:ring-1 focus:ring-brand-500 outline-none`}
											/>
										))}
									</div>
									<button 
										onClick={verifyOtp}
										className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-md transition-colors"
									>
										Verify Code
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Section 2: Recovery */}
			<div className={`border rounded-lg overflow-hidden ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
				<button 
					onClick={() => setExpandedSection(expandedSection === "recovery" ? "" as any : "recovery")}
					className={`w-full px-4 py-3 flex items-center justify-between text-left ${darkMode ? "hover:bg-gray-750" : "hover:bg-gray-50"}`}
				>
					<div className="flex items-center">
						<LucideIcons.MailWarning className={`h-5 w-5 mr-3 ${emailVerified || phoneVerified ? "text-green-500" : darkMode ? "text-gray-400" : "text-gray-500"}`} />
						<span className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
							Recovery Options
						</span>
					</div>
					<div className="flex items-center">
						{expandedSection === "recovery" ? <LucideIcons.ChevronUp className="h-4 w-4" /> : <LucideIcons.ChevronDown className="h-4 w-4" />}
					</div>
				</button>
				
				{expandedSection === "recovery" && (
					<div className={`p-4 border-t space-y-6 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
						<div>
							<label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
								Recovery Email Address
							</label>
							<p className={`text-xs mt-1 mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
								If you forget your password, we'll send a recovery link to this email. Use a different email than your PrivaMail address.
							</p>
							<div className="flex mt-1">
								<input 
									type="email" 
									placeholder="your-other-email@example.com"
									value={recoveryEmail}
									onChange={(e) => setRecoveryEmail(e.target.value)}
									disabled={emailVerified}
									className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border sm:text-sm ${
										darkMode 
											? "bg-gray-900 border-gray-600 text-white" 
											: "bg-white border-gray-300 text-gray-900"
									}`}
								/>
								<button 
									onClick={verifyEmail}
									disabled={emailVerified || !recoveryEmail}
									className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md ${
										emailVerified 
											? "bg-green-600 text-white" 
											: "bg-brand-600 hover:bg-brand-700 text-white"
									}`}
								>
									{emailVerified ? "Saved" : "Save"}
								</button>
							</div>
						</div>

						<div>
							<label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
								Recovery Phone Number (Optional)
							</label>
							<p className={`text-xs mt-1 mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
								Add a phone number as an additional recovery option. We'll send a verification code via SMS.
							</p>
							<div className="flex mt-1">
								<input 
									type="tel" 
									placeholder="+1 (555) 123-4567"
									value={recoveryPhone}
									onChange={(e) => setRecoveryPhone(e.target.value)}
									disabled={phoneVerified}
									className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border sm:text-sm ${
										darkMode 
											? "bg-gray-900 border-gray-600 text-white" 
											: "bg-white border-gray-300 text-gray-900"
									}`}
								/>
								<button 
									onClick={verifyPhone}
									disabled={phoneVerified || !recoveryPhone}
									className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md ${
										phoneVerified 
											? "bg-green-600 text-white" 
											: "bg-gray-600 hover:bg-gray-700 text-white"
									}`}
								>
									{phoneVerified ? "Verified" : "Verify"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Section 3: Security Summary */}
			<div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
				<h3 className={`font-medium mb-3 flex items-center ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
					🛡️ Your Security Score: {score}/5
				</h3>
				<div className="space-y-2 text-sm">
					<div className="flex items-center"><LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Strong password</div>
					<div className="flex items-center"><LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Email account created</div>
					<div className="flex items-center">
						{twoFactorEnabled ? <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mr-2"/> : <div className="h-4 w-4 border-2 border-gray-300 dark:border-gray-600 rounded-sm mr-2"/>} 
						Two-factor authentication
					</div>
					<div className="flex items-center">
						{emailVerified ? <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mr-2"/> : <div className="h-4 w-4 border-2 border-gray-300 dark:border-gray-600 rounded-sm mr-2"/>} 
						Recovery email
					</div>
					<div className="flex items-center">
						{phoneVerified ? <LucideIcons.CheckCircle className="h-4 w-4 text-green-500 mr-2"/> : <div className="h-4 w-4 border-2 border-gray-300 dark:border-gray-600 rounded-sm mr-2"/>} 
						Recovery phone
					</div>
				</div>
				{score < 5 && (
					<p className={`mt-3 text-xs italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
						💡 Enable all options for maximum account protection.
					</p>
				)}
			</div>

			<div className={`flex justify-between pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
				<button
					onClick={onSkip}
					className={`text-sm font-medium transition-colors duration-200 ${
						darkMode ? "text-brand-400 hover:text-brand-300" : "text-brand-600 hover:text-brand-500"
					}`}
				>
					Skip for now
				</button>
				<button
					onClick={onNext}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
				>
					Continue
					<LucideIcons.ArrowRight className="ml-2 h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
