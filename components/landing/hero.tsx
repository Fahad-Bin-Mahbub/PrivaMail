"use client";

import Link from "next/link";
import { useSpring, animated } from "react-spring";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { User } from "@/lib/types";

export function Hero() {
	const { darkMode } = useTheme();
	const { login } = useAuth();

	const heroAnimation = useSpring({
		from: { opacity: 0, transform: "translateY(40px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		delay: 200,
	});

	const featureAnimation = useSpring({
		from: { opacity: 0, transform: "translateY(40px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		delay: 500,
	});

	const handleDemoLogin = () => {
		toast.loading("Setting up your demo account...");

		setTimeout(() => {
			const demoUser: User = {
				id: "demo-user",
				name: "Demo User",
				email: "demo@example.com",
				password: "demo-password",
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
						id: "gmail-account",
						provider: "gmail",
						email: "demo@gmail.com",
						connected: true,
					},
				],
				profileImage:
					"https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff",
			};

			toast.dismiss();
			// We don't toast success here because AuthProvider does it
			login(demoUser);
		}, 1500);
	};

	return (
		<section className="relative bg-gradient-to-br from-brand-600 via-accent-600 to-brand-800 py-20 sm:py-28 overflow-hidden">
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
			<div className="absolute right-0 top-0 -mr-40 -mt-40 w-80 h-80 rounded-full bg-accent-400 filter blur-3xl opacity-30"></div>
			<div className="absolute left-0 bottom-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-brand-400 filter blur-3xl opacity-30"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
					<animated.div
						style={heroAnimation}
						className="mb-12 lg:mb-0 text-center sm:text-left"
					>
						<span className="inline-block px-3 py-1 mb-5 text-xs font-semibold text-brand-100 bg-brand-700 bg-opacity-50 rounded-full shadow-lg">
							Military-Grade Encryption for Everyone
						</span>
						<h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
							Secure Your Email <br className="hidden md:block" />
							<span className="text-brand-200">Without Compromises</span>
						</h1>
						<p className="mt-6 text-xl text-brand-100 max-w-3xl">
							Add an extra layer of protection to your existing email accounts
							with end-to-end encryption, timed self-destruction, and advanced
							security features.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
							<Link
								href="/register"
								className="bg-white text-brand-600 hover:text-brand-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
							>
								<LucideIcons.Shield className="mr-2 h-5 w-5" />
								Get Started Free
							</Link>
							<button
								onClick={handleDemoLogin}
								className="bg-brand-600 bg-opacity-50 hover:bg-brand-700 text-white hover:bg-opacity-70 font-medium px-6 py-3 rounded-lg border border-brand-200 border-opacity-40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
							>
								<LucideIcons.Play className="mr-2 h-5 w-5" />
								Try Instant Demo
							</button>
						</div>
						<div className="mt-6 text-brand-200 text-sm flex items-center justify-center sm:justify-start">
							<LucideIcons.CheckCircle className="h-5 w-5 mr-2" />
							No credit card required
						</div>
					</animated.div>

					<animated.div style={featureAnimation} className="relative">
						<div
							className={`rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<div className="px-6 py-6">
								<div className="flex justify-between items-center mb-6">
									<div className="flex items-center">
										<div className="h-10 w-10 bg-gradient-to-br from-brand-600 to-accent-600 rounded-full flex items-center justify-center text-white">
											<LucideIcons.Mail className="h-5 w-5" />
										</div>
										<div className="ml-3">
											<h3
												className={`text-lg font-semibold ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												New Encrypted Message
											</h3>
											<p
												className={`text-sm ${
													darkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												From: secure-team@example.com
											</p>
										</div>
									</div>
									<div className="flex">
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
											<LucideIcons.Lock className="h-3 w-3 mr-1" />
											Encrypted
										</span>
									</div>
								</div>

								<div
									className={`border-t py-5 space-y-4 ${
										darkMode ? "border-gray-700" : "border-gray-200"
									}`}
								>
									<div>
										<h4
											className={`text-sm font-medium ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Subject
										</h4>
										<p
											className={`mt-1 text-base font-medium ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Your secure documents are ready
										</p>
									</div>

									<div>
										<h4
											className={`text-sm font-medium ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Message
										</h4>
										<div
											className={`mt-1 p-3 rounded-lg ${
												darkMode ? "bg-gray-700" : "bg-gray-50"
											}`}
										>
											<p
												className={`text-sm ${
													darkMode ? "text-gray-300" : "text-gray-700"
												}`}
											>
												Your confidential documents have been encrypted and are
												ready for review. Please click the button below to
												securely access them.
											</p>
											<div className="inline-flex mt-3 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors duration-200">
												View Secure Documents
											</div>
										</div>
									</div>

									<div>
										<h4
											className={`text-sm font-medium ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Security
										</h4>
										<div
											className={`mt-2 flex items-center text-sm ${
												darkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											<LucideIcons.Clock className="h-4 w-4 mr-1 text-amber-500" />
											<span>Expires in 7 days</span>
										</div>
										<div
											className={`mt-1 flex items-center text-sm ${
												darkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											<LucideIcons.ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
											<span>AES-256 encryption</span>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`px-6 py-4 border-t flex justify-between ${
									darkMode
										? "bg-gray-750 border-gray-700"
										: "bg-gray-50 border-gray-200"
								}`}
							>
								<div
									className={`font-medium text-sm flex items-center ${
										darkMode
											? "text-gray-400 hover:text-brand-400"
											: "text-gray-500 hover:text-brand-600"
									}`}
								>
									<LucideIcons.Reply className="mr-1 h-4 w-4" />
									Reply
								</div>
								<div
									className={`font-medium text-sm flex items-center ${
										darkMode
											? "text-gray-400 hover:text-brand-400"
											: "text-gray-500 hover:text-brand-600"
									}`}
								>
									<LucideIcons.Forward className="mr-1 h-4 w-4" />
									Forward
								</div>
							</div>
						</div>

						<div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg">
							<LucideIcons.Lock className="h-6 w-6" />
						</div>

						<div
							className={`absolute -bottom-4 -left-4 w-48 h-10 p-2 rounded-lg flex items-center justify-center shadow-md ${
								darkMode ? "bg-green-900" : "bg-green-100"
							}`}
						>
							<span
								className={`text-xs font-medium ${
									darkMode ? "text-green-200" : "text-green-800"
								}`}
							>
								<LucideIcons.Shield className="inline-block h-3 w-3 mr-1" />
								End-to-End Encrypted
							</span>
						</div>
					</animated.div>
				</div>
			</div>
		</section>
	);
}
