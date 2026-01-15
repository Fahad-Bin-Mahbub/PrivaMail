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
			login(user);
			router.push("/dashboard");
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

			// We don't login yet, we move to step 2
			// But wait, the original code had login(user) BEFORE step 2?
			// Checking original code:
			// onLogin(user); setStep(2);
			// Yes, it logs in the user immediately, then asks to connect email.
			// But if we navigate to /security-setup after step 2, we need the user to be logged in.

			login(user);
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

		// Show provider-specific message
		const providerNames = {
			gmail: "Google",
			outlook: "Microsoft",
			yahoo: "Yahoo",
			other: "email provider",
		};

		toast.loading(`Connecting to ${providerNames[provider]}...`);

		// Simulate connection
		setTimeout(() => {
			toast.dismiss();
			toast.success(`Connected to ${providerNames[provider]} successfully!`);
			setIsLoading(false);
			// After connecting, go to security setup
			router.push("/security-setup");
		}, 1500);
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
							? "text-gray-400 hover:text-indigo-400"
							: "text-gray-500 hover:text-indigo-600"
					}`}
				>
					<LucideIcons.ArrowLeft className="h-5 w-5 mr-1" />
					<span>Back to Home</span>
				</Link>
			</div>

			<animated.div
				style={formAnimation}
				className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-xl ${
					darkMode ? "bg-gray-800" : "bg-white"
				}`}
			>
				{step === 1 ? (
					<>
						<div>
							<div className="flex justify-center">
								<div className="h-14 w-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
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
							<p
								className={`mt-2 text-center text-sm ${
									darkMode ? "text-gray-400" : "text-gray-600"
								}`}
							>
								Already have an account?{" "}
								<Link
									href="/login"
									className={`font-medium transition-colors duration-200 ${
										darkMode
											? "text-indigo-400 hover:text-indigo-300"
											: "text-indigo-600 hover:text-indigo-500"
									}`}
								>
									Sign in
								</Link>
							</p>
						</div>

						<RegisterForm
							onSubmit={handleRegisterSubmit}
							onSocialLogin={handleSocialLogin}
							isLoading={isLoading}
						/>
					</>
				) : (
					<EmailConnect onConnect={handleConnectEmail} isLoading={isLoading} />
				)}
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
