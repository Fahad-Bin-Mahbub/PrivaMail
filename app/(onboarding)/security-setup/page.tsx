"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSpring, animated } from "react-spring";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";
import { TwoFactorStep } from "@/components/onboarding/two-factor-step";
import { EncryptionKeysStep } from "@/components/onboarding/encryption-keys-step";

export default function SecuritySetupPage() {
	const { darkMode } = useTheme();
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	// Spring animation for content
	const contentAnimation = useSpring({
		from: { opacity: 0, transform: "translateY(20px)" },
		to: { opacity: 1, transform: "translateY(0)" },
	});

	// Handle completion of security setup
	const handleComplete = () => {
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			toast.success("Security setup completed successfully!");
			setIsLoading(false);
			router.push("/dashboard");
		}, 1000);
	};

	return (
		<div
			className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
				darkMode ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			<div
				className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-xl ${
					darkMode ? "bg-gray-800" : "bg-white"
				}`}
			>
				{/* Progress bar */}
				<div className="w-full">
					<div className="relative pt-1">
						<div className="flex mb-2 items-center justify-between">
							<div>
								<span
									className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 ${
										darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-200"
									}`}
								>
									Security Setup
								</span>
							</div>
							<div className="text-right">
								<span
									className={`text-xs font-semibold inline-block ${
										darkMode ? "text-indigo-400" : "text-indigo-600"
									}`}
								>
									Step {step} of 2
								</span>
							</div>
						</div>
						<div
							className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${
								darkMode ? "bg-indigo-900" : "bg-indigo-200"
							}`}
						>
							<div
								style={{ width: step === 1 ? "50%" : "100%" }}
								className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
							></div>
						</div>
					</div>
				</div>

				<div>
					<div className="flex justify-center">
						<div className="h-14 w-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
							<LucideIcons.Shield className="h-8 w-8" />
						</div>
					</div>
					<h2
						className={`mt-6 text-center text-3xl font-extrabold ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						{step === 1 ? "Two-Factor Authentication" : "Encryption Keys"}
					</h2>
					<p
						className={`mt-2 text-center text-sm ${
							darkMode ? "text-gray-400" : "text-gray-600"
						}`}
					>
						{step === 1
							? "Secure your account with two-factor authentication"
							: "Manage your encryption keys"}
					</p>
				</div>

				<animated.div style={contentAnimation} className="mt-8">
					{step === 1 && (
						<TwoFactorStep
							onNext={() => setStep(2)}
							onSkip={() => setStep(2)}
						/>
					)}
					{step === 2 && (
						<EncryptionKeysStep
							onComplete={handleComplete}
							isLoading={isLoading}
						/>
					)}
				</animated.div>
			</div>
		</div>
	);
}
