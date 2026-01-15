"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useState } from "react";

interface AddKeyModalProps {
	isOpen: boolean;
	onClose: () => void;
	onGenerate: (e: React.FormEvent, keyName: string, keyBits: string) => void;
	isGenerating: boolean;
}

export function AddKeyModal({
	isOpen,
	onClose,
	onGenerate,
	isGenerating,
}: AddKeyModalProps) {
	const { darkMode } = useTheme();
	const [keyName, setKeyName] = useState("");
	const [keyBits, setKeyBits] = useState("4096");

	const handleSubmit = (e: React.FormEvent) => {
		onGenerate(e, keyName, keyBits);
		if (!isGenerating) {
			setKeyName(""); // Reset on success if handled by parent, or parent should reset it
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className={`rounded-xl shadow-2xl max-w-lg w-full overflow-hidden ${
							darkMode ? "bg-gray-800" : "bg-white"
						}`}
					>
                        {/* Gradient Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <LucideIcons.Key className="mr-2 h-6 w-6" />
                                Generate New Key
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none p-1.5 rounded-md hover:bg-white/20"
                            >
                                <LucideIcons.X className="h-6 w-6" />
                            </button>
                        </div>

						<div className="p-6">
							<p
								className={`text-sm mb-6 ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								Create a new encryption key pair for secure communication. Your private key will be stored securely on your device.
							</p>

							<form onSubmit={handleSubmit} className="space-y-5">
								<div>
									<label
										htmlFor="key-name"
										className={`block text-sm font-medium mb-1.5 ${
											darkMode ? "text-gray-200" : "text-gray-700"
										}`}
									>
										Key Name
									</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LucideIcons.Tag className={`h-4 w-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                                        </div>
                                        <input
                                            type="text"
                                            id="key-name"
                                            value={keyName}
                                            onChange={(e) => setKeyName(e.target.value)}
                                            className={`pl-10 shadow-sm block w-full sm:text-sm border rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500 ${
                                                darkMode
                                                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                            }`}
                                            placeholder="e.g., Personal Key, Work Key"
                                            required
                                        />
                                    </div>
								</div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="key-type"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                darkMode ? "text-gray-200" : "text-gray-700"
                                            }`}
                                        >
                                            Algorithm
                                        </label>
                                        <select
                                            id="key-type"
                                            className={`shadow-sm block w-full sm:text-sm border rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500 ${
                                                darkMode
                                                    ? "bg-gray-700 border-gray-600 text-white"
                                                    : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                            defaultValue="rsa"
                                        >
                                            <option value="rsa">RSA (Recommended)</option>
                                            <option value="ecc">ECC</option>
                                            <option value="ed25519">Ed25519</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="key-bits"
                                            className={`block text-sm font-medium mb-1.5 ${
                                                darkMode ? "text-gray-200" : "text-gray-700"
                                            }`}
                                        >
                                            Key Size
                                        </label>
                                        <select
                                            id="key-bits"
                                            value={keyBits}
                                            onChange={(e) => setKeyBits(e.target.value)}
                                            className={`shadow-sm block w-full sm:text-sm border rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500 ${
                                                darkMode
                                                    ? "bg-gray-700 border-gray-600 text-white"
                                                    : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                        >
                                            <option value="2048">2048 bits</option>
                                            <option value="3072">3072 bits</option>
                                            <option value="4096">4096 bits (High Security)</option>
                                        </select>
                                    </div>
                                </div>

								<div>
									<label
										htmlFor="key-expiration"
										className={`block text-sm font-medium mb-1.5 ${
											darkMode ? "text-gray-200" : "text-gray-700"
										}`}
									>
										Key Expiration
									</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LucideIcons.Calendar className={`h-4 w-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                                        </div>
                                        <select
                                            id="key-expiration"
                                            className={`pl-10 shadow-sm block w-full sm:text-sm border rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500 ${
                                                darkMode
                                                    ? "bg-gray-700 border-gray-600 text-white"
                                                    : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                            defaultValue="never"
                                        >
                                            <option value="never">Never expires</option>
                                            <option value="1year">1 year</option>
                                            <option value="2years">2 years</option>
                                            <option value="5years">5 years</option>
                                        </select>
                                    </div>
								</div>

								<div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
									<button
										type="button"
										onClick={onClose}
										className={`px-5 py-2.5 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
											darkMode
												? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
												: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
										}`}
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={isGenerating}
										className={`inline-flex items-center px-6 py-2.5 border border-transparent shadow-md text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5 ${
											isGenerating ? "opacity-70 cursor-not-allowed transform-none" : ""
										}`}
									>
										{isGenerating ? (
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
												Generating Keys...
											</>
										) : (
											<>
												<LucideIcons.ShieldCheck className="mr-2 h-4 w-4" />
												Generate Keys
											</>
										)}
									</button>
								</div>
							</form>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
