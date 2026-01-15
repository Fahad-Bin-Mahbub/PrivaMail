"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function NavBar() {
	const { darkMode, toggleDarkMode } = useTheme();
	const [menuOpen, setMenuOpen] = useState(false);

	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
		setMenuOpen(false);
	};

	return (
		<nav
			className={`sticky top-0 z-50 border-b shadow-sm ${
				darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
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
						<div className="hidden sm:ml-8 sm:flex sm:space-x-8 items-center">
							<a
								href="#features"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection("features");
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
							>
								Features
							</a>
							<a
								href="#how-it-works"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection("how-it-works");
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
							>
								How It Works
							</a>
							<a
								href="#pricing"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection("pricing");
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
							>
								Pricing
							</a>
						</div>
					</div>
					<div className="flex items-center">
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
						<div className="ml-4 flex items-center space-x-4">
							<Link
								href="/login"
								className={`hidden md:inline-flex px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:text-indigo-400"
										: "text-gray-500 hover:text-indigo-600"
								}`}
							>
								Log in
							</Link>
							<Link
								href="/register"
								className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5"
							>
								Register
							</Link>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden ml-2">
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
									darkMode
										? "text-gray-400 hover:text-indigo-400 hover:bg-gray-800"
										: "text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
								}`}
							>
								{menuOpen ? (
									<LucideIcons.X className="h-6 w-6" />
								) : (
									<LucideIcons.Menu className="h-6 w-6" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						className="md:hidden"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div
							className={`px-2 pt-2 pb-3 space-y-1 border-t ${
								darkMode ? "border-gray-700" : "border-gray-200"
							}`}
						>
							<a
								href="#features"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection("features");
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
							>
								Features
							</a>
							<a
								href="#how-it-works"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection("how-it-works");
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
							>
								How It Works
							</a>
							<a
								href="#pricing"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection("pricing");
								}}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
							>
								Pricing
							</a>
							<Link
								href="/login"
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
									darkMode
										? "text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
										: "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
								}`}
								onClick={() => setMenuOpen(false)}
							>
								Log in
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
