import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { certifications } from "@/data/cv";

export function Certifications() {
	const { t } = useTranslation();

	return (
		<Section id="certifications" className="bg-card/30">
			<SectionHeading
				kicker={t("certifications.kicker")}
				title={t("certifications.title")}
			/>

			<div className="mt-12 grid gap-4 sm:grid-cols-2">
				{certifications.map((cert, i) => (
					<Reveal key={cert.id} delay={i * 0.07} className="h-full">
						<Card className="flex h-full items-start gap-4 p-6 transition-colors hover:border-primary/40">
							<span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
								<Icon name={cert.icon} className="size-6" />
							</span>
							<div className="min-w-0">
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="font-heading text-base font-semibold">
										{t(`certifications.items.${cert.id}.title`)}
									</h3>
									{cert.meta ? <Badge variant="gold">{cert.meta}</Badge> : null}
								</div>
								<p className="mt-1.5 text-sm text-muted-foreground">
									{t(`certifications.items.${cert.id}.desc`)}
								</p>
							</div>
						</Card>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
