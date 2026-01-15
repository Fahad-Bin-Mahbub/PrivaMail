"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ThemeContextType {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [darkMode, setDarkMode] = useState<boolean>(false);

	useEffect(() => {
		const savedDarkMode = localStorage.getItem("darkMode") === "true";
		setDarkMode(savedDarkMode);
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark");
			document.documentElement.style.colorScheme = "dark";
		} else {
			document.body.classList.remove("dark");
			document.documentElement.style.colorScheme = "light";
		}
		localStorage.setItem("darkMode", darkMode.toString());
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		toast(darkMode ? "Light mode activated" : "Dark mode activated", {
			icon: darkMode ? "🌞" : "🌙",
		});
	};

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
