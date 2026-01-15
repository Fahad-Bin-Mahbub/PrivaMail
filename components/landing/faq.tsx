"use client";

import { useTheme } from "@/components/providers/theme-provider";

export function FAQ() {
	const { darkMode } = useTheme();

	const faqs = [
		{
			question: "How secure is PrivaMail?",
			answer:
				"PrivaMail uses AES-256 bit encryption, the same standard used by banks and governments worldwide. Your messages are end-to-end encrypted, meaning only you and your recipient can read them.",
		},
		{
			question: "Can I use PrivaMail with my existing email?",
			answer:
				"Yes! PrivaMail works with all major email providers including Gmail, Outlook, Yahoo, and more. There's no need to create a new email address.",
		},
		{
			question: "What happens if the recipient doesn't use PrivaMail?",
			answer:
				"Recipients who don't use PrivaMail will receive a secure link to view your encrypted message. You can also add password protection for additional security.",
		},
		{
			question: "Is there a limit to file attachments?",
			answer:
				"Free accounts can send encrypted attachments up to 25MB. Pro accounts can send up to 100MB, and Business accounts have a 1GB attachment limit.",
		},
	];

	return (
		<section className={`pb-16 sm:pb-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h3
						className={`text-2xl font-bold ${
							darkMode ? "text-white" : "text-gray-900"
						}`}
					>
						Frequently Asked Questions
					</h3>
					<p
						className={`mt-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
					>
						Have questions? We've got answers.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className={`rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 ${
								darkMode ? "bg-gray-800" : "bg-white"
							}`}
						>
							<h4
								className={`text-lg font-semibold mb-3 ${
									darkMode ? "text-white" : "text-gray-900"
								}`}
							>
								{faq.question}
							</h4>
							<p className={darkMode ? "text-gray-300" : "text-gray-600"}>
								{faq.answer}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
