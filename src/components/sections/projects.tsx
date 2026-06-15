import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projects } from "@/data/cv";

export function Projects() {
	const { t } = useTranslation();

	return (
		<Section id="projects">
			<SectionHeading
				kicker={t("projects.kicker")}
				title={t("projects.title")}
				subtitle={t("projects.subtitle")}
			/>

			<div className="mt-12 grid gap-6 md:grid-cols-2">
				{projects.map((project, i) => (
					<Reveal key={project.id} delay={i * 0.07} className="h-full">
						<Card className="group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
							<div className="flex items-center justify-between gap-3">
								<span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
									<Icon name={project.icon} className="size-6" />
								</span>
								<Badge variant="outline">
									<Icon name="CalendarDays" className="size-3" />
									{project.period}
								</Badge>
							</div>

							<h3 className="mt-5 font-heading text-lg font-semibold text-balance">
								{t(`projects.items.${project.id}.title`)}
							</h3>
							<p className="mt-0.5 text-sm font-medium text-primary">
								{t(`projects.items.${project.id}.org`)}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								{t(`projects.items.${project.id}.summary`)}
							</p>

							<div className="mt-auto flex flex-wrap gap-2 pt-5">
								{project.tags.map((tag) => (
									<Badge key={tag} variant="secondary">
										{t(`skills.glossary.${tag}`)}
									</Badge>
								))}
							</div>
						</Card>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
