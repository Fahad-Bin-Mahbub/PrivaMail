"use client";

import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/lib/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AddKeyModal } from "./settings/add-key-modal";

interface ComposeModalProps {
	user: User | null;
	darkMode: boolean;
	onClose?: () => void;
	isOpen?: boolean; // For compat, though we use conditional rendering in layout
}

export function ComposeModal({ user, darkMode, onClose }: ComposeModalProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleClose = () => {
		if (onClose) {
			onClose();
		} else {
			const params = new URLSearchParams(searchParams.toString());
			params.delete("compose");
			router.push(`${pathname}?${params.toString()}`);
		}
	};

	const [recipient, setRecipient] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [attachments, setAttachments] = useState<File[]>([]);
	const [isEncrypted, setIsEncrypted] = useState(true);
	const [encryptionLevel, setEncryptionLevel] = useState<"standard" | "high">("standard");
	const [expiresAt, setExpiresAt] = useState<string>("");
	const [readReceipt, setReadReceipt] = useState(false);
	const [forwardRestricted, setForwardRestricted] = useState(false);
	const [autoDestroyAfterRead, setAutoDestroyAfterRead] = useState(false);
	const [passwordProtected, setPasswordProtected] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordHint, setPasswordHint] = useState("");
	const [showEncryptedPreview, setShowEncryptedPreview] = useState(false);
	const [showUnencryptedConfirm, setShowUnencryptedConfirm] = useState(false);

	useEffect(() => {
		if (!isEncrypted) setShowEncryptedPreview(false);
	}, [isEncrypted]);

	const [isSending, setIsSending] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);

	const [recipients, setRecipients] = useState<string[]>([]);
	const [ccRecipients, setCcRecipients] = useState<string[]>([]);
	const [bccRecipients, setBccRecipients] = useState<string[]>([]);
	const [ccVisible, setCcVisible] = useState(false);
	const [bccVisible, setBccVisible] = useState(false);
	const [cc, setCc] = useState("");
	const [bcc, setBcc] = useState("");
	const [recipientError, setRecipientError] = useState("");
	const [ccError, setCcError] = useState("");
	const [bccError, setBccError] = useState("");
	const [showAddKeyModal, setShowAddKeyModal] = useState(false);
	const [selectedEncryptionKey, setSelectedEncryptionKey] = useState("default-key");
	const [encryptionKeys, setEncryptionKeys] = useState([
		{ id: "default-key", name: "Your Personal Key" },
		{ id: "work-key", name: "Your Work Key" },
	]);
	// newKeyName/Bits removed as they are handled by AddKeyModal
	const [isGeneratingKey, setIsGeneratingKey] = useState(false);
	const [draftSaved, setDraftSaved] = useState(false);
	const [draftSaving, setDraftSaving] = useState(false);
	const [draftId, setDraftId] = useState<string | null>(null);
	const [customExpiryTime, setCustomExpiryTime] = useState("");
	const [showCustomExpiry, setShowCustomExpiry] = useState(false);
	const [formTouched, setFormTouched] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const minimizedRef = useRef<HTMLDivElement>(null);
	const dropzoneRef = useRef<HTMLDivElement>(null);
	const ccInputRef = useRef<HTMLInputElement>(null);
	const bccInputRef = useRef<HTMLInputElement>(null);

	const overlayAnimation = useSpring({
		opacity: isMinimized ? 0 : 0.75,
		config: { tension: 300, friction: 30 },
	});

	useEffect(() => {
		if (!formTouched) return;
		const autoSaveTimer = setTimeout(() => {
			handleSaveAsDraft(true);
		}, 30000);
		return () => clearTimeout(autoSaveTimer);
	}, [recipient, subject, message, recipients, formTouched]);

	useEffect(() => {
		if (recipient || subject || message || recipients.length > 0 || attachments.length > 0) {
			setFormTouched(true);
		}
	}, [recipient, subject, message, recipients, attachments]);

	useEffect(() => {
		const lowerRecipientInput = recipient.trim().replace(/[,;]/g, "").toLowerCase();
		const lowerCcInput = cc.trim().replace(/[,;]/g, "").toLowerCase();
		const lowerBccInput = bcc.trim().replace(/[,;]/g, "").toLowerCase();

		const toEmails = [...recipients].map(e => e.toLowerCase());
		const ccEmails = [...ccRecipients].map(e => e.toLowerCase());
		const bccEmails = [...bccRecipients].map(e => e.toLowerCase());

		// 1. Recipient (To) validation
		let toErr = "";
		if (lowerRecipientInput) {
			if (user?.email && lowerRecipientInput === user.email.toLowerCase()) {
				toErr = "You cannot send an email to yourself";
			} else if (toEmails.includes(lowerRecipientInput)) {
				toErr = "This email is already in the To list";
			} else if (ccEmails.includes(lowerRecipientInput) || lowerRecipientInput === lowerCcInput) {
				toErr = "This email is already in the Cc field";
			} else if (bccEmails.includes(lowerRecipientInput) || lowerRecipientInput === lowerBccInput) {
				toErr = "This email is already in the Bcc field";
			}
		}
		if (toErr) {
			setRecipientError(toErr);
		} else if (!lowerRecipientInput) {
			setRecipientError("");
		} else if (/\S+@\S+\.\S+/.test(lowerRecipientInput)) {
			setRecipientError("");
		}

		// 2. Cc validation
		let ccErr = "";
		if (lowerCcInput) {
			if (user?.email && lowerCcInput === user.email.toLowerCase()) {
				ccErr = "You cannot send an email to yourself";
			} else if (ccEmails.includes(lowerCcInput)) {
				ccErr = "This email is already in the Cc list";
			} else if (toEmails.includes(lowerCcInput) || lowerCcInput === lowerRecipientInput) {
				ccErr = "This email is already in the To field";
			} else if (bccEmails.includes(lowerCcInput) || lowerCcInput === lowerBccInput) {
				ccErr = "This email is already in the Bcc field";
			}
		}
		if (ccErr) {
			setCcError(ccErr);
		} else if (!lowerCcInput) {
			setCcError("");
		} else if (/\S+@\S+\.\S+/.test(lowerCcInput)) {
			setCcError("");
		}

		// 3. Bcc validation
		let bccErr = "";
		if (lowerBccInput) {
			if (user?.email && lowerBccInput === user.email.toLowerCase()) {
				bccErr = "You cannot send an email to yourself";
			} else if (bccEmails.includes(lowerBccInput)) {
				bccErr = "This email is already in the Bcc list";
			} else if (toEmails.includes(lowerBccInput) || lowerBccInput === lowerRecipientInput) {
				bccErr = "This email is already in the To field";
			} else if (ccEmails.includes(lowerBccInput) || lowerBccInput === lowerCcInput) {
				bccErr = "This email is already in the Cc field";
			}
		}
		if (bccErr) {
			setBccError(bccErr);
		} else if (!lowerBccInput) {
			setBccError("");
		} else if (/\S+@\S+\.\S+/.test(lowerBccInput)) {
			setBccError("");
		}
	}, [recipient, recipients, cc, ccRecipients, bcc, bccRecipients, user]);

	useEffect(() => {
		const dropzone = dropzoneRef.current;
		if (!dropzone) return;

		const handleDragOver = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dropzone.classList.add(darkMode ? "bg-gray-700" : "bg-gray-100");
			dropzone.classList.add("border-brand-500");
		};

		const handleDragLeave = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dropzone.classList.remove(darkMode ? "bg-gray-700" : "bg-gray-100");
			dropzone.classList.remove("border-brand-500");
		};

		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dropzone.classList.remove(darkMode ? "bg-gray-700" : "bg-gray-100");
			dropzone.classList.remove("border-brand-500");

			if (e.dataTransfer?.files) {
				const newFiles = Array.from(e.dataTransfer.files);
				setAttachments((prev) => [...prev, ...newFiles]);
			}
		};

		dropzone.addEventListener("dragover", handleDragOver);
		dropzone.addEventListener("dragleave", handleDragLeave);
		dropzone.addEventListener("drop", handleDrop);

		return () => {
			dropzone.removeEventListener("dragover", handleDragOver);
			dropzone.removeEventListener("dragleave", handleDragLeave);
			dropzone.removeEventListener("drop", handleDrop);
		};
	}, [darkMode]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			setAttachments([...attachments, ...newFiles]);
			setFormTouched(true);
		}
	};

	const removeAttachment = (index: number) => {
		setAttachments(attachments.filter((_, i) => i !== index));
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return bytes + " B";
		else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
		else return (bytes / 1048576).toFixed(1) + " MB";
	};

	const getDuplicateOrSenderError = (email: string) => {
		const lowerEmail = email.toLowerCase();
		if (user?.email && lowerEmail === user.email.toLowerCase()) {
			return "You cannot send an email to yourself";
		}
		const allRecipients = [...recipients, ...ccRecipients, ...bccRecipients].map(r => r.toLowerCase());
		if (allRecipients.includes(lowerEmail)) {
			return "This email is already in the recipient list";
		}
		return "";
	};

	const handleRecipientInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === "," || e.key === ";") {
			e.preventDefault();
			const value = recipient.trim().replace(/[,;]/g, "");
			if (value && /\S+@\S+\.\S+/.test(value)) {
				const error = getDuplicateOrSenderError(value);
				if (!error) {
					setRecipients([...recipients, value]);
					setRecipient("");
					setRecipientError("");
				} else {
					setRecipientError(error);
				}
			} else if (value) {
				setRecipientError("Please enter a valid email address");
			}
		}
	};

	const handleCcInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const value = cc.trim().replace(/[,;]/g, "");
			if (value && /\S+@\S+\.\S+/.test(value)) {
				const error = getDuplicateOrSenderError(value);
				if (!error) {
					setCcRecipients([...ccRecipients, value]);
					setCc("");
					setCcError("");
				} else {
					setCcError(error);
				}
			} else if (value) {
				setCcError("Please enter a valid email address");
			}
		}
	};

	const handleBccInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const value = bcc.trim().replace(/[,;]/g, "");
			if (value && /\S+@\S+\.\S+/.test(value)) {
				const error = getDuplicateOrSenderError(value);
				if (!error) {
					setBccRecipients([...bccRecipients, value]);
					setBcc("");
					setBccError("");
				} else {
					setBccError(error);
				}
			} else if (value) {
				setBccError("Please enter a valid email address");
			}
		}
	};

	const removeRecipient = (index: number) => {
		setRecipients(recipients.filter((_, i) => i !== index));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		const finalRecipients = [...recipients].map(email => email.toLowerCase());
		const trailingRecipient = recipient.trim().replace(/[,;]/g, "");
		if (trailingRecipient) {
			if (!/\S+@\S+\.\S+/.test(trailingRecipient)) {
				setRecipientError("Please enter a valid email address");
				return;
			}
			const error = getDuplicateOrSenderError(trailingRecipient);
			if (error) {
				setRecipientError(error);
				return;
			}
			finalRecipients.push(trailingRecipient.toLowerCase());
		} else if (recipients.length === 0) {
			toast.error("Please enter at least one recipient");
			return;
		}

		const finalCc = [...ccRecipients].map(email => email.toLowerCase());
		const trailingCcVal = cc.trim().replace(/[,;]/g, "");
		if (trailingCcVal) {
			if (!/\S+@\S+\.\S+/.test(trailingCcVal)) {
				setCcError("Please enter a valid email address");
				return;
			}
			const error = getDuplicateOrSenderError(trailingCcVal);
			if (error) {
				setCcError(error);
				return;
			}
			finalCc.push(trailingCcVal.toLowerCase());
		}

		const finalBcc = [...bccRecipients].map(email => email.toLowerCase());
		const trailingBccVal = bcc.trim().replace(/[,;]/g, "");
		if (trailingBccVal) {
			if (!/\S+@\S+\.\S+/.test(trailingBccVal)) {
				setBccError("Please enter a valid email address");
				return;
			}
			const error = getDuplicateOrSenderError(trailingBccVal);
			if (error) {
				setBccError(error);
				return;
			}
			finalBcc.push(trailingBccVal.toLowerCase());
		}

		// Check overlap between To and Cc
		const toAndCcOverlap = finalRecipients.filter(email => finalCc.includes(email));
		if (toAndCcOverlap.length > 0) {
			toast.error(`"${toAndCcOverlap[0]}" cannot be in both To and Cc fields.`);
			return;
		}

		// Check overlap between To and Bcc
		const toAndBccOverlap = finalRecipients.filter(email => finalBcc.includes(email));
		if (toAndBccOverlap.length > 0) {
			toast.error(`"${toAndBccOverlap[0]}" cannot be in both To and Bcc fields.`);
			return;
		}

		// Check overlap between Cc and Bcc
		const ccAndBccOverlap = finalCc.filter(email => finalBcc.includes(email));
		if (ccAndBccOverlap.length > 0) {
			toast.error(`"${ccAndBccOverlap[0]}" cannot be in both Cc and Bcc fields.`);
			return;
		}

		if (subject.trim() === "") {
			toast.error("Please enter a subject");
			return;
		}
		if (message.trim() === "") {
			toast.error("Please enter a message");
			return;
		}
		if (passwordProtected && password.trim() === "") {
			toast.error("Please enter a password");
			return;
		}

		if (!isEncrypted && !showUnencryptedConfirm) {
			setShowUnencryptedConfirm(true);
			return;
		}
		setShowUnencryptedConfirm(false);

		setIsSending(true);
		// Logic...
		setTimeout(() => {
			setIsSending(false);
			toast.success(isEncrypted ? "Email sent securely!" : "Email sent unencrypted!");
			handleClose();
		}, 1500);
	};

	const handleSaveAsDraft = (silent = false) => {
		if (!formTouched) return;
		setDraftSaving(true);
        // ... Logic ...
		setTimeout(() => {
			if (!draftId) setDraftId(`draft-${Date.now()}`);
			setDraftSaving(false);
			setDraftSaved(true);
			if (!silent) {
				toast.success("Email saved as draft");
				setTimeout(() => handleClose(), 1000);
			} else {
				toast("Draft saved automatically", { icon: "📝", duration: 2000 });
			}
			setTimeout(() => setDraftSaved(false), 3000);
		}, 800);
	};

	const toggleEncryptedPreview = () => setShowEncryptedPreview(!showEncryptedPreview);
	const handleAddKey = () => setShowAddKeyModal(true);

	const handleGenerateNewKey = (e: React.FormEvent, name: string, bits: string) => {
        // Adapted signature for AddKeyModal
		e.preventDefault();
		if (!name.trim()) {
			toast.error("Please enter a key name");
			return;
		}
		setIsGeneratingKey(true);
		setTimeout(() => {
			const newKey = {
				id: `key-${Date.now()}`,
				name: `${name} (${bits}-bit RSA)`,
			};
			setEncryptionKeys([...encryptionKeys, newKey]);
			setSelectedEncryptionKey(newKey.id);
			setIsGeneratingKey(false);
			setShowAddKeyModal(false);
			toast.success(`New encryption key "${name}" generated successfully!`);
		}, 1500);
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setExpiresAt(value);
		setShowCustomExpiry(value === "custom");
	};

	const handleCustomExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomExpiryTime(e.target.value);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
			if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
				if (formRef.current) formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
			}
			if ((e.ctrlKey || e.metaKey) && e.key === "s") {
				e.preventDefault();
				handleSaveAsDraft();
			}
			if ((e.ctrlKey || e.metaKey) && e.key === "m") {
				e.preventDefault();
				setIsMinimized(!isMinimized);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose, recipient, subject, message, isMinimized]);

	const generateEncryptedPreview = (text: string) => {
		if (!text) return "";
		// Simple substitution/scramble for demo
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		let result = "-----BEGIN ENCRYPTED MESSAGE-----\n";
		let line = "";
		// Deterministic "hashing" based on text length and content
		for (let i = 0; i < Math.max(text.length * 1.5, 100); i++) {
			const charCode = (text.charCodeAt(i % text.length) + i) % chars.length;
			line += chars[charCode];
			if (line.length >= 64) {
				result += line + "\n";
				line = "";
			}
		}
		if (line) result += line + "\n";
		result += "-----END ENCRYPTED MESSAGE-----";
		return result;
	};

	return (
		<>
			<animated.div
				style={overlayAnimation}
				className="fixed inset-0 bg-gray-600 z-40 bg-opacity-75"
				onClick={isMinimized ? () => setIsMinimized(false) : handleClose}
			></animated.div>

			{!isMinimized && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
					<div
						className={`rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col pointer-events-auto mx-4 md:mx-auto overflow-hidden ${
							darkMode ? "bg-gray-800" : "bg-white"
						}`}
					>
						<div className="bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-4 rounded-t-lg flex items-center justify-between">
							<h2 className="text-xl font-bold text-white flex items-center">
								<LucideIcons.PenSquare className="mr-2 h-6 w-6" />
								Compose Secure Email
							</h2>
							<div className="flex items-center space-x-3">
								<div className="flex items-center space-x-1 bg-white/20 rounded-md px-2 py-1">
									{draftSaved && (
										<span className="text-xs text-white font-medium">
											Draft saved
										</span>
									)}
									{draftSaving && (
										<span className="text-xs text-white flex items-center">
											<svg
												className="animate-spin h-3 w-3 mr-1"
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
										</span>
									)}
								</div>
								<div className="flex items-center space-x-2">
									<button
										onClick={() => setIsMinimized(!isMinimized)}
										className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none p-1.5 rounded-md hover:bg-white/20"
										title="Minimize"
									>
										<LucideIcons.Minimize2 className="h-5 w-5" />
									</button>
									<button
										onClick={handleClose}
										className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none p-1.5 rounded-md hover:bg-white/20"
										title="Close"
									>
										<LucideIcons.X className="h-5 w-5" />
									</button>
								</div>
							</div>
						</div>

						<div
							ref={dropzoneRef}
							className="flex-1 overflow-auto transition-colors duration-200 border-2 border-transparent"
						>
							<form ref={formRef} onSubmit={handleSubmit}>
								<div
									className={`px-6 py-5 ${
										darkMode ? "bg-gray-800" : "bg-white"
									}`}
								>
									{!isEncrypted && (
										<div
											className={`mb-5 p-4 rounded-md border-l-4 ${
												darkMode
													? "bg-yellow-900/30 border-yellow-500 text-yellow-200"
													: "bg-yellow-50 border-yellow-400 text-yellow-800"
											}`}
										>
											<div className="flex">
												<div className="flex-shrink-0">
													<LucideIcons.AlertTriangle
														className={`h-5 w-5 ${
															darkMode ? "text-yellow-500" : "text-yellow-400"
														}`}
													/>
												</div>
												<div className="ml-3">
													<p className="text-sm font-medium">
														Warning: This email will NOT be protected.
													</p>
													<p className="mt-1 text-sm opacity-90">
														Anyone who intercepts it could read its contents.{" "}
														<button
															type="button"
															onClick={() => setIsEncrypted(true)}
															className="underline font-bold focus:outline-none"
														>
															Enable encryption now
														</button>
													</p>
												</div>
											</div>
										</div>
									)}
									<div className="mb-5">
										<label
											htmlFor="from"
											className={`block text-sm font-medium mb-2 ${
												darkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											From
										</label>
										<div className="flex items-center">
											<span
												className={`px-3 py-2.5 rounded-l-md border border-r-0 text-sm ${
													darkMode
														? "bg-gray-700 text-gray-300 border-gray-600"
														: "bg-gray-100 text-gray-700 border-gray-300"
												}`}
											>
												{user?.email || "you@example.com"}
											</span>
											<div className="relative flex-grow">
												<select
													className={`h-full block w-full py-2.5 pl-3 pr-10 rounded-r-md border focus:border-brand-500 focus:ring-brand-500 sm:text-sm ${
														darkMode
															? "border-gray-600 bg-gray-700 text-white"
															: "border-gray-300 bg-white text-gray-900"
													}`}
													value={selectedEncryptionKey}
													onChange={(e) => {
														if (e.target.value === "add-key")
															setShowAddKeyModal(true);
														else setSelectedEncryptionKey(e.target.value);
													}}
												>
													{encryptionKeys.map((key) => (
														<option key={key.id} value={key.id}>
															{key.name}
														</option>
													))}
													<option value="add-key">+ Generate New Key...</option>
												</select>
											</div>
										</div>
										<p
											className={`mt-1 text-xs ${
												darkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Select the encryption key you want to use.
										</p>
									</div>

									<div
										className={`mb-5 pb-4 border-b ${
											darkMode ? "border-gray-700" : "border-gray-200"
										}`}
									>
										<div className="mb-3">
											<label
												htmlFor="recipient"
												className={`block text-sm font-medium mb-2 ${
													darkMode ? "text-gray-300" : "text-gray-700"
												}`}
											>
												To
											</label>
											<div
												className={`flex flex-wrap items-center border rounded-md p-2 focus-within:ring-2 ${
													recipientError
														? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
														: "focus-within:ring-brand-500 focus-within:border-brand-500"
												} ${darkMode ? "bg-gray-700" : "bg-white"} ${
													!recipientError &&
													(darkMode ? "border-gray-600" : "border-gray-300")
												}`}
											>
												{recipients.map((email, index) => (
													<div
														key={index}
														className={`m-1 flex items-center rounded-full pl-3 pr-1 py-1 text-sm ${
															darkMode
																? "bg-brand-900 bg-opacity-50 text-brand-200"
																: "bg-brand-100 text-brand-800"
														}`}
													>
														<span className="truncate max-w-xs">{email}</span>
														<button
															type="button"
															onClick={() => removeRecipient(index)}
															className={`ml-1 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center focus:outline-none ${
																darkMode
																	? "text-brand-400 hover:text-brand-500 hover:bg-brand-800"
																	: "text-brand-400 hover:text-brand-500 hover:bg-brand-200"
															}`}
														>
															<LucideIcons.X className="h-3 w-3" />
														</button>
													</div>
												))}
												<input
													type="text"
													id="recipient"
													value={recipient}
													onChange={(e) => setRecipient(e.target.value)}
													onKeyDown={handleRecipientInput}
													className={`flex-1 border-0 focus:ring-0 min-w-[8rem] p-1.5 placeholder-gray-500 sm:text-sm bg-transparent ${
														darkMode
															? "text-white placeholder-gray-400"
															: "text-gray-900"
													}`}
													placeholder={
														recipients.length === 0
															? "recipient@example.com"
															: ""
													}
												/>
											</div>
											{recipientError && (
												<p className="mt-1 text-xs text-red-500 font-medium">
													{recipientError}
												</p>
											)}
											<div className="mt-2 flex justify-start space-x-3 text-xs">
												<button
													type="button"
													onClick={() => {
														setCcVisible(!ccVisible);
														if (!ccVisible)
															setTimeout(() => ccInputRef.current?.focus(), 0);
													}}
													className={`font-medium transition-colors duration-200 px-2 py-1 rounded ${
														ccVisible
															? darkMode
																? "bg-brand-900 text-brand-300"
																: "bg-brand-100 text-brand-700"
															: darkMode
															? "text-brand-400 hover:text-brand-300 hover:bg-gray-700"
															: "text-brand-600 hover:text-brand-500 hover:bg-gray-100"
													}`}
												>
													{ccVisible ? "Hide Cc" : "Add Cc"}
												</button>
												<button
													type="button"
													onClick={() => {
														setBccVisible(!bccVisible);
														if (!bccVisible)
															setTimeout(() => bccInputRef.current?.focus(), 0);
													}}
													className={`font-medium transition-colors duration-200 px-2 py-1 rounded ${
														bccVisible
															? darkMode
																? "bg-brand-900 text-brand-300"
																: "bg-brand-100 text-brand-700"
															: darkMode
															? "text-brand-400 hover:text-brand-300 hover:bg-gray-700"
															: "text-brand-600 hover:text-brand-500 hover:bg-gray-100"
													}`}
												>
													{bccVisible ? "Hide Bcc" : "Add Bcc"}
												</button>
											</div>
										</div>
										{ccVisible && (
											<div className="mb-3">
												<label
													htmlFor="cc"
													className={`block text-sm font-medium mb-2 ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Cc
												</label>
												<div
													className={`flex flex-wrap items-center border rounded-md p-2 focus-within:ring-2 ${
														ccError
															? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
															: "focus-within:ring-brand-500 focus-within:border-brand-500"
													} ${darkMode ? "bg-gray-700" : "bg-white"} ${
														!ccError &&
														(darkMode ? "border-gray-600" : "border-gray-300")
													}`}
												>
													{ccRecipients.map((ccEmail, index) => (
														<div
															key={index}
															className={`m-1 flex items-center rounded-full pl-3 pr-1 py-1 text-sm ${
																darkMode
																	? "bg-brand-900 bg-opacity-50 text-brand-200"
																	: "bg-brand-100 text-brand-800"
															}`}
														>
															<span className="truncate max-w-xs">
																{ccEmail}
															</span>
															<button
																type="button"
																onClick={() =>
																	setCcRecipients(
																		ccRecipients.filter((_, i) => i !== index)
																	)
																}
																className={`ml-1 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center focus:outline-none ${
																	darkMode
																		? "text-brand-400 hover:text-brand-500 hover:bg-brand-800"
																		: "text-brand-400 hover:text-brand-500 hover:bg-brand-200"
																}`}
															>
																<LucideIcons.X className="h-3 w-3" />
															</button>
														</div>
													))}
													<input
														ref={ccInputRef}
														type="text"
														id="cc"
														value={cc}
														onChange={(e) => setCc(e.target.value)}
														onKeyDown={handleCcInput}
														className={`flex-1 border-0 focus:ring-0 min-w-[8rem] p-1.5 placeholder-gray-500 sm:text-sm bg-transparent ${
															darkMode
																? "text-white placeholder-gray-400"
																: "text-gray-900"
														}`}
														placeholder="cc@example.com"
													/>
												</div>
												{ccError && (
													<p className="mt-1 text-xs text-red-500 font-medium">
														{ccError}
													</p>
												)}
											</div>
										)}
										{bccVisible && (
											<div className="mb-3">
												<label
													htmlFor="bcc"
													className={`block text-sm font-medium mb-2 ${
														darkMode ? "text-gray-300" : "text-gray-700"
													}`}
												>
													Bcc
												</label>
												<div
													className={`flex flex-wrap items-center border rounded-md p-2 focus-within:ring-2 ${
														bccError
															? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
															: "focus-within:ring-brand-500 focus-within:border-brand-500"
													} ${darkMode ? "bg-gray-700" : "bg-white"} ${
														!bccError &&
														(darkMode ? "border-gray-600" : "border-gray-300")
													}`}
												>
													{bccRecipients.map((bccEmail, index) => (
														<div
															key={index}
															className={`m-1 flex items-center rounded-full pl-3 pr-1 py-1 text-sm ${
																darkMode
																	? "bg-brand-900 bg-opacity-50 text-brand-200"
																	: "bg-brand-100 text-brand-800"
															}`}
														>
															<span className="truncate max-w-xs">
																{bccEmail}
															</span>
															<button
																type="button"
																onClick={() =>
																	setBccRecipients(
																		bccRecipients.filter((_, i) => i !== index)
																	)
																}
																className={`ml-1 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center focus:outline-none ${
																	darkMode
																		? "text-brand-400 hover:text-brand-500 hover:bg-brand-800"
																		: "text-brand-400 hover:text-brand-500 hover:bg-brand-200"
																}`}
															>
																<LucideIcons.X className="h-3 w-3" />
															</button>
														</div>
													))}
													<input
														ref={bccInputRef}
														type="text"
														id="bcc"
														value={bcc}
														onChange={(e) => setBcc(e.target.value)}
														onKeyDown={handleBccInput}
														className={`flex-1 border-0 focus:ring-0 min-w-[8rem] p-1.5 placeholder-gray-500 sm:text-sm bg-transparent ${
															darkMode
																? "text-white placeholder-gray-400"
																: "text-gray-900"
														}`}
														placeholder="bcc@example.com"
													/>
												</div>
												{bccError && (
													<p className="mt-1 text-xs text-red-500 font-medium">
														{bccError}
													</p>
												)}
											</div>
										)}
									</div>

									<div className="mb-5">
										<label
											htmlFor="subject"
											className={`block text-sm font-medium mb-2 ${
												darkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											Subject
										</label>
										<input
											type="text"
											id="subject"
											value={subject}
											onChange={(e) => setSubject(e.target.value)}
											className={`shadow-sm focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border rounded-md p-2.5 ${
												darkMode
													? "border-gray-600 bg-gray-700 text-white"
													: "border-gray-300 bg-white text-gray-900"
											}`}
											placeholder="Email subject"
										/>
									</div>

									<div className="mb-5">
										<div className="flex justify-between items-center mb-2">
											<label
												htmlFor="message"
												className={`block text-sm font-medium ${
													darkMode ? "text-gray-300" : "text-gray-700"
												}`}
											>
												Message
											</label>
											<div
												className={`flex items-center space-x-1 border rounded-md p-1 ${
													darkMode
														? "border-gray-700 bg-gray-750"
														: "border-gray-200 bg-gray-50"
												}`}
											>
												<button
													type="button"
													className={`p-1 rounded ${
														darkMode
															? "hover:bg-gray-700 text-gray-300"
															: "hover:bg-gray-200 text-gray-700"
													}`}
												>
													<LucideIcons.Bold className="h-4 w-4" />
												</button>
												<button
													type="button"
													className={`p-1 rounded ${
														darkMode
															? "hover:bg-gray-700 text-gray-300"
															: "hover:bg-gray-200 text-gray-700"
													}`}
												>
													<LucideIcons.Italic className="h-4 w-4" />
												</button>
												<button
													type="button"
													className={`p-1 rounded ${
														darkMode
															? "hover:bg-gray-700 text-gray-300"
															: "hover:bg-gray-200 text-gray-700"
													}`}
												>
													<LucideIcons.Underline className="h-4 w-4" />
												</button>
												<span
													className={`h-4 border-r mx-1 ${
														darkMode ? "border-gray-600" : "border-gray-300"
													}`}
												></span>
												{isEncrypted && (
													<button
														type="button"
														onClick={toggleEncryptedPreview}
														className={`p-1 rounded flex items-center ${
															showEncryptedPreview
																? darkMode
																	? "bg-green-900 text-green-300"
																	: "bg-green-100 text-green-700"
																: darkMode
																? "hover:bg-gray-700 text-gray-300"
																: "hover:bg-gray-200 text-gray-700"
														}`}
														title={
															showEncryptedPreview
																? "Show normal view"
																: "Show encrypted view"
														}
													>
														{showEncryptedPreview ? (
															<>
																<LucideIcons.Eye className="h-4 w-4 mr-1" />
																<span className="text-xs font-medium">
																	Preview
																</span>
															</>
														) : (
															<>
																<LucideIcons.Lock className="h-4 w-4 mr-1" />
																<span className="text-xs font-medium">
																	Encrypted View
																</span>
															</>
														)}
													</button>
												)}
											</div>
										</div>
										<div className="relative">
											<textarea
												id="message"
												rows={12}
												value={
													showEncryptedPreview
														? generateEncryptedPreview(message)
														: message
												}
												onChange={(e) => setMessage(e.target.value)}
												className={`shadow-sm focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border rounded-md p-3 ${
													showEncryptedPreview
														? darkMode
															? "font-mono text-green-400 bg-gray-900 border-gray-700"
															: "font-mono text-green-600 bg-gray-100 border-gray-300"
														: darkMode
														? "bg-gray-700 text-white border-gray-600"
														: "bg-white text-gray-900 border-gray-300"
												}`}
												placeholder="Write your message here..."
												disabled={showEncryptedPreview}
											/>
										</div>
									</div>
								</div>

								{/* Attachments */}
								<div
									className={`px-6 py-5 ${
										darkMode ? "bg-gray-750" : "bg-gray-50"
									} border-y ${
										darkMode ? "border-gray-700" : "border-gray-200"
									}`}
								>
									{/* ... existing attachments code ... */}
									<div className="flex items-center justify-between mb-3">
										<h3
											className={`text-sm font-semibold ${
												darkMode ? "text-gray-200" : "text-gray-700"
											}`}
										>
											Attachments{" "}
											{attachments.length > 0 ? `(${attachments.length})` : ""}
										</h3>
										<button
											type="button"
											onClick={() => fileInputRef.current?.click()}
											className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-200"
										>
											<LucideIcons.Paperclip className="mr-1.5 h-4 w-4" />
											Attach Files
										</button>
										<input
											type="file"
											ref={fileInputRef}
											onChange={handleFileChange}
											className="hidden"
											multiple
										/>
									</div>
									{attachments.length === 0 ? (
										<div
											className={`border-2 border-dashed rounded-lg p-6 text-center ${
												darkMode
													? "border-gray-600 text-gray-400 hover:bg-gray-700/50 hover:border-gray-500"
													: "border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-gray-400"
											} transition-colors duration-200 cursor-pointer`}
											onClick={() => fileInputRef.current?.click()}
										>
											<LucideIcons.Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
											<p className="text-sm font-medium">
												Drag and drop files here, or click to browse
											</p>
										</div>
									) : (
										<div className="mt-2 space-y-2 max-h-48 overflow-y-auto p-1">
											{attachments.map((file, index) => (
												<div
													key={index}
													className={`flex items-center justify-between rounded-md p-2.5 border ${
														darkMode
															? "bg-gray-800 border-gray-700 hover:bg-gray-700"
															: "bg-white border-gray-200 hover:bg-gray-50"
													}`}
												>
													<div className="flex items-center space-x-3 overflow-hidden">
														<div
															className={`h-10 w-10 rounded flex items-center justify-center flex-shrink-0 ${
																darkMode
																	? "bg-brand-900 text-brand-300"
																	: "bg-brand-100 text-brand-600"
															}`}
														>
															<LucideIcons.File className="h-5 w-5" />
														</div>
														<div className="min-w-0">
															<p
																className={`text-sm truncate font-medium ${
																	darkMode ? "text-gray-200" : "text-gray-700"
																}`}
															>
																{file.name}
															</p>
															<div className="flex items-center">
																<span
																	className={`text-xs flex-shrink-0 ${
																		darkMode ? "text-gray-400" : "text-gray-500"
																	}`}
																>
																	{formatFileSize(file.size)}
																</span>
																{isEncrypted && (
																	<span
																		className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
																			darkMode
																				? "bg-green-900 text-green-200"
																				: "bg-green-100 text-green-800"
																		}`}
																	>
																		<LucideIcons.Lock className="mr-0.5 h-3 w-3" />
																		Encrypted
																	</span>
																)}
															</div>
														</div>
													</div>
													<button
														type="button"
														onClick={() => removeAttachment(index)}
														className={`ml-2 p-1.5 rounded-full transition-colors duration-200 ${
															darkMode
																? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
																: "text-gray-400 hover:text-gray-500 hover:bg-gray-200"
														}`}
													>
														<LucideIcons.X className="h-4 w-4" />
													</button>
												</div>
											))}
										</div>
									)}
								</div>

								{/* Security Options */}
								<div
									className={`px-6 py-5 ${
										darkMode ? "bg-gray-800" : "bg-white"
									}`}
								>
									<div className="flex items-center justify-between mb-4">
										<h3
											className={`text-base font-semibold ${
												darkMode ? "text-gray-200" : "text-gray-700"
											}`}
										>
											Security Options
										</h3>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
										<div className="space-y-5">
											<div
												className={`rounded-lg border p-4 ${
													isEncrypted
														? darkMode
															? "bg-green-900/20 border-green-800"
															: "bg-green-50 border-green-200"
														: darkMode
														? "bg-yellow-900/20 border-yellow-800"
														: "bg-yellow-50 border-yellow-200"
												}`}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														{isEncrypted ? (
															<LucideIcons.Lock
																className={`h-5 w-5 mr-3 ${
																	darkMode ? "text-green-400" : "text-green-600"
																}`}
															/>
														) : (
															<LucideIcons.Unlock
																className={`h-5 w-5 mr-3 ${
																	darkMode
																		? "text-yellow-400"
																		: "text-yellow-600"
																}`}
															/>
														)}
														<span
															className={`text-sm font-medium ${
																isEncrypted
																	? darkMode
																		? "text-green-300"
																		: "text-green-700"
																	: darkMode
																	? "text-yellow-300"
																	: "text-yellow-700"
															}`}
														>
															Protect this email
														</span>
													</div>
													<button
														type="button"
														onClick={() => setIsEncrypted(!isEncrypted)}
														className={`${
															isEncrypted
																? "bg-green-600"
																: darkMode
																? "bg-gray-600"
																: "bg-gray-300"
														} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2`}
													>
														<span
															className={`${
																isEncrypted ? "translate-x-5" : "translate-x-0"
															} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
														/>
													</button>
												</div>
											</div>
											{isEncrypted && (
												<div
													className={`rounded-lg border p-4 ${
														darkMode
															? "bg-gray-750 border-gray-700"
															: "bg-gray-50 border-gray-200"
													}`}
												>
													<label
														className={`text-sm font-medium block mb-3 ${
															darkMode ? "text-gray-200" : "text-gray-700"
														}`}
													>
														Encryption Level
													</label>
													<div className="flex items-center space-x-4">
														<div className="flex items-center">
															<input
																type="radio"
																checked={encryptionLevel === "standard"}
																onChange={() => setEncryptionLevel("standard")}
																className="focus:ring-brand-500 h-4 w-4 text-brand-600"
															/>
															<label
																className={`ml-2 block text-sm ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Standard
															</label>
														</div>
														<div className="flex items-center">
															<input
																type="radio"
																checked={encryptionLevel === "high"}
																onChange={() => setEncryptionLevel("high")}
																className="focus:ring-brand-500 h-4 w-4 text-brand-600"
															/>
															<label
																className={`ml-2 block text-sm ${
																	darkMode ? "text-gray-300" : "text-gray-700"
																}`}
															>
																Maximum (for sensitive content)
															</label>
														</div>
													</div>
												</div>
											)}
											<div
												className={`rounded-lg border p-4 ${
													passwordProtected
														? darkMode
															? "bg-purple-900/20 border-purple-800"
															: "bg-purple-50 border-purple-200"
														: darkMode
														? "bg-gray-750 border-gray-700"
														: "bg-gray-50 border-gray-200"
												}`}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<LucideIcons.KeySquare
															className={`h-5 w-5 mr-3 ${
																passwordProtected
																	? darkMode
																		? "text-purple-400"
																		: "text-purple-600"
																	: darkMode
																	? "text-gray-400"
																	: "text-gray-500"
															}`}
														/>
														<span
															className={`text-sm font-medium ${
																passwordProtected
																	? darkMode
																		? "text-purple-300"
																		: "text-purple-700"
																	: darkMode
																	? "text-gray-300"
																	: "text-gray-700"
															}`}
														>
															Password Protection
														</span>
													</div>
													<button
														type="button"
														onClick={() =>
															setPasswordProtected(!passwordProtected)
														}
														className={`${
															passwordProtected
																? "bg-purple-600"
																: darkMode
																? "bg-gray-600"
																: "bg-gray-300"
														} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2`}
													>
														<span
															className={`${
																passwordProtected
																	? "translate-x-5"
																	: "translate-x-0"
															} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
														/>
													</button>
												</div>
												{passwordProtected && (
													<div className="mt-3 space-y-2">
														<input
															type="password"
															value={password}
															onChange={(e) => setPassword(e.target.value)}
															className={`shadow-sm block w-full sm:text-sm border rounded-md p-2 ${
																darkMode
																	? "bg-gray-700 border-gray-600 text-white"
																	: "bg-white border-gray-300"
															}`}
															placeholder="Set password"
														/>
														<input
															type="text"
															value={passwordHint}
															onChange={(e) => setPasswordHint(e.target.value)}
															className={`shadow-sm block w-full sm:text-sm border rounded-md p-2 ${
																darkMode
																	? "bg-gray-700 border-gray-600 text-white"
																	: "bg-white border-gray-300"
															}`}
															placeholder="Password hint (optional)"
														/>
													</div>
												)}
											</div>
										</div>
										<div className="space-y-5">
											<div
												className={`rounded-lg border p-4 ${
													expiresAt
														? darkMode
															? "bg-blue-900/20 border-blue-800"
															: "bg-blue-50 border-blue-200"
														: darkMode
														? "bg-gray-750 border-gray-700"
														: "bg-gray-50 border-gray-200"
												}`}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<LucideIcons.Clock
															className={`h-5 w-5 mr-3 ${
																expiresAt
																	? darkMode
																		? "text-blue-400"
																		: "text-blue-600"
																	: darkMode
																	? "text-gray-400"
																	: "text-gray-500"
															}`}
														/>
														<span
															className={`text-sm font-medium ${
																expiresAt
																	? darkMode
																		? "text-blue-300"
																		: "text-blue-700"
																	: darkMode
																	? "text-gray-300"
																	: "text-gray-700"
															}`}
														>
															Message Expiration
														</span>
													</div>
													<select
														value={expiresAt}
														onChange={handleExpiryChange}
														className={`block rounded-md border focus:border-brand-500 focus:ring-brand-500 sm:text-sm ${
															darkMode
																? "border-gray-600 bg-gray-700 text-white"
																: "border-gray-300 bg-white text-gray-900"
														}`}
													>
														<option value="">Never</option>
														<option value="1h">1 Hour</option>
														<option value="1d">1 Day</option>
														<option value="1w">1 Week</option>
														<option value="custom">Custom...</option>
													</select>
												</div>
												{showCustomExpiry && (
													<div className="mt-3">
														<input
															type="number"
															value={customExpiryTime}
															onChange={handleCustomExpiryChange}
															className={`shadow-sm block w-full sm:text-sm border rounded-md p-2 ${
																darkMode
																	? "bg-gray-700 border-gray-600 text-white"
																	: "bg-white border-gray-300"
															}`}
															placeholder="Hours"
														/>
													</div>
												)}
											</div>

											<div className="flex flex-col space-y-3">
												<div className="flex flex-col">
													<div className="flex items-center">
														<input
															id="read-receipt"
															type="checkbox"
															checked={readReceipt}
															onChange={() => setReadReceipt(!readReceipt)}
															className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
														/>
														<label
															htmlFor="read-receipt"
															className={`ml-2 block text-sm ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Read Receipt
														</label>
													</div>
													<p
														className={`text-xs mt-0.5 ml-6 ${
															darkMode ? "text-gray-500" : "text-gray-400"
														}`}
													>
														Get notified when the recipient opens this email
													</p>
												</div>
												<div className="flex flex-col">
													<div className="flex items-center">
														<input
															id="restrict-forwarding"
															type="checkbox"
															checked={forwardRestricted}
															onChange={() =>
																setForwardRestricted(!forwardRestricted)
															}
															className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
														/>
														<label
															htmlFor="restrict-forwarding"
															className={`ml-2 block text-sm ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Restrict Forwarding
														</label>
													</div>
													<p
														className={`text-xs mt-0.5 ml-6 ${
															darkMode ? "text-gray-500" : "text-gray-400"
														}`}
													>
														Prevents the recipient from forwarding this email
													</p>
												</div>
												<div className="flex flex-col">
													<div className="flex items-center">
														<input
															id="auto-destroy"
															type="checkbox"
															checked={autoDestroyAfterRead}
															onChange={() =>
																setAutoDestroyAfterRead(!autoDestroyAfterRead)
															}
															className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
														/>
														<label
															htmlFor="auto-destroy"
															className={`ml-2 block text-sm ${
																darkMode ? "text-gray-300" : "text-gray-700"
															}`}
														>
															Auto-Destroy After Reading
														</label>
													</div>
													<p
														className={`text-xs mt-0.5 ml-6 ${
															darkMode ? "text-gray-500" : "text-gray-400"
														}`}
													>
														This email will be permanently deleted after it is
														read
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>

						<div
							className={`px-6 py-4 rounded-b-lg flex items-center justify-between border-t ${
								darkMode
									? "bg-gray-750 border-gray-700"
									: "bg-gray-50 border-gray-200"
							}`}
						>
							<div className="flex items-center space-x-2 flex-wrap">
								{isEncrypted && (
									<span
										className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
											darkMode
												? "bg-green-900 text-green-200"
												: "bg-green-100 text-green-800"
										}`}
									>
										<LucideIcons.Lock className="mr-1 h-3 w-3" />
										Encrypted
									</span>
								)}
								{passwordProtected && (
									<span
										className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
											darkMode
												? "bg-purple-900 text-purple-200"
												: "bg-purple-100 text-purple-800"
										}`}
									>
										<LucideIcons.Key className="mr-1 h-3 w-3" />
										Password Protected
									</span>
								)}
								{expiresAt && (
									<span
										className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
											darkMode
												? "bg-blue-900 text-blue-200"
												: "bg-blue-100 text-blue-800"
										}`}
									>
										<LucideIcons.Clock className="mr-1 h-3 w-3" />
										Expires: {expiresAt === "custom" ? `${customExpiryTime}h` : expiresAt}
									</span>
								)}
							</div>
							<div className="flex space-x-3">
								<button
									type="button"
									onClick={() => handleSaveAsDraft()}
									disabled={draftSaving}
									className="inline-flex items-center px-3.5 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
								>
									<LucideIcons.Save className="mr-2 h-4 w-4" />
									Save Draft
								</button>
								<button
									type="button"
									onClick={handleClose}
									className="inline-flex items-center px-3.5 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleSubmit}
									disabled={isSending}
									className="inline-flex items-center px-5 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700"
								>
									{isEncrypted ? (
										<LucideIcons.ShieldCheck className="h-4 w-4 mr-2" />
									) : (
										<LucideIcons.Send className="h-4 w-4 mr-2" />
									)}
									{isEncrypted ? "Send Protected Email" : "Send Email"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{isMinimized && (
				<div
					ref={minimizedRef}
					className="fixed bottom-4 right-4 bg-gradient-to-r from-brand-600 to-accent-600 text-white p-3 rounded-lg shadow-lg cursor-pointer z-50 flex items-center space-x-3 pr-4"
					onClick={() => setIsMinimized(false)}
				>
					<div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
						<LucideIcons.PenSquare className="h-5 w-5" />
					</div>
					<div className="flex flex-col">
						<span className="font-medium text-sm">New Message</span>
						<span className="text-xs text-white/80 truncate max-w-[150px]">
							{subject || "No subject"}
						</span>
					</div>
				</div>
			)}

			{/* Unencrypted Send Confirmation Modal */}
			<AnimatePresence>
				{showUnencryptedConfirm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className={`mx-4 p-6 rounded-xl shadow-2xl max-w-sm w-full ${
								darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
							}`}
						>
							<div className="flex items-center mb-4">
								<div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
									<LucideIcons.AlertTriangle className="h-5 w-5 text-amber-600" />
								</div>
								<h3
									className={`text-lg font-semibold ${
										darkMode ? "text-white" : "text-gray-900"
									}`}
								>
									Send without protection?
								</h3>
							</div>
							<p
								className={`text-sm mb-6 ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								This email will <strong>not</strong> be encrypted. Anyone who
								intercepts it could read its contents. Are you sure you want to
								send it unprotected?
							</p>
							<div className="flex space-x-3">
								<button
									onClick={() => setShowUnencryptedConfirm(false)}
									className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
										darkMode
											? "border-gray-600 text-gray-300 hover:bg-gray-700"
											: "border-gray-300 text-gray-700 hover:bg-gray-50"
									}`}
								>
									Cancel
								</button>
								<button
									onClick={() => {
										setIsEncrypted(true);
										setShowUnencryptedConfirm(false);
									}}
									className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors"
								>
									Enable Protection
								</button>
								<button
									onClick={handleSubmit}
									className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors"
								>
									Send Anyway
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<AddKeyModal
				isOpen={showAddKeyModal}
				onClose={() => {
					setShowAddKeyModal(false);
					if (selectedEncryptionKey === "add-key") {
						setSelectedEncryptionKey("default-key");
					}
				}}
				onGenerate={handleGenerateNewKey}
				isGenerating={isGeneratingKey}
			/>
		</>
	);
}
