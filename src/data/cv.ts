import type {
	CertificationItem,
	ContactChannel,
	ExperienceItem,
	ProjectItem,
	SkillGroup,
	StatItem,
} from "@/types/cv";

/** Stable, language-agnostic facts. All copy lives in the i18n resources. */

export const profile = {
	avatar: "/avatar.jpg",
	cvFile: "/CV.pdf",
	linkedin: "https://www.linkedin.com/in/charlottechaung",
	email: "charlotte.chaunguyen@gmail.com",
	phone: "+84 941 225 865",
	phoneHref: "tel:+84941225865",
} as const;

/** Headline metrics for the hero strip. */
export const heroStats: StatItem[] = [
	{ id: "experienceYears", value: 2, suffix: "+", icon: "CalendarDays" },
	{ id: "clients", value: 50, suffix: "+", icon: "Building2" },
	{ id: "ordersPerYear", value: 200, suffix: "+", icon: "PackageCheck" },
	{ id: "retention", value: 90, suffix: "%", icon: "HeartHandshake" },
];

/** Fuller KPI set for the Key Achievements section. */
export const achievementStats: StatItem[] = [
	{ id: "clients", value: 50, suffix: "+", icon: "Building2" },
	{
		id: "newPerMonth",
		value: 10,
		prefix: "5–",
		suffix: "/mo",
		icon: "UserPlus",
	},
	{ id: "ordersPerYear", value: 200, suffix: "+", icon: "PackageCheck" },
	{ id: "retention", value: 90, suffix: "%", icon: "HeartHandshake" },
];

export const experience: ExperienceItem[] = [
	{
		id: "tuongNgoc",
		start: "2024",
		end: null,
		tags: ["b2bSales", "technicalSales", "negotiation", "marketAnalysis"],
	},
	{
		id: "naturalProductLab",
		start: "2021",
		end: "2023",
		tags: ["presentation", "experimentalDesign", "analyticalSkills"],
	},
	{
		id: "teachingAssistant",
		start: "2020",
		end: "2023",
		tags: [
			"teamwork",
			"presentation",
			"leadership",
			"mentoring",
			"timeManagement",
		],
	},
	{
		id: "cepp",
		start: "2021",
		end: "2022",
		tags: ["materialsSynthesis", "labResearch"],
	},
];

export const skillGroups: SkillGroup[] = [
	{
		id: "sales",
		icon: "Handshake",
		skills: [
			{ id: "b2bSales", level: 5 },
			{ id: "clientRelations", level: 5 },
			{ id: "negotiation", level: 4 },
			{ id: "technicalSales", level: 4 },
			{ id: "marketAnalysis", level: 4 },
			{ id: "prospecting", level: 4 },
		],
	},
	{
		id: "technical",
		icon: "FlaskConical",
		skills: [
			{ id: "chemistryKnowledge", level: 5 },
			{ id: "uvVis", level: 4 },
			{ id: "compoundIsolation", level: 4 },
			{ id: "experimentalDesign", level: 4 },
			{ id: "analyticalSkills", level: 4 },
			{ id: "materialsSynthesis", level: 3 },
		],
	},
	{
		id: "professional",
		icon: "Users",
		skills: [
			{ id: "communication", level: 5 },
			{ id: "presentation", level: 5 },
			{ id: "teamwork", level: 5 },
			{ id: "leadership", level: 4 },
			{ id: "mentoring", level: 4 },
			{ id: "timeManagement", level: 4 },
		],
	},
];

export const projects: ProjectItem[] = [
	{
		id: "compoundResearch",
		period: "2021 – 2023",
		icon: "FlaskConical",
		tags: ["compoundIsolation", "uvVis", "analyticalSkills"],
	},
	{
		id: "antibacterialMaterials",
		period: "2021 – 2022",
		icon: "Atom",
		tags: ["materialsSynthesis", "labResearch"],
	},
	{
		id: "publishedPaper",
		period: "2023",
		icon: "FileText",
		tags: ["experimentalDesign", "analyticalSkills"],
	},
	{
		id: "studentProjects",
		period: "2020 – 2023",
		icon: "Presentation",
		tags: ["leadership", "mentoring", "timeManagement"],
	},
];

export const certifications: CertificationItem[] = [
	{ id: "vstep", icon: "Languages", meta: "B2" },
	{ id: "fiveGoodStudent", icon: "Award", meta: "2023" },
	{ id: "honors", icon: "Trophy", meta: "GPA 8.14" },
	{ id: "scholarships", icon: "Medal" },
];

export const contactChannels: ContactChannel[] = [
	{
		id: "email",
		icon: "Mail",
		value: profile.email,
		href: `mailto:${profile.email}`,
		copyable: true,
	},
	{
		id: "phone",
		icon: "Phone",
		value: profile.phone,
		href: profile.phoneHref,
		copyable: true,
	},
	{
		id: "linkedin",
		icon: "Linkedin",
		value: "in/charlottechaung",
		href: profile.linkedin,
	},
];

/** Languages spoken (label + proficiency key live in i18n). */
export const languages = [
	{ id: "vietnamese", level: "native" },
	{ id: "english", level: "b2" },
] as const;

/** Order of navigable sections. */
export const navSections = [
	"about",
	"experience",
	"achievements",
	"skills",
	"education",
	"projects",
	"contact",
] as const;
