"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSpring, animated  } from "@react-spring/web";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/lib/types";
import { useAuth } from "@/components/providers/auth-provider";
import { DeleteAccountModal } from "./settings/delete-account-modal";
import { AddKeyModal } from "./settings/add-key-modal";
import { AddAccountModal } from "./settings/add-account-modal";

interface SettingsProps {
	user: User | null;
	darkMode: boolean;
}

export function Settings({ user, darkMode }: SettingsProps) {
	const router = useRouter();
	const { updateUser } = useAuth();
	const [activeTab, setActiveTab] = useState("general");
	const [profileName, setProfileName] = useState(user?.name || "");
	const [profileEmail, setProfileEmail] = useState(user?.email || "");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddKeyModal, setShowAddKeyModal] = useState(false);
	const [showAddAccountModal, setShowAddAccountModal] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isGeneratingKey, setIsGeneratingKey] = useState(false);
	const [keyName, setKeyName] = useState("");
	const [keyBits, setKeyBits] = useState("4096");

	// Animation for content
	const contentAnimation = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { tension: 280, friction: 24 },
	});

	// Handle save profile
	const handleSaveProfile = () => {
		setIsSaving(true);
		// Simulate API call
		setTimeout(() => {
			updateUser({ name: profileName, email: profileEmail });
			toast.success("Profile updated successfully");
			setIsSaving(false);
		}, 1000);
	};

	// Handle key generation
	const handleGenerateKey = (
		e: React.FormEvent,
		keyName: string,
		keyBits: string
	) => {
		e.preventDefault();
		if (!keyName) {
			toast.error("Key name is required");
			return;
		}
		setIsGeneratingKey(true);
		setTimeout(() => {
			toast.success("New encryption key generated successfully");
			setIsGeneratingKey(false);
			setShowAddKeyModal(false);
			// setKeyName(""); // Handled in modal or here
		}, 2000);
	};

	// Handle add email account
	const handleAddAccount = (provider: string) => {
		toast.success(`Connected to ${provider} successfully`);
		setShowAddAccountModal(false);
	};

	return (
		<div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex justify-between items-center mb-6">
					<h1
						className={`text-2xl font-bold flex items-center ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						<LucideIcons.Settings
							className={`mr-2 h-6 w-6 ${
								darkMode ? "text-indigo-400" : "text-indigo-600"
							}`}
						/>
						Settings
					</h1>
					<button
						onClick={() => router.push("/dashboard")}
						className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
							darkMode
								? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
								: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
						}`}
					>
						<LucideIcons.ArrowLeft className="mr-1.5 h-5 w-5" />
						Back to Inbox
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* Sidebar */}
					<div className="md:col-span-1">
						<div
							className={`shadow rounded-lg overflow-hidden ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
                            {/* Profile Info */}
							<div
								className={`p-4 border-b ${
									darkMode ? "border-gray-700" : "border-gray-200"
								}`}
							>
								<div className="flex items-center space-x-3">
									<img
										src={
											user?.profileImage ||
											`https://ui-avatars.com/api/?name=${
												user?.name || "User"
											}&background=6366f1&color=fff`
										}
										alt={user?.name || "User"}
										className="h-12 w-12 rounded-full"
									/>
									<div>
										<h3
											className={`text-sm font-medium ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											{user?.name}
										</h3>
										<p
											className={`text-xs ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											{user?.email}
										</p>
									</div>
								</div>
							</div>
                            {/* Navigation */}
							<nav className="space-y-1 p-2" aria-label="Settings">
								{[
									{ id: "general", icon: LucideIcons.User, label: "General" },
									{ id: "security", icon: LucideIcons.Shield, label: "Security" },
									{
										id: "encryption",
										icon: LucideIcons.Key,
										label: "Encryption Keys",
									},
									{
										id: "accounts",
										icon: LucideIcons.Mail,
										label: "Connected Accounts",
									},
									{
										id: "notifications",
										icon: LucideIcons.Bell,
										label: "Notifications",
									},
									{ id: "billing", icon: LucideIcons.CreditCard, label: "Billing" },
								].map((item) => (
									<button
										key={item.id}
										onClick={() => setActiveTab(item.id)}
										className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
											activeTab === item.id
												? darkMode
													? "bg-indigo-900 bg-opacity-40 text-indigo-200"
													: "bg-indigo-50 text-indigo-700"
												: darkMode
												? "text-gray-300 hover:bg-gray-750 transition-colors duration-200"
												: "text-gray-700 hover:bg-gray-100 transition-colors duration-200"
										}`}
									>
										<item.icon className="mr-3 h-5 w-5" />
										{item.label}
									</button>
								))}
							</nav>
						</div>
					</div>

					{/* Main content */}
					<div className="md:col-span-3">
						<animated.div style={contentAnimation}>
							<div
								className={`shadow rounded-lg ${
									darkMode ? "bg-gray-800" : "bg-white"
								}`}
							>
								{/* General Settings */}
								{activeTab === "general" && (
									<div className="p-6">
										<h2
											className={`text-lg font-medium mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Profile Information
										</h2>
										<div className="space-y-6">
											<div>
												<label
													htmlFor="name"
													className={`block text-sm font-medium ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Name
												</label>
												<div className="mt-1">
													<input
														type="text"
														id="name"
														value={profileName}
														onChange={(e) => setProfileName(e.target.value)}
														className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
															darkMode
																? "border-gray-600 bg-gray-700 text-white"
																: "border-gray-300 bg-white text-gray-900"
														}`}
													/>
												</div>
											</div>

											<div>
												<label
													htmlFor="email"
													className={`block text-sm font-medium ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Email
												</label>
												<div className="mt-1">
													<input
														type="email"
														id="email"
														value={profileEmail}
														onChange={(e) => setProfileEmail(e.target.value)}
														className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
															darkMode
																? "border-gray-600 bg-gray-700 text-white"
																: "border-gray-300 bg-white text-gray-900"
														}`}
													/>
												</div>
											</div>

											<div>
												<label
													htmlFor="profile-picture"
													className={`block text-sm font-medium ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Profile Picture
												</label>
												<div className="mt-1 flex items-center space-x-4">
													<img
														src={
															user?.profileImage ||
															`https://ui-avatars.com/api/?name=${
																user?.name || "User"
															}&background=6366f1&color=fff`
														}
														alt={user?.name || "User"}
														className="h-16 w-16 rounded-full"
													/>
													<button
														type="button"
														className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
															darkMode
																? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
														}`}
													>
														<LucideIcons.Upload className="mr-1.5 h-4 w-4" />
														Change Picture
													</button>
												</div>
											</div>

											<div>
												<label
													htmlFor="language"
													className={`block text-sm font-medium ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Language
												</label>
												<div className="mt-1">
													<select
														id="language"
														className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
															darkMode
																? "border-gray-600 bg-gray-700 text-white"
																: "border-gray-300 bg-white text-gray-900"
														}`}
														defaultValue="en"
													>
														<option value="en">English</option>
														<option value="fr">Français</option>
														<option value="es">Español</option>
														<option value="de">Deutsch</option>
														<option value="ja">日本語</option>
													</select>
												</div>
											</div>

											<div>
												<label
													htmlFor="timezone"
													className={`block text-sm font-medium ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Timezone
												</label>
												<div className="mt-1">
													<select
														id="timezone"
														className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
															darkMode
																? "border-gray-600 bg-gray-700 text-white"
																: "border-gray-300 bg-white text-gray-900"
														}`}
														defaultValue="utc"
													>
														<option value="utc">UTC (GMT+0)</option>
														<option value="est">Eastern Time (GMT-5)</option>
														<option value="cst">Central Time (GMT-6)</option>
														<option value="mst">Mountain Time (GMT-7)</option>
														<option value="pst">Pacific Time (GMT-8)</option>
													</select>
												</div>
											</div>

											<div
												className={`border-t pt-5 ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<div className="flex justify-end">
													<button
														type="button"
														onClick={handleSaveProfile}
														disabled={isSaving}
														className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
															isSaving ? "opacity-70 cursor-not-allowed" : ""
														}`}
													>
														{isSaving ? (
															<>
																<svg
																	className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
																Saving...
															</>
														) : (
															<>
																<LucideIcons.Save className="mr-1.5 h-4 w-4" />
																Save Changes
															</>
														)}
													</button>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Security Settings */}
								{activeTab === "security" && (
									<div className="p-6">
										<h2
											className={`text-lg font-medium mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Security Settings
										</h2>
										<div className="space-y-6">
											<div>
												<h3
													className={`text-base font-medium ${
														darkMode ? "text-white" : "text-gray-900"
													}`}
												>
													Change Password
												</h3>
												<div className="mt-3 space-y-4">
													<div>
														<label
															htmlFor="current-password"
															className={`block text-sm font-medium ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Current Password
														</label>
														<div className="mt-1">
															<input
																type="password"
																id="current-password"
																className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
																	darkMode
																		? "border-gray-600 bg-gray-700 text-white"
																		: "border-gray-300 bg-white text-gray-900"
																}`}
																placeholder="••••••••"
															/>
														</div>
													</div>
													<div>
														<label
															htmlFor="new-password"
															className={`block text-sm font-medium ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															New Password
														</label>
														<div className="mt-1">
															<input
																type="password"
																id="new-password"
																className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
																	darkMode
																		? "border-gray-600 bg-gray-700 text-white"
																		: "border-gray-300 bg-white text-gray-900"
																}`}
																placeholder="••••••••"
															/>
														</div>
													</div>
													<div>
														<label
															htmlFor="confirm-password"
															className={`block text-sm font-medium ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Confirm New Password
														</label>
														<div className="mt-1">
															<input
																type="password"
																id="confirm-password"
																className={`shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md ${
																	darkMode
																		? "border-gray-600 bg-gray-700 text-white"
																		: "border-gray-300 bg-white text-gray-900"
																}`}
																placeholder="••••••••"
															/>
														</div>
													</div>
													<div className="flex justify-end">
														<button
															type="button"
															className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
														>
															<LucideIcons.Check className="mr-1.5 h-4 w-4" />
															Update Password
														</button>
													</div>
												</div>
											</div>

											<div
												className={`border-t pt-6 ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<h3
													className={`text-base font-medium ${
														darkMode ? "text-white" : "text-gray-900"
													}`}
												>
													Two-Factor Authentication
												</h3>
												<div className="mt-3">
													<div className="flex items-center justify-between">
														<div>
															<p
																className={`text-sm ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Add an extra layer of security to your account
																by requiring a verification code in addition to
																your password.
															</p>
														</div>
														<div className="ml-4 relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
															<input
																type="checkbox"
																name="toggle-2fa"
																id="toggle-2fa"
																className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
																	darkMode
																		? "bg-gray-300 border-gray-600"
																		: "bg-white border-gray-300"
																}`}
																defaultChecked={user?.twoFactorEnabled}
															/>
															<label
																htmlFor="toggle-2fa"
																className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
																	user?.twoFactorEnabled
																		? "bg-indigo-600"
																		: darkMode
																		? "bg-gray-600"
																		: "bg-gray-300"
																}`}
															></label>
														</div>
													</div>
													{user?.twoFactorEnabled && (
														<div className="mt-4">
															<button
																type="button"
																className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																	darkMode
																		? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																		: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																}`}
															>
																<LucideIcons.Settings className="mr-1 h-3 w-3" />
																Configure
															</button>
															<button
																type="button"
																className={`ml-2 inline-flex items-center px-3 py-1.5 border shadow-sm text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																	darkMode
																		? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																		: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																}`}
															>
																<LucideIcons.RefreshCw className="mr-1 h-3 w-3" />
																Reset Backup Codes
															</button>
														</div>
													)}
												</div>
											</div>
                                            
                                            {/* Login History */}
											<div
												className={`border-t pt-6 ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<h3
													className={`text-base font-medium ${
														darkMode ? "text-white" : "text-gray-900"
													}`}
												>
													Login History
												</h3>
												<p
													className={`mt-1 text-sm ${
														darkMode ? "text-gray-400" : "text-gray-500"
													}`}
												>
													Recent login activity for your account.
												</p>
												<div className="mt-3">
													<div
														className={`shadow overflow-hidden border sm:rounded-md ${
															darkMode
																? "bg-gray-750 border-gray-700"
																: "bg-gray-50 border-gray-200"
														}`}
													>
														<ul
															className={`divide-y ${
																darkMode ? "divide-gray-700" : "divide-gray-200"
															}`}
														>
															{[
																{
																	date: "June 30, 2025, 10:23 AM",
																	device: "Chrome on Windows",
																	location: "Netrakona, BD",
																	current: true,
																},
																{
																	date: "June 28, 2025, 3:45 PM",
																	device: "Firefox on macOS",
																	location: "Netrakona, BD",
																	current: false,
																},
																{
																	date: "June 25, 2025, 9:12 AM",
																	device: "Safari on iPhone",
																	location: "Dhaka, BD",
																	current: false,
																},
															].map((session, index) => (
																<li key={index}>
																	<div className="px-4 py-4 sm:px-6">
																		<div className="flex items-center justify-between">
																			<div className="flex items-center">
																				<LucideIcons.Monitor className="h-5 w-5 text-gray-400 mr-3" />
																				<p
																					className={`text-sm font-medium truncate ${
																						darkMode
																							? "text-white"
																							: "text-gray-900"
																					}`}
																				>
																					{session.device}
																				</p>
																				{session.current && (
																					<span
																						className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
																							darkMode
																								? "bg-green-900 text-green-200"
																								: "bg-green-100 text-green-800"
																						}`}
																					>
																						Current
																					</span>
																				)}
																			</div>
																			<div className="ml-2 flex-shrink-0">
																				<button
																					type="button"
																					className={`inline-flex items-center px-2.5 py-1.5 border shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																						darkMode
																							? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
																							: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
																					}`}
																				>
																					Sign Out
																				</button>
																			</div>
																		</div>
																		<div className="mt-2 sm:flex sm:justify-between">
																			<div className="sm:flex">
																				<p
																					className={`flex items-center text-sm ${
																						darkMode
																							? "text-gray-400"
																							: "text-gray-500"
																					}`}
																				>
																					<LucideIcons.MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
																					{session.location}
																				</p>
																			</div>
																			<div
																				className={`mt-2 flex items-center text-sm sm:mt-0 ${
																					darkMode
																						? "text-gray-400"
																						: "text-gray-500"
																				}`}
																			>
																				<LucideIcons.Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
																				<p>{session.date}</p>
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>
													</div>
												</div>
											</div>

											<div
												className={`border-t pt-6 ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<h3
													className={`text-base font-medium ${
														darkMode ? "text-red-400" : "text-red-600"
													}`}
												>
													Delete Account
												</h3>
												<p
													className={`mt-1 text-sm ${
														darkMode ? "text-gray-400" : "text-gray-500"
													}`}
												>
													Permanently delete your account and all associated
													data. This action cannot be undone.
												</p>
												<div className="mt-3">
													<button
														type="button"
														onClick={() => setShowDeleteModal(true)}
														className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
													>
														<LucideIcons.Trash2 className="mr-1.5 h-4 w-4" />
														Delete Account
													</button>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Encryption Keys Settings */}
								{activeTab === "encryption" && (
									<div className="p-6">
										<div className="flex justify-between items-center mb-4">
											<h2
												className={`text-lg font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Encryption Keys
											</h2>
											<button
												type="button"
												onClick={() => setShowAddKeyModal(true)}
												className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
											>
												<LucideIcons.Plus className="mr-1.5 h-4 w-4" />
												Add New Key
											</button>
										</div>

										<div
											className={`p-4 rounded-md border mb-6 ${
												darkMode
													? "bg-indigo-900 bg-opacity-20 border-indigo-800"
													: "bg-indigo-50 border-indigo-100"
											}`}
										>
											<div className="flex">
												<div className="flex-shrink-0">
													<LucideIcons.Info
														className={`h-5 w-5 ${
															darkMode ? "text-indigo-400" : "text-indigo-600"
														}`}
													/>
												</div>
												<div className="ml-3">
													<h3
														className={`text-sm font-medium ${
															darkMode ? "text-indigo-200" : "text-indigo-800"
														}`}
													>
														About Encryption Keys
													</h3>
													<p
														className={`mt-2 text-sm ${
															darkMode ? "text-indigo-300" : "text-indigo-700"
														}`}
													>
														Encryption keys are used to secure your emails. We
														recommend having at least one active key at all
														times. You can create multiple keys for different
														purposes or contacts.
													</p>
												</div>
											</div>
										</div>

										<div className="space-y-4">
											{/* Default Key */}
											<div
												className={`border rounded-lg overflow-hidden ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<div
													className={`px-4 py-3 border-b ${
														darkMode
															? "bg-gray-750 border-gray-700"
															: "bg-gray-50 border-gray-200"
													}`}
												>
													<div className="flex justify-between items-center">
														<h3
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Default Key
														</h3>
														<span
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
																darkMode
																	? "bg-green-900 text-green-200"
																	: "bg-green-100 text-green-800"
															}`}
														>
															Active
														</span>
													</div>
												</div>
												<div
													className={`px-4 py-4 ${
														darkMode ? "bg-gray-800" : "bg-white"
													}`}
												>
													<div className="grid grid-cols-2 gap-4">
														<div>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">Algorithm:</span>{" "}
																RSA-4096
															</p>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">Created:</span>{" "}
																{new Date().toLocaleDateString()}
															</p>
														</div>
														<div>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">
																	Fingerprint:
																</span>{" "}
																<span className="font-mono">
																	AB:CD:EF:12:34:56
																</span>
															</p>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">Expiration:</span>{" "}
																Never
															</p>
														</div>
													</div>
													<div className="mt-4 flex space-x-2">
														<button
															type="button"
															className={`inline-flex items-center px-2.5 py-1.5 border shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																darkMode
																	? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
																	: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
															}`}
														>
															<LucideIcons.Download className="mr-1 h-4 w-4" />
															Export
														</button>
														<button
															type="button"
															className={`inline-flex items-center px-2.5 py-1.5 border shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																darkMode
																	? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
																	: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
															}`}
														>
															<LucideIcons.RefreshCw className="mr-1 h-4 w-4" />
															Renew
														</button>
													</div>
												</div>
											</div>

											{/* Secondary Key */}
											<div
												className={`border rounded-lg overflow-hidden ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<div
													className={`px-4 py-3 border-b ${
														darkMode
															? "bg-gray-750 border-gray-700"
															: "bg-gray-50 border-gray-200"
													}`}
												>
													<div className="flex justify-between items-center">
														<h3
															className={`text-sm font-medium ${
																darkMode ? "text-white" : "text-gray-900"
															}`}
														>
															Work Key
														</h3>
														<span
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
																darkMode
																	? "bg-yellow-900 text-yellow-200"
																	: "bg-yellow-100 text-yellow-800"
															}`}
														>
															Inactive
														</span>
													</div>
												</div>
												<div
													className={`px-4 py-4 ${
														darkMode ? "bg-gray-800" : "bg-white"
													}`}
												>
													<div className="grid grid-cols-2 gap-4">
														<div>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">Algorithm:</span>{" "}
																RSA-2048
															</p>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">Created:</span>{" "}
																{new Date(
																	Date.now() - 7776000000
																).toLocaleDateString()}{" "}
																{/* 90 days ago */}
															</p>
														</div>
														<div>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">
																	Fingerprint:
																</span>{" "}
																<span className="font-mono">
																	XY:Z1:23:45:67:89
																</span>
															</p>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																<span className="font-medium">Expiration:</span>{" "}
																{new Date(
																	Date.now() + 7776000000
																).toLocaleDateString()}{" "}
																{/* 90 days from now */}
															</p>
														</div>
													</div>
													<div className="mt-4 flex space-x-2">
														<button
															type="button"
															className={`inline-flex items-center px-2.5 py-1.5 border shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																darkMode
																	? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
																	: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
															}`}
														>
															<LucideIcons.Download className="mr-1 h-4 w-4" />
															Export
														</button>
														<button
															type="button"
															className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
														>
															<LucideIcons.Check className="mr-1 h-4 w-4" />
															Set as Active
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Connected Accounts Settings */}
								{activeTab === "accounts" && (
									<div className="p-6">
										<div className="flex justify-between items-center mb-4">
											<h2
												className={`text-lg font-medium ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Connected Email Accounts
											</h2>
											<button
												type="button"
												onClick={() => setShowAddAccountModal(true)}
												className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
											>
												<LucideIcons.Plus className="mr-1.5 h-4 w-4" />
												Add Account
											</button>
										</div>

										<p
											className={`text-sm mb-6 ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Connect your existing email accounts to send and receive
											encrypted emails through PrivaMail.
										</p>

										<div className="space-y-4">
											{user?.connectedAccounts.map((account) => (
												<div
													key={account.id}
													className={`border rounded-lg overflow-hidden ${
														darkMode ? "border-gray-700" : "border-gray-200"
													}`}
												>
													<div
														className={`px-4 py-4 ${
															darkMode ? "bg-gray-800" : "bg-white"
														}`}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center">
																{account.provider === "gmail" && (
																	<div
																		className={`h-10 w-10 flex items-center justify-center rounded-full ${
																			darkMode ? "bg-red-900" : "bg-red-100"
																		}`}
																	>
																		<svg
																			className={`h-6 w-6 ${
																				darkMode
																					? "text-red-400"
																					: "text-red-600"
																			}`}
																			viewBox="0 0 24 24"
																			fill="currentColor"
																		>
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
																	</div>
																)}
																{account.provider === "outlook" && (
																	<div
																		className={`h-10 w-10 flex items-center justify-center rounded-full ${
																			darkMode ? "bg-blue-900" : "bg-blue-100"
																		}`}
																	>
																		<svg
																			className={`h-6 w-6 ${
																				darkMode
																					? "text-blue-400"
																					: "text-blue-600"
																			}`}
																			viewBox="0 0 24 24"
																			fill="currentColor"
																		>
																			<path
																				d="M2 6L10 4V20L2 18V6Z"
																				fill="#0078D4"
																			/>
																			<path
																				d="M12 4L22 2V22L12 20V4Z"
																				fill="#0078D4"
																			/>
																		</svg>
																	</div>
																)}
																{account.provider === "yahoo" && (
																	<div
																		className={`h-10 w-10 flex items-center justify-center rounded-full ${
																			darkMode
																				? "bg-purple-900"
																				: "bg-purple-100"
																		}`}
																	>
																		<svg
																			className={`h-6 w-6 ${
																				darkMode
																					? "text-purple-400"
																					: "text-purple-600"
																			}`}
																			viewBox="0 0 24 24"
																			fill="currentColor"
																		>
																			<path
																				d="M19.828 7.242H16.3V3h-3.194v4.242h-3.523v3.872h3.523v12.244h3.194V11.114h3.528v-3.872z"
																				fill="#6001D2"
																			/>
																		</svg>
																	</div>
																)}
																{account.provider === "other" && (
																	<div
																		className={`h-10 w-10 flex items-center justify-center rounded-full ${
																			darkMode ? "bg-gray-700" : "bg-gray-100"
																		}`}
																	>
																		<LucideIcons.Mail
																			className={`h-6 w-6 ${
																				darkMode
																					? "text-gray-400"
																					: "text-gray-600"
																			}`}
																		/>
																	</div>
																)}
																<div className="ml-4">
																	<h4
																		className={`text-sm font-medium ${
																			darkMode ? "text-white" : "text-gray-900"
																		}`}
																	>
																		{account.email}
																	</h4>
																	<p
																		className={`text-xs capitalize ${
																			darkMode
																				? "text-gray-400"
																				: "text-gray-500"
																		}`}
																	>
																		{account.provider}
																	</p>
																</div>
															</div>
															<div className="flex items-center">
																<span
																	className={`mr-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
																		darkMode
																			? "bg-green-900 text-green-200"
																			: "bg-green-100 text-green-800"
																	}`}
																>
																	Connected
																</span>
																<button
																	type="button"
																	className={`inline-flex items-center p-1 border border-transparent rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
																		darkMode
																			? "text-gray-400 hover:text-gray-300"
																			: "text-gray-400 hover:text-gray-500"
																	}`}
																>
																	<LucideIcons.MoreVertical className="h-5 w-5" />
																</button>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Notifications Settings */}
								{activeTab === "notifications" && (
									<div className="p-6">
										<h2
											className={`text-lg font-medium mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Notification Preferences
										</h2>
										<p
											className={`text-sm mb-6 ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Manage how and when you receive notifications about your
											secure emails.
										</p>

										<div className="space-y-6">
											{/* Email Notifications */}
											<div>
												<h3
													className={`text-base font-medium mb-4 ${
														darkMode ? "text-white" : "text-gray-900"
													}`}
												>
													Email Notifications
												</h3>
												<div className="space-y-4">
													<div className="flex items-center justify-between">
														<div>
															<span
																className={`text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																New Message Notifications
															</span>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Receive an email when you get a new encrypted
																message
															</p>
														</div>
														<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
															<input
																type="checkbox"
																name="toggle-new-message"
																id="toggle-new-message"
																defaultChecked={true}
																className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
																	darkMode
																		? "bg-gray-300 border-gray-600"
																		: "bg-white border-gray-300"
																}`}
															/>
															<label
																htmlFor="toggle-new-message"
																className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out bg-indigo-600"
															></label>
														</div>
													</div>

													<div className="flex items-center justify-between">
														<div>
															<span
																className={`text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Read Receipt Notifications
															</span>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Receive an email when your sent messages are
																read
															</p>
														</div>
														<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
															<input
																type="checkbox"
																name="toggle-read-receipt"
																id="toggle-read-receipt"
																defaultChecked={true}
																className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
																	darkMode
																		? "bg-gray-300 border-gray-600"
																		: "bg-white border-gray-300"
																}`}
															/>
															<label
																htmlFor="toggle-read-receipt"
																className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out bg-indigo-600"
															></label>
														</div>
													</div>

													<div className="flex items-center justify-between">
														<div>
															<span
																className={`text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Expiring Message Reminders
															</span>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Receive an email before your messages are set to
																expire
															</p>
														</div>
														<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
															<input
																type="checkbox"
																name="toggle-expire-reminder"
																id="toggle-expire-reminder"
																defaultChecked={true}
																className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
																	darkMode
																		? "bg-gray-300 border-gray-600"
																		: "bg-white border-gray-300"
																}`}
															/>
															<label
																htmlFor="toggle-expire-reminder"
																className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out bg-indigo-600"
															></label>
														</div>
													</div>
												</div>
											</div>

											{/* In-App Notifications */}
											<div
												className={`border-t pt-6 ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<h3
													className={`text-base font-medium mb-4 ${
														darkMode ? "text-white" : "text-gray-900"
													}`}
												>
													In-App Notifications
												</h3>
												<div className="space-y-4">
													<div className="flex items-center justify-between">
														<div>
															<span
																className={`text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Desktop Notifications
															</span>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Show browser notifications when you receive new
																messages
															</p>
														</div>
														<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
															<input
																type="checkbox"
																name="toggle-desktop-notifications"
																id="toggle-desktop-notifications"
																defaultChecked={true}
																className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
																	darkMode
																		? "bg-gray-300 border-gray-600"
																		: "bg-white border-gray-300"
																}`}
															/>
															<label
																htmlFor="toggle-desktop-notifications"
																className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out bg-indigo-600"
															></label>
														</div>
													</div>

													<div className="flex items-center justify-between">
														<div>
															<span
																className={`text-sm font-medium ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Sound Alerts
															</span>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Play a sound when you receive new messages
															</p>
														</div>
														<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
															<input
																type="checkbox"
																name="toggle-sound-alerts"
																id="toggle-sound-alerts"
																defaultChecked={false}
																className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
																	darkMode
																		? "bg-gray-300 border-gray-600"
																		: "bg-white border-gray-300"
																}`}
															/>
															<label
																htmlFor="toggle-sound-alerts"
																className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
																	darkMode ? "bg-gray-600" : "bg-gray-300"
																}`}
															></label>
														</div>
													</div>
												</div>
											</div>

											{/* Save button */}
											<div
												className={`border-t pt-5 ${
													darkMode ? "border-gray-700" : "border-gray-200"
												}`}
											>
												<div className="flex justify-end">
													<button
														type="button"
														className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
													>
														<LucideIcons.Save className="mr-1.5 h-4 w-4" />
														Save Preferences
													</button>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Billing Settings */}
								{activeTab === "billing" && (
									<div className="p-6">
										<h2
											className={`text-lg font-medium mb-4 ${
												darkMode ? "text-white" : "text-gray-900"
											}`}
										>
											Billing and Subscription
										</h2>

										{/* Current Plan */}
										<div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white p-6 mb-6">
											<div className="flex justify-between items-start">
												<div>
													<span className="inline-block px-2 py-1 bg-white text-indigo-600 bg-opacity-20 rounded text-xs font-medium mb-2">
														Current Plan
													</span>
													<h3 className="text-2xl font-bold">Pro Plan</h3>
													<div className="mt-1 text-indigo-100">
														$4.99 / month
													</div>
													<p className="mt-2 text-sm text-indigo-100">
														Your next billing date is July 15, 2025
													</p>
												</div>
												<button className="px-4 py-2 bg-white text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors duration-200">
													Upgrade Plan
												</button>
											</div>
											<div className="mt-4 grid grid-cols-3 gap-4">
												<div className="bg-white bg-opacity-10 rounded-lg p-3">
													<h4 className="text-xs font-medium text-indigo-800">
														Storage
													</h4>
													<div className="mt-1 text-lg font-bold text-indigo-500">
														1.5 GB / 5 GB
													</div>
													<div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-1.5">
														<div
															className="bg-white h-1.5 rounded-full"
															style={{ width: "30%" }}
														></div>
													</div>
												</div>
												<div className="bg-white bg-opacity-10 rounded-lg p-3">
													<h4 className="text-xs font-medium text-indigo-800">
														Email Accounts
													</h4>
													<div className="mt-1 text-lg font-bold text-indigo-500">
														1 / 5
													</div>
													<div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-1.5">
														<div
															className="bg-white h-1.5 rounded-full"
															style={{ width: "20%" }}
														></div>
													</div>
												</div>
												<div className="bg-white bg-opacity-10 rounded-lg p-3">
													<h4 className="text-xs font-medium text-indigo-800">
														Features
													</h4>
													<div className="mt-1 text-sm font-bold text-indigo-500">
														All Pro Features
													</div>
													<div className="mt-1 text-xs text-indigo-500">
														<LucideIcons.Check className="inline-block h-3 w-3 mr-1" />
														Self-destructing emails
													</div>
												</div>
											</div>
										</div>

										{/* Payment Method */}
										<div className="mb-8">
											<h3
												className={`text-base font-medium mb-4 ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Payment Method
											</h3>
											<div
												className={`border rounded-lg p-4 ${
													darkMode
														? "bg-gray-750 border-gray-700"
														: "bg-gray-50 border-gray-200"
												}`}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<div
															className={`h-10 w-16 rounded flex items-center justify-center ${
																darkMode ? "bg-blue-900" : "bg-blue-100"
															}`}
														>
															<LucideIcons.CreditCard
																className={`h-6 w-6 ${
																	darkMode ? "text-blue-400" : "text-blue-600"
																}`}
															/>
														</div>
														<div className="ml-4">
															<p
																className={`text-sm font-medium ${
																	darkMode ? "text-white" : "text-gray-900"
																}`}
															>
																Visa ending in 4242
															</p>
															<p
																className={`text-xs ${
																	darkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																Expires 12/2028
															</p>
														</div>
													</div>
													<button
														className={`text-sm font-medium ${
															darkMode
																? "text-indigo-400 hover:text-indigo-300"
																: "text-indigo-600 hover:text-indigo-800"
														}`}
													>
														Update
													</button>
												</div>
											</div>
										</div>

										{/* Billing History */}
										<div>
											<h3
												className={`text-base font-medium mb-4 ${
													darkMode ? "text-white" : "text-gray-900"
												}`}
											>
												Billing History
											</h3>
											<div
												className={`border rounded-lg overflow-hidden ${
													darkMode
														? "bg-gray-800 border-gray-700"
														: "bg-white border-gray-200"
												}`}
											>
												<div className="overflow-x-auto">
													<table
														className={`min-w-full divide-y ${
															darkMode ? "divide-gray-700" : "divide-gray-200"
														}`}
													>
														<thead
															className={
																darkMode ? "bg-gray-750" : "bg-gray-50"
															}
														>
															<tr>
																<th
																	scope="col"
																	className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
																		darkMode ? "text-gray-400" : "text-gray-500"
																	}`}
																>
																	Date
																</th>
																<th
																	scope="col"
																	className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
																		darkMode ? "text-gray-400" : "text-gray-500"
																	}`}
																>
																	Description
																</th>
																<th
																	scope="col"
																	className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
																		darkMode ? "text-gray-400" : "text-gray-500"
																	}`}
																>
																	Amount
																</th>
																<th
																	scope="col"
																	className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
																		darkMode ? "text-gray-400" : "text-gray-500"
																	}`}
																>
																	Receipt
																</th>
															</tr>
														</thead>
														<tbody
															className={`divide-y ${
																darkMode
																	? "bg-gray-800 divide-gray-700"
																	: "bg-white divide-gray-200"
															}`}
														>
															{[
																{
																	date: "June 15, 2025",
																	description: "Pro Plan - Monthly",
																	amount: "$4.99",
																},
																{
																	date: "May 15, 2025",
																	description: "Pro Plan - Monthly",
																	amount: "$4.99",
																},
																{
																	date: "April 15, 2025",
																	description: "Pro Plan - Monthly",
																	amount: "$4.99",
																},
															].map((invoice, index) => (
																<tr key={index}>
																	<td
																		className={`px-6 py-4 whitespace-nowrap text-sm ${
																			darkMode ? "text-white" : "text-gray-900"
																		}`}
																	>
																		{invoice.date}
																	</td>
																	<td
																		className={`px-6 py-4 whitespace-nowrap text-sm ${
																			darkMode
																				? "text-gray-400"
																				: "text-gray-500"
																		}`}
																	>
																		{invoice.description}
																	</td>
																	<td
																		className={`px-6 py-4 whitespace-nowrap text-sm ${
																			darkMode ? "text-white" : "text-gray-900"
																		}`}
																	>
																		{invoice.amount}
																	</td>
																	<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
																		<button
																			className={
																				darkMode
																					? "text-indigo-400 hover:text-indigo-300"
																					: "text-indigo-600 hover:text-indigo-800"
																			}
																		>
																			Download
																		</button>
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</animated.div>
					</div>
				</div>
			</div>

			{/* Delete Account Modal */}
			<DeleteAccountModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={() => {
					setShowDeleteModal(false);
					toast.success("Account deleted successfully");
					// Add actual delete logic here
				}}
			/>

			<AddKeyModal
				isOpen={showAddKeyModal}
				onClose={() => setShowAddKeyModal(false)}
				onGenerate={handleGenerateKey}
				isGenerating={isGeneratingKey}
			/>

			<AddAccountModal
				isOpen={showAddAccountModal}
				onClose={() => setShowAddAccountModal(false)}
				onAdd={handleAddAccount}
			/>

			{/* Add custom CSS for toggle switch */}
			<style jsx>{`
				.toggle-checkbox:checked {
					right: 0;
					border-color: #4f46e5;
				}
				.toggle-checkbox:checked + .toggle-label {
					background-color: #4f46e5;
				}
			`}</style>
		</div>
	);
}
