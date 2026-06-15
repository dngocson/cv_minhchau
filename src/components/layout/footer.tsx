import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { contactChannels, navSections, profile } from "@/data/cv";

export function Footer() {
	const { t } = useTranslation();
	const year = 2026;

	return (
		<footer className="border-t border-border bg-card/40">
			<div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="lg:col-span-2">
						<a
							href="#home"
							className="flex items-center gap-2.5 font-heading text-base font-bold"
						>
							<span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-primary to-chart-2 text-primary-foreground">
								NC
							</span>
							{t("nav.brand")}
						</a>
						<p className="mt-4 max-w-sm text-sm text-muted-foreground">
							{t("footer.tagline")}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold">{t("footer.navTitle")}</h3>
						<ul className="mt-4 flex flex-col gap-2.5">
							{navSections.map((id) => (
								<li key={id}>
									<a
										href={`#${id}`}
										className="text-sm text-muted-foreground transition-colors hover:text-primary"
									>
										{t(`nav.${id}`)}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold">
							{t("footer.connectTitle")}
						</h3>
						<ul className="mt-4 flex flex-col gap-2.5">
							{contactChannels.map((c) => (
								<li key={c.id}>
									<a
										href={c.href}
										target={c.id === "linkedin" ? "_blank" : undefined}
										rel={c.id === "linkedin" ? "noreferrer" : undefined}
										className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
									>
										<Icon name={c.icon} className="size-4" />
										{c.value}
									</a>
								</li>
							))}
						</ul>
						<Button
							nativeButton={false}
							render={
								<a href={profile.linkedin} target="_blank" rel="noreferrer">
									<Icon name="Linkedin" />
									LinkedIn
								</a>
							}
							variant="outline"
							size="sm"
							className="mt-4"
						/>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
					<p>
						© {year} {t("hero.name")}. {t("footer.rights")}
					</p>
					<p>{t("footer.builtWith")}</p>
				</div>
			</div>
		</footer>
	);
}
