"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSpring, animated } from "react-spring";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { User } from "@/lib/types";
import { RegisterForm } from "@/components/auth/register-form";
import { EmailConnect } from "@/components/auth/email-connect";
import { SocialLoginModal } from "@/components/auth/social-login-modal";
import { AdvancedSecurityStep } from "@/components/onboarding/advanced-security-step";
import { EncryptionKeysStep } from "@/components/onboarding/encryption-keys-step";

export default function RegisterPage() {
	const { darkMode } = useTheme();
	const { login } = useAuth();
	const router = useRouter();

	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [showSocialModal, setShowSocialModal] = useState(false);
	const [selectedProvider, setSelectedProvider] = useState<
		"google" | "facebook" | null
	>(null);
	const [socialStep, setSocialStep] = useState(0);

	const TOTAL_STEPS = 4;
	const stepTitles = [
		"Create Account",
		"Connect Email",
		"Advanced Security",
		"Keys & Backup"
	];

	// Spring animation for form
	const formAnimation = useSpring({
		from: { opacity: 0, transform: "translateY(20px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		config: { tension: 300, friction: 20 },
	});

	const createDemoUser = (provider: string, email: string, name: string) => {
		return {
			id: `${provider}-${Date.now()}`,
			name: name,
			email: email,
			password: "",
			twoFactorEnabled: false,
			encryptionKeys: [
				{
					id: "default-key",
					name: "Default Key",
					publicKey: "demo-public-key",
					privateKey: "demo-private-key",
					fingerprint: "AB:CD:EF:12:34:56",
					createdAt: new Date(),
					isActive: true,
				},
			],
			connectedAccounts: [
				{
					id: `${provider}-account`,
					provider: provider as "gmail" | "outlook" | "yahoo" | "other",
					email: email,
					connected: true,
				},
			],
			profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
				name
			)}&background=6366f1&color=fff`,
		};
	};

	const handleSocialLogin = async (provider: "google" | "facebook") => {
		setSelectedProvider(provider);
		setShowSocialModal(true);
		setSocialStep(0);

		// Simulate OAuth flow steps
		const steps = [
			"Redirecting to " + (provider === "google" ? "Google" : "Facebook"),
			"Authenticating with " + (provider === "google" ? "Google" : "Facebook"),
			"Verifying permissions",
			"Creating secure session",
		];

		for (let i = 0; i < steps.length; i++) {
			setTimeout(() => {
				setSocialStep(i);
			}, i * 800);
		}

		// Complete the flow
		setTimeout(() => {
			const demoUsers = {
				google: {
					email: "demo.user@gmail.com",
					name: "Demo User",
				},
				facebook: {
					email: "demo.user@facebook.com",
					name: "Demo User",
				},
			};

			const userData = demoUsers[provider];
			const user = createDemoUser(provider, userData.email, userData.name) as User;

			toast.success(
				`Successfully signed in with ${
					provider.charAt(0).toUpperCase() + provider.slice(1)
				}!`
			);
			setShowSocialModal(false);
			login(user, false);
			setStep(2); // Go to step 2 instead of dashboard
		}, 3500);
	};

	const handleRegisterSubmit = async (formData: any) => {
		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			const user: User = {
				id: `user-${Date.now()}`,
				name: formData.name,
				email: formData.email,
				password: formData.password,
				twoFactorEnabled: false,
				encryptionKeys: [
					{
						id: "default-key",
						name: "Default Key",
						publicKey: "generated-public-key",
						privateKey: "generated-private-key",
						fingerprint: "AB:CD:EF:12:34:56",
						createdAt: new Date(),
						isActive: true,
					},
				],
				connectedAccounts: [],
				profileImage: `https://ui-avatars.com/api/?name=${formData.name.replace(
					" ",
					"+"
				)}&background=6366f1&color=fff`,
			};

			login(user, false);
			toast.success("Account created successfully!");
			setStep(2);
		} catch (error) {
			toast.error("Registration failed");
		} finally {
			setIsLoading(false);
		}
	};

	const handleConnectEmail = (
		provider: "gmail" | "outlook" | "yahoo" | "other"
	) => {
		setIsLoading(true);

		const providerNames = {
			gmail: "Google",
			outlook: "Microsoft",
			yahoo: "Yahoo",
			other: "email provider",
		};

		toast.loading(`Connecting to ${providerNames[provider]}...`);

		setTimeout(() => {
			toast.dismiss();
			toast.success(`Connected to ${providerNames[provider]} successfully!`);
			setIsLoading(false);
			setStep(3);
		}, 1500);
	};

	const handleFinalComplete = () => {
		router.push("/dashboard");
	};

	return (
		<div
			className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
				darkMode ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			<div className="absolute top-5 left-5">
				<Link
					href="/"
					className={`flex items-center transition-colors duration-200 ${
						darkMode
							? "text-gray-400 hover:text-brand-400"
							: "text-gray-500 hover:text-brand-600"
					}`}
				>
					<LucideIcons.ArrowLeft className="h-5 w-5 mr-1" />
					<span>Back to Home</span>
				</Link>
			</div>

			<animated.div
				style={formAnimation}
				className={`max-w-lg w-full space-y-8 p-10 rounded-xl shadow-xl ${
					darkMode ? "bg-gray-800" : "bg-white"
				}`}
			>
				{/* Progress Indicator */}
				<div className="flex items-center justify-between w-full mb-8 relative">
					{stepTitles.map((title, index) => (
						<div key={index} className={`flex items-center ${index < stepTitles.length - 1 ? 'flex-1' : ''}`}>
							<div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold 
								${index + 1 < step ? 'bg-green-500 text-white' : 
								index + 1 === step ? 'bg-brand-600 text-white' : 
								darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
								{index + 1 < step ? '✓' : index + 1}
							</div>
							<span className={`ml-2 text-xs truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'} ${index + 1 === step ? 'hidden sm:block' : 'hidden'}`}>{title}</span>
							{index < stepTitles.length - 1 && (
								<div className={`flex-1 h-0.5 mx-2 sm:mx-3 ${index + 1 < step ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
							)}
						</div>
					))}
				</div>

				{/* Mobile-only: show current step title */}
				<div className={`sm:hidden text-center text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
					Step {step} of {TOTAL_STEPS}: {stepTitles[step - 1]}
				</div>
				{step > 1 && (
					<button
						type="button"
						onClick={() => setStep(step - 1)}
						className={`flex items-center text-sm font-medium mb-4 transition-colors duration-200 ${
							darkMode
								? "text-gray-400 hover:text-brand-400"
								: "text-gray-500 hover:text-brand-600"
						}`}
					>
						<LucideIcons.ArrowLeft className="h-4 w-4 mr-1" />
						Back to {stepTitles[step - 2]}
					</button>
				)}

				<div className={`flex flex-col gap-2 ${step === 1 ? "block" : "hidden"}`}>
					<div>
						<div className="flex justify-center">
							<div className="h-14 w-14 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center text-white shadow-lg">
								<LucideIcons.UserPlus className="h-8 w-8" />
							</div>
						</div>
						<h2
							className={`mt-6 text-center text-3xl font-extrabold ${
								darkMode ? "text-white" : "text-gray-900"
							}`}
						>
							Create your account
						</h2>
						<div
							className={`mt-2 text-center text-sm ${
								darkMode ? "text-gray-400" : "text-gray-600"
							}`}
						>
							Already have an account?{" "}
							<Link
								href="/login"
								className={`font-medium transition-colors duration-200 ${
									darkMode
										? "text-brand-400 hover:text-brand-300"
										: "text-brand-600 hover:text-brand-500"
								}`}
							>
								Sign in
							</Link>
						</div>
					</div>

					<RegisterForm
						onSubmit={handleRegisterSubmit}
						onSocialLogin={handleSocialLogin}
						isLoading={isLoading}
					/>
				</div>

				<div className={step === 2 ? "block" : "hidden"}>
					<EmailConnect 
						onConnect={handleConnectEmail} 
						onSkip={() => setStep(3)} 
						isLoading={isLoading} 
					/>
				</div>

				<div className={step === 3 ? "block" : "hidden"}>
					<AdvancedSecurityStep 
						onNext={() => setStep(4)} 
						onSkip={() => setStep(4)} 
					/>
				</div>

				<div className={step === 4 ? "block" : "hidden"}>
					<EncryptionKeysStep
						onComplete={handleFinalComplete}
					/>
				</div>
			</animated.div>

			<SocialLoginModal
				isOpen={showSocialModal}
				onClose={() => setShowSocialModal(false)}
				provider={selectedProvider}
				step={socialStep}
			/>
		</div>
	);
}
