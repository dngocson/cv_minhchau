/**
 * Structural CV model.
 *
 * This file holds only *stable, language-agnostic* facts (ids, dates, links,
 * numeric values, icon names, ordering). All human-readable text lives in the
 * i18n resources and is referenced here by translation key, so updating copy or
 * adding a language never requires touching component code.
 */

export type SectionId =
	| "home"
	| "about"
	| "experience"
	| "achievements"
	| "skills"
	| "education"
	| "certifications"
	| "projects"
	| "contact";

export interface ExperienceItem {
	/** i18n key under `experience.items.<id>` */
	id: string;
	start: string;
	/** `null` means current role */
	end: string | null;
	/** glossary keys (see `skills.glossary` in i18n) shown as tags */
	tags: string[];
}

export interface StatItem {
	id: string;
	/** numeric target for the count-up animation */
	value: number;
	/** rendered before the value, e.g. "+" */
	prefix?: string;
	/** rendered after the value, e.g. "%", "+", "/mo" */
	suffix?: string;
	/** lucide icon name resolved in the component */
	icon: string;
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
	/** glossary key under `skills.glossary` */
	id: string;
	level: SkillLevel;
}

export interface SkillGroup {
	/** i18n key under `skills.groups.<id>` */
	id: string;
	icon: string;
	skills: Skill[];
}

export interface ProjectItem {
	/** i18n key under `projects.items.<id>` */
	id: string;
	period: string;
	icon: string;
	/** glossary keys */
	tags: string[];
}

export interface CertificationItem {
	/** i18n key under `certifications.items.<id>` */
	id: string;
	icon: string;
	/** optional year/identifier shown as a chip */
	meta?: string;
}

export interface ContactChannel {
	id: string;
	icon: string;
	/** display value (not translated — phone, email, handle) */
	value: string;
	/** href for the link */
	href: string;
	/** whether the value should be copyable */
	copyable?: boolean;
}
