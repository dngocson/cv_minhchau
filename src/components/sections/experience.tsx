import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { experience } from "@/data/cv";
import { tList } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Experience() {
	const { t } = useTranslation();

	return (
		<Section id="experience" className="bg-card/30">
			<SectionHeading
				kicker={t("experience.kicker")}
				title={t("experience.title")}
				subtitle={t("experience.subtitle")}
			/>

			<div className="relative mt-14">
				{/* timeline rail */}
				<div
					aria-hidden
					className="absolute top-2 bottom-2 left-6 w-px bg-border"
				/>

				<ol className="flex flex-col gap-8">
					{experience.map((exp) => {
						const period = `${exp.start} – ${exp.end ?? t("common.present")}`;
						const isCurrent = exp.end === null;
						const bullets = tList(t, `experience.items.${exp.id}.bullets`);

						return (
							<li key={exp.id} className="relative pl-16 sm:pl-20">
								{/* node */}
								<span
									className={cn(
										"absolute top-1 left-1 grid size-10 place-items-center rounded-full border bg-background shadow-sm",
										isCurrent
											? "border-primary text-primary"
											: "border-border text-muted-foreground",
									)}
								>
									<Icon name="Briefcase" className="size-4" />
								</span>

								<Reveal from="left">
									<Card className="p-6 transition-colors hover:border-primary/40">
										<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
											<div>
												<h3 className="font-heading text-lg font-semibold">
													{t(`experience.items.${exp.id}.role`)}
												</h3>
												<p className="text-sm font-medium text-primary">
													{t(`experience.items.${exp.id}.company`)}
												</p>
											</div>
											<Badge
												variant={isCurrent ? "default" : "outline"}
												className="w-fit shrink-0"
											>
												<Icon name="CalendarDays" className="size-3" />
												{period}
											</Badge>
										</div>

										<ul className="mt-4 flex flex-col gap-2.5">
											{bullets.map((b) => (
												<li
													key={b}
													className="flex gap-2.5 text-sm text-muted-foreground"
												>
													<Icon
														name="ChevronRight"
														className="mt-0.5 size-4 shrink-0 text-primary/70"
													/>
													<span className="leading-relaxed">{b}</span>
												</li>
											))}
										</ul>

										<div className="mt-5 border-t border-border pt-4">
											<p className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
												{t("experience.skillsLabel")}
											</p>
											<div className="flex flex-wrap gap-2">
												{exp.tags.map((tag) => (
													<Badge key={tag} variant="secondary">
														{t(`skills.glossary.${tag}`)}
													</Badge>
												))}
											</div>
										</div>
									</Card>
								</Reveal>
							</li>
						);
					})}
				</ol>
			</div>
		</Section>
	);
}
