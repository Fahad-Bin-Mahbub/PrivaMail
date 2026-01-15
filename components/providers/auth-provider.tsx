"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isLoggedIn: boolean;
	login: (user: User) => void;
	logout: () => void;
	updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const initAuth = async () => {
			try {
				const storedUser = localStorage.getItem("user");
				if (storedUser) {
					// In a real app, verify with API
					// const res = await fetch("/api/auth/me");
					// if (res.ok) setUser(await res.json());
					setUser(JSON.parse(storedUser));
				}
			} catch (error) {
				console.error("Failed to restore session", error);
			} finally {
				setIsLoading(false);
			}
		};

		initAuth();
	}, []);

	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
		toast.success(`Welcome back, ${userData.name}!`);
		router.push("/dashboard");
	};

	const logout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			setUser(null);
			localStorage.removeItem("user");
			toast.success("Logged out successfully");
			router.push("/");
		} catch (error) {
			toast.error("Logout failed");
		}
	};

	const updateUser = (updates: Partial<User>) => {
		if (!user) return;
		const updatedUser = { ...user, ...updates };
		setUser(updatedUser);
		localStorage.setItem("user", JSON.stringify(updatedUser));
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isLoggedIn: !!user,
				login,
				logout,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
