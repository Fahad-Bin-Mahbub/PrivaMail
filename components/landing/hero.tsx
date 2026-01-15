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
		<section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20 sm:py-28 overflow-hidden">
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
			<div className="absolute right-0 top-0 -mr-40 -mt-40 w-80 h-80 rounded-full bg-purple-400 filter blur-3xl opacity-30"></div>
			<div className="absolute left-0 bottom-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-indigo-400 filter blur-3xl opacity-30"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
					<animated.div
						style={heroAnimation}
						className="mb-12 lg:mb-0 text-center sm:text-left"
					>
						<span className="inline-block px-3 py-1 mb-5 text-xs font-semibold text-indigo-100 bg-indigo-700 bg-opacity-50 rounded-full shadow-lg">
							Military-Grade Encryption for Everyone
						</span>
						<h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
							Secure Your Email <br className="hidden md:block" />
							<span className="text-indigo-200">Without Compromises</span>
						</h1>
						<p className="mt-6 text-xl text-indigo-100 max-w-3xl">
							Add an extra layer of protection to your existing email accounts
							with end-to-end encryption, timed self-destruction, and advanced
							security features.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
							<Link
								href="/register"
								className="bg-white text-indigo-600 hover:text-indigo-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
							>
								<LucideIcons.Shield className="mr-2 h-5 w-5" />
								Get Started Free
							</Link>
							<button
								onClick={handleDemoLogin}
								className="bg-indigo-800 bg-opacity-50 text-white hover:bg-opacity-70 font-medium px-6 py-3 rounded-lg border border-indigo-200 border-opacity-40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
							>
								<LucideIcons.Play className="mr-2 h-5 w-5" />
								Try Instant Demo
							</button>
						</div>
						<div className="mt-6 text-indigo-200 text-sm flex items-center justify-center sm:justify-start">
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
										<div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white">
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
												Your confidential documents have been encrypted and
												are ready for review. Please click the button below to
												securely access them.
											</p>
											<button className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200">
												View Secure Documents
											</button>
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
								<button
									className={`font-medium text-sm flex items-center ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									<LucideIcons.Reply className="mr-1 h-4 w-4" />
									Reply
								</button>
								<button
									className={`font-medium text-sm flex items-center ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									<LucideIcons.Forward className="mr-1 h-4 w-4" />
									Forward
								</button>
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

				{/* Trusted by section */}
				<div className="mt-20 text-center relative overflow-hidden">
					{/* Background gradient orbs */}
					<div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute top-10 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

					<div className="relative z-10">
						<p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-sm font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
							Trusted by leading organizations
						</p>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
							{[
								{
									name: "Acme Inc",
									icon: "Building2",
									color: "from-blue-400 to-indigo-500",
								},
								{
									name: "GlobalTech",
									icon: "Globe",
									color: "from-green-400 to-emerald-500",
								},
								{
									name: "SecureCorp",
									icon: "Shield",
									color: "from-purple-400 to-violet-500",
								},
								{
									name: "DataGuard",
									icon: "Database",
									color: "from-pink-400 to-rose-500",
								},
							].map((company, index) => {
								const IconComponent = LucideIcons[company.icon as keyof typeof LucideIcons] as React.ElementType;
								return (
									<div
										key={index}
										className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer"
										style={{
											animationDelay: `${index * 200}ms`,
										}}
									>
										{/* Glow effect */}
										<div
											className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
										></div>

										{/* Content */}
										<div className="relative z-10 flex flex-col items-center space-y-3">
											<div
												className={`p-3 rounded-xl bg-gradient-to-r ${company.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
											>
												<IconComponent className="h-6 w-6 text-white" />
											</div>
											<span className="text-white/90 group-hover:text-white font-bold text-lg transition-colors duration-300">
												{company.name}
											</span>
										</div>

										{/* Shine effect */}
										<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
											<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
										</div>
									</div>
								);
							})}
						</div>

						{/* Floating particles */}
						<div
							className="absolute top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full animate-ping"
							style={{ animationDelay: "0s" }}
						></div>
						<div
							className="absolute top-20 right-10 w-1 h-1 bg-purple-400 rounded-full animate-ping"
							style={{ animationDelay: "2s" }}
						></div>
						<div
							className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"
							style={{ animationDelay: "4s" }}
						></div>
					</div>

					<style jsx>{`
						@keyframes fade-in {
							from {
								opacity: 0;
								transform: translateY(20px);
							}
							to {
								opacity: 1;
								transform: translateY(0);
							}
						}
						.animate-fade-in {
							animation: fade-in 0.8s ease-out forwards;
						}
					`}</style>
				</div>
			</div>
		</section>
	);
}
