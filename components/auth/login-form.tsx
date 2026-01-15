"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/components/providers/auth-provider";

interface LoginFormProps {
	onSocialLoginClick: (provider: "google" | "facebook") => void;
	disableAll: boolean;
	onLoadingChange: (isLoading: boolean) => void;
}

export function LoginForm({
	onSocialLoginClick,
	disableAll,
	onLoadingChange,
}: LoginFormProps) {
	const { darkMode } = useTheme();
	const { login } = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoadingComp, setIsLoadingComp] = useState(false); // Local loading state for visual feedback

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		onLoadingChange(true);
		setIsLoadingComp(true);
		setError("");

		if (!email) {
			setError("Email is required");
			onLoadingChange(false);
			setIsLoadingComp(false);
			return;
		}

		if (!password) {
			setError("Password is required");
			onLoadingChange(false);
			setIsLoadingComp(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Login failed");
			}

			const { user } = await response.json();
			toast.success("Login successful!");
			login(user); // Updates context and redirects
		} catch (error: any) {
			setError(error.message || "An error occurred during login.");
			onLoadingChange(false);
			setIsLoadingComp(false);
		}
	};

	return (
		<div
			className={`max-w-md w-full space-y-8 p-10 rounded-2xl shadow-2xl backdrop-blur-sm border relative z-10 ${
				darkMode
					? "bg-gray-800/80 border-gray-700/50"
					: "bg-white/80 border-gray-200/50"
			}`}
		>
			<div className="text-center">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="h-16 w-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
							<LucideIcons.Shield className="h-8 w-8" />
						</div>
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
					</div>
				</div>
				<h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					Welcome Back
				</h2>
				<p
					className={`mt-3 text-sm ${
						darkMode ? "text-gray-400" : "text-gray-600"
					}`}
				>
					Sign in to your PrivaMail account or{" "}
					<Link
						href="/register"
						className={`font-medium transition-colors duration-200 ${
							darkMode
								? "text-indigo-400 hover:text-indigo-300"
								: "text-indigo-600 hover:text-indigo-500"
						}`}
					>
						create a new account
					</Link>
				</p>
			</div>

			<div className="space-y-3">
				<button
					type="button"
					onClick={() => onSocialLoginClick("google")}
					disabled={disableAll}
					className={`relative w-full flex items-center justify-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${
						darkMode
							? "border-gray-600 text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 hover:border-gray-500"
							: "border-gray-300 text-gray-700 bg-white/50 hover:bg-white/70 hover:border-gray-400"
					} ${disableAll ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					<svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Continue with Google
				</button>

				<button
					type="button"
					onClick={() => onSocialLoginClick("facebook")}
					disabled={disableAll}
					className={`relative w-full flex items-center justify-center py-3 px-4 border rounded-xl shadow-sm text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${
						darkMode
							? "border-gray-600 text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 hover:border-gray-500"
							: "border-gray-300 text-gray-700 bg-white/50 hover:bg-white/70 hover:border-gray-400"
					} ${disableAll ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					<svg className="h-5 w-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
						<path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
					</svg>
					Continue with Facebook
				</button>
			</div>

			<div className="flex items-center justify-center">
				<div
					className={`flex-grow border-t ${
						darkMode ? "border-gray-600" : "border-gray-300"
					}`}
				></div>
				<span
					className={`flex-shrink mx-4 text-sm font-medium ${
						darkMode ? "text-gray-400" : "text-gray-500"
					}`}
				>
					or continue with email
				</span>
				<div
					className={`flex-grow border-t ${
						darkMode ? "border-gray-600" : "border-gray-300"
					}`}
				></div>
			</div>

			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="space-y-5">
					<div>
						<label
							htmlFor="email-address"
							className={`block text-sm font-medium mb-2 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Email address
						</label>
						<div className="relative group">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<LucideIcons.Mail
									className={`h-5 w-5 transition-colors ${
										email ? "text-indigo-500" : "text-gray-400"
									}`}
								/>
							</div>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`appearance-none block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 sm:text-sm ${
									darkMode
										? "border-gray-600 bg-gray-700/50 text-white focus:bg-gray-700"
										: "border-gray-300 bg-white/50 text-gray-900 focus:bg-white"
								}`}
								placeholder="you@example.com"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="password"
							className={`block text-sm font-medium mb-2 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Password
						</label>
						<div className="relative group">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<LucideIcons.KeyRound
									className={`h-5 w-5 transition-colors ${
										password ? "text-indigo-500" : "text-gray-400"
									}`}
								/>
							</div>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`appearance-none block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 sm:text-sm ${
									darkMode
										? "border-gray-600 bg-gray-700/50 text-white focus:bg-gray-700"
										: "border-gray-300 bg-white/50 text-gray-900 focus:bg-white"
								}`}
								placeholder="••••••••"
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
								>
									{showPassword ? (
										<LucideIcons.EyeOff className="h-5 w-5" />
									) : (
										<LucideIcons.Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
					</div>
				</div>

				{error && (
					<div
						className={`rounded-xl p-4 border ${
							darkMode
								? "bg-red-900/20 border-red-800/50"
								: "bg-red-50 border-red-200"
						}`}
					>
						<div className="flex">
							<div className="flex-shrink-0">
								<LucideIcons.AlertCircle className="h-5 w-5 text-red-400" />
							</div>
							<div className="ml-3">
								<h3
									className={`text-sm font-medium ${
										darkMode ? "text-red-200" : "text-red-800"
									}`}
								>
									{error}
								</h3>
							</div>
						</div>
					</div>
				)}

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
							className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-200"
						/>
						<label
							htmlFor="remember-me"
							className={`ml-2 block text-sm ${
								darkMode ? "text-gray-300" : "text-gray-900"
							}`}
						>
							Remember me
						</label>
					</div>

					<div className="text-sm">
						<a
							href="#"
							className={`font-medium transition-colors duration-200 hover:underline ${
								darkMode
									? "text-indigo-400 hover:text-indigo-300"
									: "text-indigo-600 hover:text-indigo-500"
							}`}
						>
							Forgot password?
						</a>
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={disableAll || isLoadingComp}
						className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
							disableAll || isLoadingComp ? "opacity-70 cursor-not-allowed" : ""
						}`}
					>
						{isLoadingComp ? (
							<div className="flex items-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Signing in...
							</div>
						) : (
							<div className="flex items-center">
								<LucideIcons.LogIn className="mr-2 h-5 w-5" />
								Sign in to PrivaMail
							</div>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
