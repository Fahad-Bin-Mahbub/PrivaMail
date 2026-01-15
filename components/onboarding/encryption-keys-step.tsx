"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";

interface EncryptionKey {
	id: string;
	name: string;
	algorithm: string;
	fingerprint: string;
	created: Date;
	isActive: boolean;
	publicKey: string;
	privateKey: string;
}

interface EncryptionKeysStepProps {
	onComplete: () => void;
	isLoading: boolean;
}

export function EncryptionKeysStep({
	onComplete,
	isLoading,
}: EncryptionKeysStepProps) {
	const { darkMode } = useTheme();
	const [generatingKeys, setGeneratingKeys] = useState(false);
	const [keys, setKeys] = useState<EncryptionKey[]>([
		{
			id: "default",
			name: "Default Encryption Key",
			algorithm: "RSA-4096",
			fingerprint: "AB:CD:EF:12:34:56",
			created: new Date(),
			isActive: true,
			publicKey: "DEFAULT_PUBLIC_KEY_PLACEHOLDER",
			privateKey: "DEFAULT_PRIVATE_KEY_PLACEHOLDER",
		},
	]);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [pendingKeyAction, setPendingKeyAction] = useState<{
		type: "activate";
		keyId: string;
	} | null>(null);

	// Generate new keys
	const handleGenerateKeys = () => {
		setGeneratingKeys(true);

		// Simulate key generation
		setTimeout(() => {
			const newKey: EncryptionKey = {
				id: `key_${Date.now()}`,
				name: "New Encryption Key",
				algorithm: "RSA-4096",
				fingerprint: "XY:Z1:23:45:67:89",
				created: new Date(),
				isActive: false,
				publicKey: `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA${Math.random()
					.toString(36)
					.substring(2, 15)}
${Math.random().toString(36).substring(2, 15)}${Math.random()
					.toString(36)
					.substring(2, 15)}
-----END PUBLIC KEY-----`,
				privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC${Math.random()
					.toString(36)
					.substring(2, 15)}
${Math.random().toString(36).substring(2, 15)}${Math.random()
					.toString(36)
					.substring(2, 15)}
-----END PRIVATE KEY-----`,
			};

			setKeys((prev) => [...prev, newKey]);
			setGeneratingKeys(false);

			toast.success("New encryption keys generated successfully!");
		}, 2000);
	};

	// Export key functionality
	const handleExportKey = (keyData: EncryptionKey, type = "both") => {
		try {
			let content = "";
			let filename = "";

			if (type === "public") {
				content = keyData.publicKey;
				filename = `${keyData.name.replace(/\s+/g, "_")}_public_key.pem`;
			} else if (type === "private") {
				content = keyData.privateKey;
				filename = `${keyData.name.replace(/\s+/g, "_")}_private_key.pem`;
			} else {
				content = `${keyData.publicKey}\n\n${keyData.privateKey}`;
				filename = `${keyData.name.replace(/\s+/g, "_")}_keypair.pem`;
			}

			const blob = new Blob([content], { type: "text/plain" });
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);

			toast.success(
				`${type === "both" ? "Keypair" : type + " key"} exported successfully!`
			);
		} catch (error) {
			console.error("Export key error:", error);
			toast.error("Failed to export key. Please try again.");
		}
	};

	// Set key as active
	const handleSetKeyActive = (keyId: string) => {
		const key = keys.find((k) => k.id === keyId);
		if (!key || key.isActive) return;

		setPendingKeyAction({ type: "activate", keyId });
		setShowConfirmDialog(true);
	};

	// Confirm key action
	const confirmKeyAction = () => {
		if (pendingKeyAction?.type === "activate") {
			setKeys((prev) =>
				prev.map((key) => ({
					...key,
					isActive: key.id === pendingKeyAction.keyId,
				}))
			);

			toast.success("Encryption key activated successfully!");
		}
		setShowConfirmDialog(false);
		setPendingKeyAction(null);
	};

	return (
		<div className="space-y-6">
			{/* Confirmation Dialog */}
			{showConfirmDialog && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div
						className={`max-w-md w-full mx-4 p-6 rounded-lg shadow-xl ${
							darkMode ? "bg-gray-800" : "bg-white"
						}`}
					>
						<div className="flex items-center mb-4">
							<LucideIcons.AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
							<h3
								className={`text-lg font-medium ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								Confirm Key Activation
							</h3>
						</div>
						<p
							className={`text-sm mb-6 ${
								darkMode ? "text-gray-300" : "text-gray-600"
							}`}
						>
							Are you sure you want to activate this encryption key? This will
							deactivate your current key and may affect access to previously
							encrypted emails.
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setShowConfirmDialog(false)}
								className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
									darkMode
										? "text-gray-300 bg-gray-700 hover:bg-gray-600"
										: "text-gray-700 bg-gray-100 hover:bg-gray-200"
								}`}
							>
								Cancel
							</button>
							<button
								onClick={confirmKeyAction}
								className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
							>
								Activate Key
							</button>
						</div>
					</div>
				</div>
			)}

			<div
				className={`p-5 rounded-lg border ${
					darkMode
						? "bg-indigo-900 bg-opacity-20 border-indigo-800"
						: "bg-indigo-50 border-indigo-100"
				}`}
			>
				<div className="flex">
					<div className="flex-shrink-0">
						<LucideIcons.Key
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
							Your encryption keys are used to secure your emails. We've
							generated a pair of keys for you automatically - a public key that
							others use to send you encrypted messages, and a private key that
							only you can use to decrypt them.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				{keys.map((keyData) => (
					<div
						key={keyData.id}
						className={`border rounded-lg overflow-hidden transition-all duration-200 ${
							keyData.isActive
								? darkMode
									? "border-green-800 ring-1 ring-green-800"
									: "border-green-200 ring-1 ring-green-200"
								: darkMode
								? "border-gray-700"
								: "border-gray-200"
						}`}
					>
						<div
							className={`px-4 py-3 border-b ${
								keyData.isActive
									? darkMode
										? "bg-green-900/10 border-green-800"
										: "bg-green-50 border-green-200"
									: darkMode
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
									{keyData.name}
								</h3>
								<div className="flex items-center space-x-2">
									{!keyData.isActive && (
										<button
											onClick={() => handleSetKeyActive(keyData.id)}
											className={`text-xs px-2 py-1 rounded transition-colors ${
												darkMode
													? "text-gray-400 hover:text-white hover:bg-gray-600"
													: "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
											}`}
										>
											Set Active
										</button>
									)}
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											keyData.isActive
												? darkMode
													? "bg-green-900 text-green-200"
													: "bg-green-100 text-green-800"
												: darkMode
												? "bg-gray-700 text-gray-300"
												: "bg-gray-100 text-gray-600"
										}`}
									>
										{keyData.isActive ? "Active" : "Inactive"}
									</span>
								</div>
							</div>
						</div>
						<div
							className={`px-4 py-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}
						>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p
										className={`text-xs ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										<span className="font-medium">Algorithm:</span>{" "}
										{keyData.algorithm}
									</p>
									<p
										className={`text-xs ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										<span className="font-medium">Created:</span>{" "}
										{keyData.created.toLocaleDateString()}
									</p>
								</div>
								<div>
									<p
										className={`text-xs ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										<span className="font-medium">Fingerprint:</span>{" "}
										<span className="font-mono">{keyData.fingerprint}</span>
									</p>
									<p
										className={`text-xs ${
											darkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										<span className="font-medium">Expiration:</span> Never
									</p>
								</div>
							</div>
							<div className="mt-4 flex flex-wrap gap-2">
								{/* Export Options */}
								<div className="relative group">
									<button
										type="button"
										className={`inline-flex items-center px-2.5 py-1.5 border shadow-sm text-xs font-medium rounded transition-colors duration-200 ${
											darkMode
												? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
												: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
										} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
									>
										<LucideIcons.Download className="mr-1 h-4 w-4" />
										Export
										<LucideIcons.ChevronDown className="ml-1 h-3 w-3" />
									</button>
									<div
										className={`absolute bottom-full left-0 mb-1 w-40 rounded-md shadow-lg ${
											darkMode ? "bg-gray-700" : "bg-white"
										} ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10`}
									>
										<div className="py-1">
											<button
												onClick={() => handleExportKey(keyData, "public")}
												className={`block w-full text-left px-4 py-2 text-xs ${
													darkMode
														? "text-gray-300 hover:bg-gray-600"
														: "text-gray-700 hover:bg-gray-100"
												}`}
											>
												Public Key
											</button>
											<button
												onClick={() => handleExportKey(keyData, "private")}
												className={`block w-full text-left px-4 py-2 text-xs ${
													darkMode
														? "text-gray-300 hover:bg-gray-600"
														: "text-gray-700 hover:bg-gray-100"
												}`}
											>
												Private Key
											</button>
											<button
												onClick={() => handleExportKey(keyData, "both")}
												className={`block w-full text-left px-4 py-2 text-xs ${
													darkMode
														? "text-gray-300 hover:bg-gray-600"
														: "text-gray-700 hover:bg-gray-100"
												}`}
											>
												Both Keys
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}

				<div className="flex justify-end pt-4">
					<button
						type="button"
						onClick={handleGenerateKeys}
						disabled={generatingKeys}
						className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
							darkMode
								? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
								: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
						} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
							generatingKeys ? "opacity-70 cursor-not-allowed" : ""
						}`}
					>
						{generatingKeys ? (
							<>
								<svg
									className={`animate-spin -ml-1 mr-2 h-4 w-4 ${
										darkMode ? "text-gray-300" : "text-gray-700"
									}`}
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
								Generating...
							</>
						) : (
							<>
								<LucideIcons.Plus className="mr-2 h-4 w-4" />
								Generate New Key
							</>
						)}
					</button>
				</div>
			</div>

			<div
				className={`flex justify-between mt-6 pt-6 border-t ${
					darkMode ? "border-gray-700" : "border-gray-200"
				}`}
			>
				<button
					type="button"
					onClick={() => {}} // Back not implemented in original logic for this step, but could be useful.
					className={`text-sm font-medium transition-colors duration-200 invisible ${
						darkMode
							? "text-indigo-400 hover:text-indigo-300"
							: "text-indigo-600 hover:text-indigo-500"
					}`}
				>
					<LucideIcons.ArrowLeft className="mr-1 h-4 w-4" />
					Back
				</button>
				<button
					onClick={onComplete}
					disabled={isLoading}
					className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${
						isLoading ? "opacity-70 cursor-not-allowed" : ""
					}`}
				>
					{isLoading ? (
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
							Completing Setup...
						</>
					) : (
						<>
							Complete Setup
							<LucideIcons.Check className="ml-2 h-4 w-4" />
						</>
					)}
				</button>
			</div>
		</div>
	);
}
