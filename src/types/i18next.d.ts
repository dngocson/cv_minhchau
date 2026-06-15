import "i18next";

/**
 * We intentionally do NOT pin `resources` here. Doing so turns `t()` keys into a
 * strict literal union, which rejects the dynamic template keys this app relies
 * on (e.g. `t(\`experience.items.${id}.role\`)`). EN/VI parity is still enforced
 * at compile time by the `vi: Resources` annotation in the locale files.
 */
declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		returnNull: false;
	}
}
