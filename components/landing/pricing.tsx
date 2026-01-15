"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function Pricing() {
	const { darkMode } = useTheme();

	return (
		<section
			id="pricing"
			className={`py-16 sm:py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2
						className={`text-3xl font-extrabold sm:text-4xl ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						Simple, Transparent Pricing
					</h2>
					<p
						className={`mt-4 max-w-2xl mx-auto text-xl ${
							darkMode ? "text-gray-400" : "text-gray-500"
						}`}
					>
						Choose the plan that fits your security needs.
					</p>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">
					{/* Free Plan */}
					<motion.div
						whileHover={{
							y: -8,
							boxShadow:
								"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
						}}
						transition={{ duration: 0.2 }}
						className={`rounded-2xl shadow-lg overflow-hidden border ${
							darkMode
								? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
								: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
						}`}
					>
						<div className="p-8">
							<h3
								className={`text-xl font-bold ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Starter
							</h3>
							<p
								className={`mt-4 text-sm ${
									darkMode ? "text-gray-400" : "text-gray-500"
								}`}
							>
								Essential security for personal use.
							</p>
							<div className="mt-6 flex items-baseline">
								<span
									className={`text-5xl font-extrabold ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									$0
								</span>
								<span
									className={`ml-1 text-xl font-medium ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									/month
								</span>
							</div>
							<Link
								href="/register"
								className={`mt-8 block w-full border border-transparent rounded-md py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
									darkMode
										? "bg-gray-700 text-white hover:bg-gray-600"
										: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
								}`}
							>
								Get Started
							</Link>
						</div>
						<div className="px-8 pb-8">
							<h4
								className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								What's included
							</h4>
							<ul className="space-y-4">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Connect 1 email account
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										500MB encrypted storage
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Basic encryption features
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Mobile app access
									</span>
								</li>
							</ul>
						</div>
					</motion.div>

					{/* Pro Plan */}
					<motion.div
						whileHover={{
							y: -8,
							boxShadow:
								"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
						}}
						transition={{ duration: 0.2 }}
						className={`rounded-2xl shadow-xl overflow-hidden border-2 relative transform scale-105 z-10 ${
							darkMode
								? "bg-gradient-to-br from-gray-800 to-gray-750 border-indigo-500"
								: "bg-white border-indigo-500"
						}`}
					>
						<div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
							POPULAR
						</div>
						<div className="p-8">
							<h3
								className={`text-xl font-bold ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Pro
							</h3>
							<p
								className={`mt-4 text-sm ${
									darkMode ? "text-gray-400" : "text-gray-500"
								}`}
							>
								Advanced features for power users.
							</p>
							<div className="mt-6 flex items-baseline">
								<span
									className={`text-5xl font-extrabold ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									$4.99
								</span>
								<span
									className={`ml-1 text-xl font-medium ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									/month
								</span>
							</div>
							<Link
								href="/register"
								className="mt-8 block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-sm font-medium text-white text-center transition-colors duration-200"
							>
								Try Pro Free for 14 Days
							</Link>
						</div>
						<div className="px-8 pb-8">
							<h4
								className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								What's included
							</h4>
							<ul className="space-y-4">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										All Free features
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Connect up to 5 email accounts
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										5GB encrypted storage
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Self-destructing emails
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Advanced encryption options
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Priority support
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Custom security dashboard
									</span>
								</li>
							</ul>
						</div>
					</motion.div>

					{/* Business Plan */}
					<motion.div
						whileHover={{
							y: -8,
							boxShadow:
								"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
						}}
						transition={{ duration: 0.2 }}
						className={`rounded-2xl shadow-lg overflow-hidden border ${
							darkMode
								? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
								: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
						}`}
					>
						<div className="p-8">
							<div className="flex justify-between items-center">
								<h3
									className={`text-xl font-bold ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									Business
								</h3>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										darkMode
											? "bg-purple-900 text-purple-200"
											: "bg-purple-100 text-purple-800"
									}`}
								>
									Team
								</span>
							</div>
							<p
								className={`mt-4 text-sm ${
									darkMode ? "text-gray-400" : "text-gray-500"
								}`}
							>
								For teams and businesses with stringent security requirements.
							</p>
							<div className="mt-6 flex items-baseline">
								<span
									className={`text-5xl font-extrabold ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									$9.99
								</span>
								<span
									className={`ml-1 text-xl font-medium ${
										darkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									/user/month
								</span>
							</div>
							<Link
								href="/register"
								className="mt-8 block w-full bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-sm font-medium text-white text-center transition-colors duration-200"
							>
								Contact Sales
							</Link>
						</div>
						<div className="px-8 pb-8">
							<h4
								className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								What's included
							</h4>
							<ul className="space-y-4">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										All Pro features
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Connect unlimited email accounts
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										20GB storage per user
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Admin control panel
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										HIPAA & GDPR compliance
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Team management features
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										24/7 dedicated support
									</span>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
