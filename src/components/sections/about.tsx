import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Card } from "@/components/ui/card";
import { languages } from "@/data/cv";
import { tList } from "@/lib/i18n";

interface Highlight {
	title: string;
	text: string;
}

const highlightIcons = [
	"FlaskConical",
	"HeartHandshake",
	"Briefcase",
	"GraduationCap",
] as const;

export function About() {
	const { t } = useTranslation();
	const paragraphs = tList(t, "about.paragraphs");
	const highlights = tList<Highlight>(t, "about.highlights");

	return (
		<Section id="about">
			<SectionHeading kicker={t("about.kicker")} title={t("about.title")} />

			<div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
				<div className="flex flex-col gap-6">
					{paragraphs.map((p, i) => (
						<Reveal key={p} delay={i * 0.08}>
							<p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
								{p}
							</p>
						</Reveal>
					))}

					<Reveal delay={0.1}>
						<Card className="mt-2 p-5">
							<h3 className="flex items-center gap-2 text-sm font-semibold">
								<Icon name="Languages" className="size-4 text-primary" />
								{t("about.languagesTitle")}
							</h3>
							<ul className="mt-4 flex flex-col gap-3">
								{languages.map((lang) => (
									<li
										key={lang.id}
										className="flex items-center justify-between gap-3"
									>
										<span className="font-medium">
											{t(`about.languages.${lang.id}`)}
										</span>
										<span className="text-sm text-muted-foreground">
											{t(`about.proficiency.${lang.level}`)}
										</span>
									</li>
								))}
							</ul>
						</Card>
					</Reveal>
				</div>

				<div>
					<Reveal>
						<h3 className="font-heading text-lg font-semibold">
							{t("about.highlightsTitle")}
						</h3>
					</Reveal>
					<div className="mt-5 grid gap-4 sm:grid-cols-2">
						{highlights.map((h, i) => (
							<Reveal key={h.title} delay={i * 0.08} from="up">
								<Card className="h-full p-5 transition-colors hover:border-primary/40">
									<span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
										<Icon
											name={highlightIcons[i] ?? "Sparkles"}
											className="size-5"
										/>
									</span>
									<h4 className="mt-4 font-heading text-base font-semibold">
										{h.title}
									</h4>
									<p className="mt-1.5 text-sm text-muted-foreground">
										{h.text}
									</p>
								</Card>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
