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
import { LoginForm } from "@/components/auth/login-form";
import { SocialLoginModal } from "@/components/auth/social-login-modal";

export default function LoginPage() {
	const { darkMode } = useTheme();
	const { login } = useAuth();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [showSocialModal, setShowSocialModal] = useState(false);
	const [selectedProvider, setSelectedProvider] = useState<
		"google" | "facebook" | null
	>(null);
	const [socialStep, setSocialStep] = useState(0);

	// Spring animation for form
	const formAnimation = useSpring({
		from: { opacity: 0, transform: "translateY(30px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		config: { tension: 280, friction: 25 },
	});

	// Background particles animation
	const particlesAnimation = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 2000 },
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

	return (
		<div
			className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
				darkMode ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			{/* Background Effects */}
			<animated.div
				style={particlesAnimation}
				className="absolute inset-0 overflow-hidden pointer-events-none"
			>
				{/* Floating orbs */}
				<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-3/4 w-64 h-64 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

				{/* Animated particles */}
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-indigo-400/30 rounded-full animate-ping"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${2 + Math.random() * 2}s`,
						}}
					></div>
				))}
			</animated.div>

			{/* Back button */}
			<div className="absolute top-5 left-5 z-10">
				<Link
					href="/"
					className={`flex items-center transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-sm ${
						darkMode
							? "text-gray-400 hover:text-indigo-400 bg-gray-800/50 hover:bg-gray-700/50"
							: "text-gray-500 hover:text-indigo-600 bg-white/50 hover:bg-white/70"
					}`}
				>
					<LucideIcons.ArrowLeft className="h-5 w-5 mr-2" />
					<span>Back to Home</span>
				</Link>
			</div>

			<animated.div style={formAnimation} className="w-full max-w-md z-10">
				<LoginForm
					onSocialLoginClick={handleSocialLogin}
					disableAll={isLoading || showSocialModal}
					onLoadingChange={setIsLoading}
				/>
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
