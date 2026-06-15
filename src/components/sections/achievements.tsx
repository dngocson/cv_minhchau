import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { StatCard } from "@/components/common/stat-card";
import { Card } from "@/components/ui/card";
import { achievementStats } from "@/data/cv";
import { tList } from "@/lib/i18n";

interface Highlight {
	title: string;
	text: string;
}

const highlightIcons = ["Award", "FileText", "Trophy"] as const;

export function Achievements() {
	const { t } = useTranslation();
	const highlights = tList<Highlight>(t, "achievements.highlights");

	return (
		<Section id="achievements">
			<SectionHeading
				kicker={t("achievements.kicker")}
				title={t("achievements.title")}
				subtitle={t("achievements.subtitle")}
			/>

			<div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
				{achievementStats.map((stat, i) => (
					<Reveal key={stat.id} delay={i * 0.06}>
						<StatCard stat={stat} className="h-full" />
					</Reveal>
				))}
			</div>

			<Reveal className="mt-12">
				<h3 className="font-heading text-lg font-semibold">
					{t("achievements.highlightsTitle")}
				</h3>
			</Reveal>

			<div className="mt-5 grid gap-4 md:grid-cols-3">
				{highlights.map((h, i) => (
					<Reveal key={h.title} delay={i * 0.08}>
						<Card className="relative h-full overflow-hidden p-6 transition-colors hover:border-accent-gold/50">
							<span className="grid size-11 place-items-center rounded-xl bg-accent-gold/15 text-accent-gold">
								<Icon
									name={highlightIcons[i] ?? "Sparkles"}
									className="size-5"
								/>
							</span>
							<h4 className="mt-4 font-heading text-base font-semibold text-balance">
								{h.title}
							</h4>
							<p className="mt-1.5 text-sm text-muted-foreground">{h.text}</p>
						</Card>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
