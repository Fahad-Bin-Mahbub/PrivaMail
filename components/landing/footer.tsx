"use client";

import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function Footer() {
	const { darkMode, toggleDarkMode } = useTheme();

	return (
		<footer className={darkMode ? "bg-gray-900" : "bg-white"}>
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center">
							<div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
								<LucideIcons.Shield className="h-6 w-6" />
							</div>
							<span
								className={`ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
									darkMode
										? "from-indigo-400 to-purple-400"
										: "from-indigo-600 to-purple-600"
								}`}
							>
								PrivaMail
							</span>
						</div>
						<p
							className={`mt-4 max-w-md ${
								darkMode ? "text-gray-400" : "text-gray-500"
							}`}
						>
							Secure your email communications with military-grade encryption.
							Protect your privacy and stay compliant with data protection
							regulations without changing your email address.
						</p>
						<div className="mt-6 flex space-x-6">
							<a
								href="#"
								className={`transition-colors duration-200 ${
									darkMode
										? "text-gray-400 hover:text-indigo-400"
										: "text-gray-400 hover:text-indigo-600"
								}`}
								aria-label="Twitter"
							>
								<LucideIcons.Twitter className="h-6 w-6" />
							</a>
							<a
								href="#"
								className={`transition-colors duration-200 ${
									darkMode
										? "text-gray-400 hover:text-indigo-400"
										: "text-gray-400 hover:text-indigo-600"
								}`}
								aria-label="LinkedIn"
							>
								<LucideIcons.Linkedin className="h-6 w-6" />
							</a>
							<a
								href="#"
								className={`transition-colors duration-200 ${
									darkMode
										? "text-gray-400 hover:text-indigo-400"
										: "text-gray-400 hover:text-indigo-600"
								}`}
								aria-label="GitHub"
							>
								<LucideIcons.Github className="h-6 w-6" />
							</a>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
							Product
						</h3>
						<ul className="mt-4 space-y-4">
							<li>
								<a
									href="#"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#how-it-works"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									How It Works
								</a>
							</li>
							<li>
								<a
									href="#pricing"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Roadmap
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
							Support
						</h3>
						<ul className="mt-4 space-y-4">
							<li>
								<a
									href="#"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Contact Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className={`text-base transition-colors duration-200 ${
										darkMode
											? "text-gray-400 hover:text-indigo-400"
											: "text-gray-500 hover:text-indigo-600"
									}`}
								>
									Terms of Service
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div
					className={`mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center ${
						darkMode ? "border-gray-700" : "border-gray-200"
					}`}
				>
					<p className="text-base text-gray-400 text-center sm:text-left">
						&copy; {new Date().getFullYear()} PrivaMail. All rights reserved.
					</p>
					<div className="mt-4 sm:mt-0">
						<button
							onClick={toggleDarkMode}
							className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
								darkMode
									? "text-gray-400 hover:text-indigo-400 hover:bg-gray-800"
									: "text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
							}`}
							aria-label="Toggle dark mode"
						>
							{darkMode ? (
								<LucideIcons.Sun className="h-5 w-5" />
							) : (
								<LucideIcons.Moon className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
