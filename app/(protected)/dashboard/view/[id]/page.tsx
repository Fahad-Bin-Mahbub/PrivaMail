"use client";

import { EmailView } from "@/components/dashboard/email-view";
import { useAuth } from "@/components/providers/auth-provider";
import { useTheme } from "@/components/providers/theme-provider";

export default function ViewEmailPage() {
	const { user } = useAuth();
	const { darkMode } = useTheme();

	return <EmailView user={user} darkMode={darkMode} />;
}
