"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function KeyboardShortcuts() {
    const { darkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key === "?" && !e.shiftKey) {
                setIsOpen(true);
            } else if (e.key === "c") {
                window.dispatchEvent(new CustomEvent('open-compose'));
            } else if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const shortcuts = [
        { key: "c", description: "Compose new email" },
        { key: "?", description: "Show keyboard shortcuts" },
        { key: "Esc", description: "Close modals" },
        { key: "j / k", description: "Navigate list (coming soon)" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </motion.div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
                                darkMode ? "bg-gray-800" : "bg-white"
                            }`}
                        >
                            <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className={`text-lg leading-6 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                        Keyboard Shortcuts
                                    </h3>
                                    <button onClick={() => setIsOpen(false)} className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                        <LucideIcons.X className="h-5 w-5" />
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {shortcuts.map((s, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{s.description}</span>
                                            <kbd className={`px-2 py-1.5 text-xs font-semibold rounded-md border ${darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-300"} shadow-sm`}>{s.key}</kbd>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
