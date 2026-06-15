import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { tList } from "@/lib/i18n";

export function Education() {
	const { t } = useTranslation();
	const honors = tList(t, "education.honors");

	return (
		<Section id="education">
			<SectionHeading
				kicker={t("education.kicker")}
				title={t("education.title")}
			/>

			<div className="mt-12 grid gap-6 lg:grid-cols-5">
				<Reveal from="right" className="lg:col-span-3">
					<Card className="relative h-full overflow-hidden p-6 sm:p-8">
						<div
							aria-hidden
							className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/5"
						/>
						<div className="relative flex items-start gap-4">
							<span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
								<Icon name="GraduationCap" className="size-6" />
							</span>
							<div>
								<h3 className="font-heading text-xl font-semibold text-balance">
									{t("education.degree")}
								</h3>
								<p className="mt-1 font-medium text-primary">
									{t("education.school")}
								</p>
								<p className="text-sm text-muted-foreground">
									{t("education.faculty")}
								</p>
								<div className="mt-3 flex flex-wrap items-center gap-2">
									<Badge variant="outline">
										<Icon name="CalendarDays" className="size-3" />
										{t("education.period")}
									</Badge>
									<Badge variant="gold">
										<Icon name="Star" className="size-3" />
										{t("education.gpaLabel")} {t("education.gpaValue")}
									</Badge>
								</div>
							</div>
						</div>
					</Card>
				</Reveal>

				<Reveal from="left" className="lg:col-span-2">
					<Card className="h-full p-6 sm:p-8">
						<h3 className="flex items-center gap-2 font-heading text-base font-semibold">
							<Icon name="Trophy" className="size-4 text-accent-gold" />
							{t("education.honorsTitle")}
						</h3>
						<ul className="mt-4 flex flex-col gap-3">
							{honors.map((h) => (
								<li key={h} className="flex gap-2.5 text-sm">
									<Icon
										name="Check"
										className="mt-0.5 size-4 shrink-0 text-primary"
									/>
									<span className="text-muted-foreground">{h}</span>
								</li>
							))}
						</ul>
					</Card>
				</Reveal>
			</div>
		</Section>
	);
}
