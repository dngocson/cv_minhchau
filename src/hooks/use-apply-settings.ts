import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/store/settings";

/**
 * Keeps the DOM and i18next in sync with the persisted settings store:
 * - toggles the `dark` class on <html>
 * - sets the active i18n language and the <html lang> attribute
 * - keeps document.title in sync with the translated meta title
 */
export function useApplySettings() {
	const theme = useSettings((s) => s.theme);
	const language = useSettings((s) => s.language);
	const { i18n, t } = useTranslation();

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		root.style.colorScheme = theme;
	}, [theme]);

	useEffect(() => {
		if (i18n.language !== language) i18n.changeLanguage(language);
		document.documentElement.lang = language;
	}, [language, i18n]);

	useEffect(() => {
		// `lng` makes the result depend on `language` directly, so the title
		// updates on language change regardless of the `t` reference identity.
		document.title = t("meta.title", { lng: language });
		const desc = document.querySelector('meta[name="description"]');
		if (desc)
			desc.setAttribute("content", t("meta.description", { lng: language }));
	}, [t, language]);
}
