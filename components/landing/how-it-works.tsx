"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { User } from "@/lib/types";

export function HowItWorks() {
	const { darkMode } = useTheme();
	const { login } = useAuth();

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
			login(demoUser);
		}, 1500);
	};

	return (
		<section
			id="how-it-works"
			className={`py-16 sm:py-24 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
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
						The Process
					</span>
					<h2
						className={`text-3xl font-extrabold sm:text-4xl ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						How Email Encryption Works
					</h2>
					<p
						className={`mt-4 max-w-2xl mx-auto text-xl ${
							darkMode ? "text-gray-400" : "text-gray-500"
						}`}
					>
						Understanding the basics of secure email communication.
					</p>
				</div>

				<div className="mt-16">
					<div className="relative">
						{/* The line connecting the steps for desktop */}
						<div className="hidden lg:block absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-600 transform -translate-x-1/2"></div>

						<div className="space-y-16 lg:space-y-28">
							{/* Step 1 */}
							<div className="relative">
								<div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
									<div className="mb-8 lg:mb-0 lg:pr-12 text-center lg:text-right order-2 lg:order-1">
										<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-4 lg:mb-0 lg:hidden">
											1
										</span>
										<h3
											className={`text-2xl font-bold mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Register and Connect
										</h3>
										<p
											className={darkMode ? "text-gray-300" : "text-gray-600"}
										>
											Create an account and connect your existing email
											address. We'll generate your personal encryption keys to
											secure your communications.
										</p>
										<div
											className={`mt-6 rounded-lg p-4 shadow-md inline-block text-left ${
												darkMode ? "bg-gray-750" : "bg-white"
											}`}
										>
											<div className="flex items-start">
												<LucideIcons.Key
													className={`h-5 w-5 mt-0.5 mr-2 ${
														darkMode ? "text-indigo-400" : "text-indigo-600"
													}`}
												/>
												<div>
													<p
														className={`text-sm font-medium ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Your public key is shared with recipients
													</p>
													<p
														className={`text-xs mt-1 ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														They use this to encrypt messages only you can
														read
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="order-1 lg:order-2 relative">
										{/* The numbered circle for desktop */}
										<div className="hidden lg:flex absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl items-center justify-center shadow-lg">
											1
										</div>

										<div
											className={`rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 border ${
												darkMode
													? "bg-gray-750 border-gray-700"
													: "bg-white border-gray-200"
											}`}
										>
											<div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
											<div className="p-6">
												<div className="flex justify-between items-center mb-6">
													<div className="flex items-center">
														<LucideIcons.Shield
															className={`h-8 w-8 ${
																darkMode
																	? "text-indigo-400"
																	: "text-indigo-600"
															}`}
														/>
														<span
															className={`ml-2 text-xl font-bold ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															PrivaMail
														</span>
													</div>
													<span
														className={`text-xs font-medium ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														STEP 1
													</span>
												</div>

												<div className="space-y-5">
													<div>
														<label
															className={`block text-sm font-medium mb-1 ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Full Name
														</label>
														<input
															type="text"
															className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
																darkMode
																	? "border-gray-600 bg-gray-700 text-white"
																	: "border-gray-300 bg-white text-gray-900"
															}`}
															value="Sarah Johnson"
															readOnly
														/>
													</div>

													<div>
														<label
															className={`block text-sm font-medium mb-1 ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Email Address
														</label>
														<input
															type="email"
															className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
																darkMode
																	? "border-gray-600 bg-gray-700 text-white"
																	: "border-gray-300 bg-white text-gray-900"
															}`}
															value="sarah@example.com"
															readOnly
														/>
													</div>

													<div className="pt-3">
														<button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center">
															<LucideIcons.Key className="mr-2 h-5 w-5" />
															Generate Encryption Keys
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Step 2 */}
							<div className="relative">
								<div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
									<div className="order-1 relative">
										{/* The numbered circle for desktop */}
										<div className="hidden lg:flex absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl items-center justify-center shadow-lg">
											2
										</div>

										<div
											className={`rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 border ${
												darkMode
													? "bg-gray-750 border-gray-700"
													: "bg-white border-gray-200"
											}`}
										>
											<div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
											<div className="p-6">
												<div className="flex justify-between items-center mb-6">
													<div className="flex items-center">
														<LucideIcons.PenTool
															className={`h-7 w-7 ${
																darkMode
																	? "text-indigo-400"
																	: "text-indigo-600"
															}`}
														/>
														<span
															className={`ml-2 text-lg font-bold ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															New Encrypted Message
														</span>
													</div>
													<span
														className={`text-xs font-medium ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														STEP 2
													</span>
												</div>

												<div className="space-y-3">
													<div>
														<label
															className={`block text-sm font-medium mb-1 ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															To
														</label>
														<input
															type="text"
															className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
																darkMode
																	? "border-gray-600 bg-gray-700 text-white"
																	: "border-gray-300 bg-white text-gray-900"
															}`}
															value="alex@company.com"
															readOnly
														/>
													</div>

													<div>
														<label
															className={`block text-sm font-medium mb-1 ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Subject
														</label>
														<input
															type="text"
															className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
																darkMode
																	? "border-gray-600 bg-gray-700 text-white"
																	: "border-gray-300 bg-white text-gray-900"
															}`}
															value="Confidential Project Update"
															readOnly
														/>
													</div>

													<div>
														<label
															className={`block text-sm font-medium mb-1 ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Message
														</label>
														<div
															className={`w-full h-20 px-3 py-2 border rounded-md shadow-sm text-sm overflow-hidden ${
																darkMode
																	? "border-gray-600 bg-gray-700 text-white"
																	: "border-gray-300 bg-white text-gray-900"
															}`}
														>
															Here's the latest update on our confidential
															project. Please review the attached documents
															and let me know your thoughts.
														</div>
													</div>

													<div className="flex items-center pt-2">
														<div
															className={`flex items-center px-3 py-1 rounded-full ${
																darkMode ? "bg-green-900" : "bg-green-100"
															}`}
														>
															<LucideIcons.Lock
																className={`h-4 w-4 mr-1 ${
																	darkMode
																		? "text-green-400"
																		: "text-green-600"
																}`}
															/>
															<span
																className={`text-xs font-medium ${
																	darkMode
																		? "text-green-200"
																		: "text-green-800"
																}`}
															>
																End-to-End Encrypted
															</span>
														</div>
														<div className="ml-auto">
															<button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 text-sm flex items-center">
																<LucideIcons.Send className="mr-1.5 h-4 w-4" />
																Send Secure
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-8 lg:mt-0 lg:pl-12 text-center lg:text-left order-2">
										<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-4 lg:mb-0 lg:hidden">
											2
										</span>
										<h3
											className={`text-2xl font-bold mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Compose Encrypted Emails
										</h3>
										<p
											className={darkMode ? "text-gray-300" : "text-gray-600"}
										>
											Write your email as usual, with the added security of
											end-to-end encryption. Add attachments, set expiration
											times, and enhance security with passwords.
										</p>
										<div
											className={`mt-6 rounded-lg p-4 shadow-md inline-block text-left ${
												darkMode ? "bg-gray-750" : "bg-white"
											}`}
										>
											<div className="flex items-start">
												<LucideIcons.Lock
													className={`h-5 w-5 mt-0.5 mr-2 ${
														darkMode ? "text-green-400" : "text-green-600"
													}`}
												/>
												<div>
													<p
														className={`text-sm font-medium ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Your message is encrypted locally
													</p>
													<p
														className={`text-xs mt-1 ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														No one, not even PrivaMail, can read your
														messages
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Step 3 */}
							<div className="relative">
								<div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
									<div className="mb-8 lg:mb-0 lg:pr-12 text-center lg:text-right order-2 lg:order-1">
										<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-4 lg:mb-0 lg:hidden">
											3
										</span>
										<h3
											className={`text-2xl font-bold mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Secure Delivery
										</h3>
										<p
											className={darkMode ? "text-gray-300" : "text-gray-600"}
										>
											Your message is encrypted and can only be decrypted by
											the intended recipient, even if they don't use
											PrivaMail.
										</p>
										<div
											className={`mt-6 rounded-lg p-4 shadow-md inline-block text-left ${
												darkMode ? "bg-gray-750" : "bg-white"
											}`}
										>
											<div className="flex items-start">
												<LucideIcons.Shield
													className={`h-5 w-5 mt-0.5 mr-2 ${
														darkMode ? "text-indigo-400" : "text-indigo-600"
													}`}
												/>
												<div>
													<p
														className={`text-sm font-medium ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Secure transit protection
													</p>
													<p
														className={`text-xs mt-1 ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														Your message remains encrypted during delivery
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="order-1 lg:order-2 relative">
										{/* The numbered circle for desktop */}
										<div className="hidden lg:flex absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl items-center justify-center shadow-lg">
											3
										</div>

										<div
											className={`rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 border ${
												darkMode
													? "bg-gray-750 border-gray-700"
													: "bg-white border-gray-200"
											}`}
										>
											<div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
											<div className="p-6">
												<div className="flex justify-between items-center mb-6">
													<span
														className={`text-xs font-medium ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														STEP 3
													</span>
													<div className="flex items-center space-x-1 text-amber-500">
														<LucideIcons.Star
															fill="currentColor"
															className="h-4 w-4"
														/>
														<LucideIcons.Star
															fill="currentColor"
															className="h-4 w-4"
														/>
														<LucideIcons.Star
															fill="currentColor"
															className="h-4 w-4"
														/>
														<LucideIcons.Star
															fill="currentColor"
															className="h-4 w-4"
														/>
														<LucideIcons.Star
															fill="currentColor"
															className="h-4 w-4"
														/>
													</div>
												</div>

												<div className="flex justify-center">
													<div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
														<div
															className={`w-16 h-16 rounded-full flex items-center justify-center ${
																darkMode ? "bg-gray-800" : "bg-white"
															}`}
														>
															<LucideIcons.Lock
																className={`h-8 w-8 ${
																	darkMode
																		? "text-indigo-400"
																		: "text-indigo-600"
																}`}
															/>
														</div>
													</div>
												</div>

												<div className="text-center mt-6">
													<h4
														className={`text-lg font-bold mb-2 ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Secure Transmission
													</h4>
													<p
														className={`text-sm ${
															darkMode ? "text-gray-300" : "text-gray-600"
														}`}
													>
														Your message is being delivered with
														military-grade encryption
													</p>

													<div className="mt-4 flex flex-col items-center">
														<div
															className={`w-full h-2 rounded-full overflow-hidden ${
																darkMode ? "bg-gray-700" : "bg-gray-200"
															}`}
														>
															<div className="h-full bg-green-500 rounded-full w-2/3 animate-progress"></div>
														</div>
														<p
															className={`text-xs mt-2 ${
																darkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															Message secured and in transit
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Step 4 */}
							<div className="relative">
								<div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
									<div className="order-1 relative">
										{/* The numbered circle for desktop */}
										<div className="hidden lg:flex absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl items-center justify-center shadow-lg">
											4
										</div>

										<div
											className={`rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 border ${
												darkMode
													? "bg-gray-750 border-gray-700"
													: "bg-white border-gray-200"
											}`}
										>
											<div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
											<div className="p-6">
												<div className="flex justify-between items-center mb-6">
													<div className="flex items-center">
														<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
															<span className="text-lg font-bold text-indigo-600">
																A
															</span>
														</div>
														<div className="ml-3">
															<p
																className={`text-sm font-medium ${
																	darkMode ? "text-white" : "text-gray-900"
																}`}
															>
																Alex Chen
															</p>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																alex@company.com
															</p>
														</div>
													</div>
													<span
														className={`text-xs font-medium ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														STEP 4
													</span>
												</div>

												<div
													className={`rounded-lg p-4 mb-4 ${
														darkMode ? "bg-gray-800" : "bg-gray-50"
													}`}
												>
													<div className="flex items-center justify-between mb-3">
														<h4
															className={`text-base font-semibold ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Confidential Project Update
														</h4>
														<span
															className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
																darkMode
																	? "bg-green-900 text-green-200"
																	: "bg-green-100 text-green-800"
															}`}
														>
															<LucideIcons.Lock className="mr-1 h-3 w-3" />
															Decrypted
														</span>
													</div>
													<p
														className={`text-sm ${
															darkMode ? "text-gray-300" : "text-gray-700"
														}`}
													>
														Here's the latest update on our confidential
														project. Please review the attached documents and
														let me know your thoughts.
													</p>
													<div className="mt-3 flex items-center">
														<div
															className={`flex items-center px-3 py-1 rounded-md text-xs ${
																darkMode
																	? "bg-gray-700 text-gray-300"
																	: "bg-gray-100 text-gray-700"
															}`}
														>
															<LucideIcons.FileText
																className={`h-3.5 w-3.5 mr-1.5 ${
																	darkMode
																		? "text-indigo-400"
																		: "text-indigo-600"
																}`}
															/>
															project-update.pdf (2.4 MB)
														</div>
													</div>
												</div>

												<div className="flex justify-between">
													<button
														type="button"
														className={`px-3 py-1.5 border text-sm font-medium rounded-md transition-colors duration-200 flex items-center ${
															darkMode
																? "border-gray-600 text-gray-300 hover:bg-gray-700"
																: "border-gray-300 text-gray-700 hover:bg-gray-50"
														}`}
													>
														<LucideIcons.Reply className="mr-1.5 h-4 w-4" />
														Reply
													</button>
													<button
														type="button"
														className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200 flex items-center"
													>
														<LucideIcons.Download className="mr-1.5 h-4 w-4" />
														Download
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-8 lg:mt-0 lg:pl-12 text-center lg:text-left order-2">
										<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mb-4 lg:mb-0 lg:hidden">
											4
										</span>
										<h3
											className={`text-2xl font-bold mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Secure Reading
										</h3>
										<p
											className={darkMode ? "text-gray-300" : "text-gray-600"}
										>
											Recipients can securely view and reply to your encrypted
											emails. They'll know exactly when messages will expire
											and can access password-protected files.
										</p>
										<div
											className={`mt-6 rounded-lg p-4 shadow-md inline-block text-left ${
												darkMode ? "bg-gray-750" : "bg-white"
											}`}
										>
											<div className="flex items-start">
												<LucideIcons.Eye
													className={`h-5 w-5 mt-0.5 mr-2 ${
														darkMode ? "text-indigo-400" : "text-indigo-600"
													}`}
												/>
												<div>
													<p
														className={`text-sm font-medium ${
															darkMode ? "text-white" : "text-gray-900"
														}`}
													>
														Read receipts (optional)
													</p>
													<p
														className={`text-xs mt-1 ${
															darkMode ? "text-gray-400" : "text-gray-500"
														}`}
													>
														Know exactly when your message is read
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Call to action within how it works */}
				<div className="mt-20 text-center">
					<div className="inline-block p-0.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
						<div
							className={`rounded-lg px-6 py-8 sm:px-10 sm:py-10 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<h3
								className={`text-2xl font-bold mb-4 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Ready to secure your communications?
							</h3>
							<p
								className={`text-lg mb-8 ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								Join thousands of users who trust PrivaMail for their
								confidential communications.
							</p>
							<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
								<Link
									href="/register"
									className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
								>
									<LucideIcons.UserPlus className="mr-2 h-5 w-5" />
									Create Free Account
								</Link>
								<button
									onClick={handleDemoLogin}
									className={`px-6 py-3 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center ${
										darkMode
											? "bg-gray-700 text-indigo-400"
											: "bg-white text-indigo-600"
									}`}
								>
									<LucideIcons.Play className="mr-2 h-5 w-5" />
									Try Instant Demo
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
