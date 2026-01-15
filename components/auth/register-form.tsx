"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface RegisterFormProps {
	onSubmit: (data: any) => Promise<void>;
	onSocialLogin: (provider: "google" | "facebook") => void;
	isLoading: boolean;
}

export function RegisterForm({
	onSubmit,
	onSocialLogin,
	isLoading,
}: RegisterFormProps) {
	const { darkMode } = useTheme();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Password strength checker
	const checkPasswordStrength = (password: string): number => {
		let strength = 0;
		if (password.length >= 8) strength += 1;
		if (/[A-Z]/.test(password)) strength += 1;
		if (/[a-z]/.test(password)) strength += 1;
		if (/[0-9]/.test(password)) strength += 1;
		if (/[^A-Za-z0-9]/.test(password)) strength += 1;
		return strength;
	};

	const getPasswordStrengthLabel = (strength: number): string => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		if (strength === 4) return "Strong";
		return "Very Strong";
	};

	const getPasswordStrengthColor = (strength: number): string => {
		if (strength === 0) return "bg-red-500";
		if (strength === 1) return "bg-red-400";
		if (strength === 2) return "bg-yellow-500";
		if (strength === 3) return "bg-yellow-400";
		if (strength === 4) return "bg-green-500";
		return "bg-green-400";
	};

	const passwordStrength = checkPasswordStrength(formData.password);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});

		if (errors[name]) {
			setErrors({ ...errors, [name]: "" });
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		} else if (checkPasswordStrength(formData.password) < 3) {
			newErrors.password = "Password is too weak";
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms = "You must agree to the terms and conditions";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			await onSubmit(formData);
		}
	};

	return (
		<>
			{/* Social Login Buttons */}
			<div className="flex justify-center space-x-4 mb-8">
				<button
					type="button"
					onClick={() => onSocialLogin("google")}
					disabled={isLoading}
					className={`flex items-center justify-center py-2.5 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
						darkMode
							? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
							: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
					}`}
				>
					<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
					Google
				</button>
				<button
					type="button"
					onClick={() => onSocialLogin("facebook")}
					disabled={isLoading}
					className={`flex items-center justify-center py-2.5 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
						darkMode
							? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
							: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
					}`}
				>
					<svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
						<path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
					</svg>
					Facebook
				</button>
			</div>

			<div className="flex items-center justify-center mb-8">
				<div
					className={`flex-grow border-t ${
						darkMode ? "border-gray-600" : "border-gray-300"
					}`}
				></div>
				<span
					className={`flex-shrink mx-4 text-sm ${
						darkMode ? "text-gray-400" : "text-gray-500"
					}`}
				>
					or with email
				</span>
				<div
					className={`flex-grow border-t ${
						darkMode ? "border-gray-600" : "border-gray-300"
					}`}
				></div>
			</div>

			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="rounded-md -space-y-px">
					<div className="mb-5">
						<label
							htmlFor="name"
							className={`block text-sm font-medium mb-1 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Full name
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<LucideIcons.User className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="name"
								name="name"
								type="text"
								autoComplete="name"
								required
								value={formData.name}
								onChange={handleChange}
								className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
									darkMode
										? "border-gray-600 bg-gray-700 text-white"
										: "border-gray-300 bg-white text-gray-900"
								}`}
								placeholder="John Smith"
							/>
						</div>
						{errors.name && (
							<p
								className={`mt-1 text-sm ${
									darkMode ? "text-red-400" : "text-red-600"
								}`}
							>
								{errors.name}
							</p>
						)}
					</div>

					<div className="mb-5">
						<label
							htmlFor="email-address"
							className={`block text-sm font-medium mb-1 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Email address
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<LucideIcons.Mail className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={formData.email}
								onChange={handleChange}
								className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
									darkMode
										? "border-gray-600 bg-gray-700 text-white"
										: "border-gray-300 bg-white text-gray-900"
								}`}
								placeholder="you@example.com"
							/>
						</div>
						{errors.email && (
							<p
								className={`mt-1 text-sm ${
									darkMode ? "text-red-400" : "text-red-600"
								}`}
							>
								{errors.email}
							</p>
						)}
					</div>

					<div className="mb-5">
						<label
							htmlFor="password"
							className={`block text-sm font-medium mb-1 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<LucideIcons.KeyRound className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="new-password"
								required
								value={formData.password}
								onChange={handleChange}
								className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
									darkMode
										? "border-gray-600 bg-gray-700 text-white"
										: "border-gray-300 bg-white text-gray-900"
								}`}
								placeholder="••••••••"
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="text-gray-400 hover:text-gray-500 focus:outline-none"
								>
									{showPassword ? (
										<LucideIcons.EyeOff className="h-5 w-5" />
									) : (
										<LucideIcons.Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>

						{/* Password strength indicator */}
						{formData.password && (
							<div className="mt-2">
								<div className="flex items-center justify-between mb-1">
									<div
										className={`text-xs font-medium ${
											darkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Password strength: {getPasswordStrengthLabel(passwordStrength)}
									</div>
									<div
										className={`text-xs font-medium ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										{passwordStrength}/5
									</div>
								</div>
								<div
									className={`w-full h-2 rounded-full overflow-hidden ${
										darkMode ? "bg-gray-700" : "bg-gray-200"
									}`}
								>
									<div
										className={`h-full ${getPasswordStrengthColor(
											passwordStrength
										)} rounded-full`}
										style={{ width: `${(passwordStrength / 5) * 100}%` }}
									></div>
								</div>
							</div>
						)}

						{errors.password && (
							<p
								className={`mt-1 text-sm ${
									darkMode ? "text-red-400" : "text-red-600"
								}`}
							>
								{errors.password}
							</p>
						)}
					</div>

					<div className="mb-5">
						<label
							htmlFor="confirm-password"
							className={`block text-sm font-medium mb-1 ${
								darkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Confirm Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<LucideIcons.KeyRound className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="confirm-password"
								name="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								autoComplete="new-password"
								required
								value={formData.confirmPassword}
								onChange={handleChange}
								className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
									darkMode
										? "border-gray-600 bg-gray-700 text-white"
										: "border-gray-300 bg-white text-gray-900"
								}`}
								placeholder="••••••••"
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="text-gray-400 hover:text-gray-500 focus:outline-none"
								>
									{showConfirmPassword ? (
										<LucideIcons.EyeOff className="h-5 w-5" />
									) : (
										<LucideIcons.Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
						{errors.confirmPassword && (
							<p
								className={`mt-1 text-sm ${
									darkMode ? "text-red-400" : "text-red-600"
								}`}
							>
								{errors.confirmPassword}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center">
					<input
						id="agree-terms"
						name="agreeToTerms"
						type="checkbox"
						checked={formData.agreeToTerms}
						onChange={handleChange}
						className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded ${
							darkMode ? "border-gray-700" : "border-gray-300"
						}`}
					/>
					<label
						htmlFor="agree-terms"
						className={`ml-2 block text-sm ${
							darkMode ? "text-gray-300" : "text-gray-700"
						}`}
					>
						I agree to the{" "}
						<a
							href="#"
							className={`font-medium transition-colors duration-200 ${
								darkMode
									? "text-indigo-400 hover:text-indigo-300"
									: "text-indigo-600 hover:text-indigo-500"
							}`}
						>
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							href="#"
							className={`font-medium transition-colors duration-200 ${
								darkMode
									? "text-indigo-400 hover:text-indigo-300"
									: "text-indigo-600 hover:text-indigo-500"
							}`}
						>
							Privacy Policy
						</a>
					</label>
				</div>
				{errors.agreeToTerms && (
					<p
						className={`text-sm ${
							darkMode ? "text-red-400" : "text-red-600"
						}`}
					>
						{errors.agreeToTerms}
					</p>
				)}

				<div>
					<button
						type="submit"
						disabled={isLoading}
						className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
							isLoading ? "opacity-70 cursor-not-allowed" : ""
						}`}
					>
						{isLoading ? (
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
								Creating Account...
							</div>
						) : (
							<div className="flex items-center">
								<LucideIcons.UserPlus className="mr-2 h-5 w-5" />
								Create Account
							</div>
						)}
					</button>
				</div>
			</form>
		</>
	);
}
