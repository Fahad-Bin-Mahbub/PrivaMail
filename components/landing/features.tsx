"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function Features() {
	const { darkMode } = useTheme();

	return (
		<section
			id="features"
			className={`py-16 sm:py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<span
						className={`inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full ${
							darkMode
								? "text-indigo-400 bg-indigo-900 bg-opacity-50"
								: "text-indigo-600 bg-indigo-100"
						}`}
					>
						Key Features
					</span>
					<h2
						className={`text-3xl font-extrabold sm:text-4xl ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						Email Encryption Made Simple
					</h2>
					<p
						className={`mt-4 max-w-2xl mx-auto text-xl ${
							darkMode ? "text-gray-400" : "text-gray-500"
						}`}
					>
						Protect your privacy without sacrificing convenience with our
						comprehensive security suite.
					</p>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{/* Feature 1 */}
						<motion.div
							whileHover={{
								y: -8,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							transition={{ duration: 0.2 }}
							className={`rounded-xl p-8 shadow-lg hover:shadow-xl border transition-all duration-200 ${
								darkMode
									? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
									: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
							}`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
									darkMode
										? "bg-indigo-900 text-indigo-400"
										: "bg-indigo-100 text-indigo-600"
								}`}
							>
								<LucideIcons.Lock className="h-6 w-6" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								End-to-End Encryption
							</h3>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								Your messages are encrypted before they leave your device and
								can only be decrypted by the intended recipient.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm font-semibold ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Military-grade AES-256 encryption
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Zero knowledge architecture
									</span>
								</li>
							</ul>
						</motion.div>

						{/* Feature 2 */}
						<motion.div
							whileHover={{
								y: -8,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							transition={{ duration: 0.2 }}
							className={`rounded-xl p-8 shadow-lg hover:shadow-xl border transition-all duration-200 ${
								darkMode
									? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
									: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
							}`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
									darkMode
										? "bg-purple-900 text-purple-400"
										: "bg-purple-100 text-purple-600"
								}`}
							>
								<LucideIcons.Mail className="h-6 w-6" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Use Your Existing Email
							</h3>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								No need to create a new email address. Simply connect your
								Gmail, Outlook, or Yahoo account.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Works with all major email providers
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Seamless integration
									</span>
								</li>
							</ul>
						</motion.div>

						{/* Feature 3 */}
						<motion.div
							whileHover={{
								y: -8,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							transition={{ duration: 0.2 }}
							className={`rounded-xl p-8 shadow-lg hover:shadow-xl border transition-all duration-200 ${
								darkMode
									? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
									: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
							}`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
									darkMode
										? "bg-blue-900 text-blue-400"
										: "bg-blue-100 text-blue-600"
								}`}
							>
								<LucideIcons.KeyRound className="h-6 w-6" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Two-Factor Authentication
							</h3>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								Add an extra layer of security with 2FA to protect your
								encrypted emails from unauthorized access.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Authenticator app support
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										SMS verification option
									</span>
								</li>
							</ul>
						</motion.div>

						{/* Feature 4 */}
						<motion.div
							whileHover={{
								y: -8,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							transition={{ duration: 0.2 }}
							className={`rounded-xl p-8 shadow-lg hover:shadow-xl border transition-all duration-200 ${
								darkMode
									? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
									: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
							}`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
									darkMode
										? "bg-amber-900 text-amber-400"
										: "bg-amber-100 text-amber-600"
								}`}
							>
								<LucideIcons.Timer className="h-6 w-6" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Self-Destructing Messages
							</h3>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								Set your emails to expire after a specified time for enhanced
								privacy and data control.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Customizable expiration times
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Complete data removal
									</span>
								</li>
							</ul>
						</motion.div>

						{/* Feature 5 */}
						<motion.div
							whileHover={{
								y: -8,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							transition={{ duration: 0.2 }}
							className={`rounded-xl p-8 shadow-lg hover:shadow-xl border transition-all duration-200 ${
								darkMode
									? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
									: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
							}`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
									darkMode
										? "bg-green-900 text-green-400"
										: "bg-green-100 text-green-600"
								}`}
							>
								<LucideIcons.FileText className="h-6 w-6" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Encrypted Attachments
							</h3>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								Share files securely with end-to-end encrypted attachments
								that only the recipient can access.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Large file support (up to 100MB)
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										All file types supported
									</span>
								</li>
							</ul>
						</motion.div>

						{/* Feature 6 */}
						<motion.div
							whileHover={{
								y: -8,
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
							transition={{ duration: 0.2 }}
							className={`rounded-xl p-8 shadow-lg hover:shadow-xl border transition-all duration-200 ${
								darkMode
									? "bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700"
									: "bg-gradient-to-br from-gray-50 to-white border-gray-200"
							}`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
									darkMode
										? "bg-pink-900 text-pink-400"
										: "bg-pink-100 text-pink-600"
								}`}
							>
								<LucideIcons.KeySquare className="h-6 w-6" />
							</div>
							<h3
								className={`text-xl font-bold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Password Protected Emails
							</h3>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								Send encrypted emails to anyone, even if they don't use our
								service, with password protection.
							</p>
							<ul className="mt-4 space-y-2">
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Custom password hints
									</span>
								</li>
								<li className="flex items-start">
									<LucideIcons.CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
									<span
										className={`text-sm ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Works with any email recipient
									</span>
								</li>
							</ul>
						</motion.div>
					</div>
				</div>

				{/* Feature callout */}
				<div className="mt-20">
					<div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
						<div className="px-6 py-12 sm:px-12 lg:px-16">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
								<div>
									<h3 className="text-2xl font-bold text-white">
										Advanced Security Dashboard
									</h3>
									<p className="mt-4 text-indigo-100">
										Monitor your security status, manage encryption keys, and
										track email activity all from one intuitive dashboard.
									</p>
									<div className="mt-8">
										<a
											href="/register"
											className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300"
										>
											<LucideIcons.ShieldCheck className="mr-2 h-5 w-5" />
											Try It Now
										</a>
									</div>
								</div>
								<div className="relative">
									<div
										className={`rounded-lg shadow-xl overflow-hidden p-4 ${
											darkMode ? "bg-gray-800" : "bg-white"
										}`}
									>
										<div className="flex justify-between items-center mb-4">
											<h4
												className={`text-lg font-semibold ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Security Overview
											</h4>
											<span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
												Protected
											</span>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div
												className={`p-4 rounded-lg ${
													darkMode ? "bg-gray-750" : "bg-gray-50"
												}`}
											>
												<div className="flex items-center">
													<div
														className={`w-10 h-10 rounded-full flex items-center justify-center ${
															darkMode
																? "bg-blue-900 text-blue-400"
																: "bg-blue-100 text-blue-600"
														}`}
													>
														<LucideIcons.Key className="h-5 w-5" />
													</div>
													<div className="ml-3">
														<p
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Encryption Keys
														</p>
														<p
															className={`text-xs ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															3 active keys
														</p>
													</div>
												</div>
											</div>

											<div
												className={`p-4 rounded-lg ${
													darkMode ? "bg-gray-750" : "bg-gray-50"
												}`}
											>
												<div className="flex items-center">
													<div
														className={`w-10 h-10 rounded-full flex items-center justify-center ${
															darkMode
																? "bg-green-900 text-green-400"
																: "bg-green-100 text-green-600"
														}`}
													>
														<LucideIcons.ShieldCheck className="h-5 w-5" />
													</div>
													<div className="ml-3">
														<p
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Security Score
														</p>
														<p
															className={`text-xs ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															98/100 - Excellent
														</p>
													</div>
												</div>
											</div>

											<div
												className={`p-4 rounded-lg ${
													darkMode ? "bg-gray-750" : "bg-gray-50"
												}`}
											>
												<div className="flex items-center">
													<div
														className={`w-10 h-10 rounded-full flex items-center justify-center ${
															darkMode
																? "bg-purple-900 text-purple-400"
																: "bg-purple-100 text-purple-600"
														}`}
													>
														<LucideIcons.Mail className="h-5 w-5" />
													</div>
													<div className="ml-3">
														<p
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Encrypted Emails
														</p>
														<p
															className={`text-xs ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															142 sent this month
														</p>
													</div>
												</div>
											</div>

											<div
												className={`p-4 rounded-lg ${
													darkMode ? "bg-gray-750" : "bg-gray-50"
												}`}
											>
												<div className="flex items-center">
													<div
														className={`w-10 h-10 rounded-full flex items-center justify-center ${
															darkMode
																? "bg-amber-900 text-amber-400"
																: "bg-amber-100 text-amber-600"
														}`}
													>
														<LucideIcons.Clock className="h-5 w-5" />
													</div>
													<div className="ml-3">
														<p
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Expiring Messages
														</p>
														<p
															className={`text-xs ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															3 in next 24 hours
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Decorative elements */}
									<div className="absolute -bottom-3 -right-3 w-16 h-16 bg-purple-300 rounded-full filter blur-xl opacity-70"></div>
									<div className="absolute -top-3 -left-3 w-16 h-16 bg-indigo-300 rounded-full filter blur-xl opacity-70"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
