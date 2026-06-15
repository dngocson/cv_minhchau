import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Language = "en" | "vi";

export const SUPPORTED_LANGUAGES: {
	code: Language;
	label: string;
	short: string;
}[] = [
	{ code: "en", label: "English", short: "EN" },
	{ code: "vi", label: "Tiếng Việt", short: "VI" },
];

interface SettingsState {
	theme: Theme;
	language: Language;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
	setLanguage: (language: Language) => void;
}

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function getInitialLanguage(): Language {
	if (typeof navigator === "undefined") return "en";
	return navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export const useSettings = create<SettingsState>()(
	persist(
		(set) => ({
			theme: getInitialTheme(),
			language: getInitialLanguage(),
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
			setLanguage: (language) => set({ language }),
		}),
		{
			name: "cv-settings",
			partialize: (s) => ({ theme: s.theme, language: s.language }),
		},
	),
);
