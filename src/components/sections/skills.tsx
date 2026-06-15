import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Card } from "@/components/ui/card";
import { skillGroups } from "@/data/cv";
import type { Skill } from "@/types/cv";

function SkillBar({ skill }: { skill: Skill }) {
	const { t } = useTranslation();
	const reduce = useReducedMotion();
	const pct = skill.level * 20;

	return (
		<li>
			<div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
				<span className="font-medium">{t(`skills.glossary.${skill.id}`)}</span>
			</div>
			<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
				<motion.div
					className="h-full rounded-full bg-linear-to-r from-primary to-chart-2"
					initial={reduce ? { width: `${pct}%` } : { width: 0 }}
					whileInView={{ width: `${pct}%` }}
					viewport={{ once: true, margin: "0px 0px -10% 0px" }}
					transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
				/>
			</div>
		</li>
	);
}

export function Skills() {
	const { t } = useTranslation();

	return (
		<Section id="skills" className="bg-card/30">
			<SectionHeading
				kicker={t("skills.kicker")}
				title={t("skills.title")}
				subtitle={t("skills.subtitle")}
			/>

			<div className="mt-12 grid gap-6 lg:grid-cols-3">
				{skillGroups.map((group, i) => (
					<Reveal key={group.id} delay={i * 0.08} className="h-full">
						<Card className="h-full p-6">
							<div className="flex items-center gap-3">
								<span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
									<Icon name={group.icon} className="size-5" />
								</span>
								<div>
									<h3 className="font-heading text-base font-semibold">
										{t(`skills.groups.${group.id}.title`)}
									</h3>
									<p className="text-xs text-muted-foreground">
										{t(`skills.groups.${group.id}.desc`)}
									</p>
								</div>
							</div>

							<ul className="mt-6 flex flex-col gap-4">
								{group.skills.map((skill) => (
									<SkillBar key={skill.id} skill={skill} />
								))}
							</ul>
						</Card>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
