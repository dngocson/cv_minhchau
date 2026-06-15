import i18n, { type TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { vi } from "./locales/vi";

/** Reads an array/object resource (used with `returnObjects`) with a usable type. */
export function tList<T = string>(t: TFunction, key: string): T[] {
	return t(key, { returnObjects: true }) as unknown as T[];
}

export const defaultNS = "translation";

export const resources = {
	en: { translation: en },
	vi: { translation: vi },
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
	defaultNS,
	interpolation: { escapeValue: false },
	returnNull: false,
});

export default i18n;
