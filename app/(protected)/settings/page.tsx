"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Settings } from "@/components/dashboard/settings";

export default function SettingsPage() {
	const { user } = useAuth();
	const { darkMode } = useTheme();

	return <Settings user={user} darkMode={darkMode} />;
}
