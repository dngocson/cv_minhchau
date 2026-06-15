import { motion, useReducedMotion, type Variants } from "motion/react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { heroStats, profile } from "@/data/cv";

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 18 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
};

export function Hero() {
	const { t } = useTranslation();
	const reduce = useReducedMotion();

	return (
		<section
			id="home"
			className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36"
		>
			{/* Decorative background */}
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="bg-dot-grid absolute inset-0 text-foreground/5" />
				<div className="absolute -top-32 -right-24 size-112 rounded-full bg-primary/15 blur-3xl" />
				<div className="absolute top-40 -left-24 size-96 rounded-full bg-chart-2/10 blur-3xl" />
				<div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background" />
			</div>

			<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
				<div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
					<motion.div variants={container} initial="hidden" animate="visible">
						<motion.span
							variants={item}
							className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary"
						>
							<span className="relative flex size-2">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
								<span className="relative inline-flex size-2 rounded-full bg-primary" />
							</span>
							{t("hero.available")}
						</motion.span>

						<motion.h1
							variants={item}
							className="mt-5 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
						>
							{t("hero.name")}
						</motion.h1>

						<motion.p
							variants={item}
							className="text-gradient-brand mt-2 font-heading text-2xl font-semibold sm:text-3xl"
						>
							{t("hero.role")}
						</motion.p>

						<motion.p
							variants={item}
							className="mt-1 text-sm font-medium text-muted-foreground"
						>
							{t("hero.subrole")}
						</motion.p>

						<motion.p
							variants={item}
							className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg"
						>
							{t("hero.tagline")}
						</motion.p>

						<motion.div
							variants={item}
							className="mt-7 flex flex-wrap items-center gap-3"
						>
							<Button
								size="lg"
								render={
									<a href="#contact">
										<Icon name="Mail" />
										{t("common.getInTouch")}
									</a>
								}
							/>
							<Button
								variant="outline"
								size="lg"
								render={
									<a href={profile.cvFile} download>
										<Icon name="Download" />
										{t("common.downloadCv")}
									</a>
								}
							/>
						</motion.div>

						<motion.div
							variants={item}
							className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
						>
							<Icon name="MapPin" className="size-4 text-primary" />
							{t("hero.location")}
						</motion.div>
					</motion.div>

					{/* Avatar */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.7,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.15,
						}}
						className="relative mx-auto w-full max-w-sm"
					>
						<div className="relative aspect-square">
							<div className="absolute inset-0 rotate-6 rounded-[2rem] bg-linear-to-br from-primary/20 to-chart-2/10" />
							<div className="absolute inset-0 -rotate-3 rounded-[2rem] border border-primary/20" />
							<img
								src={profile.avatar}
								alt={t("hero.name")}
								loading="eager"
								className="relative size-full rounded-[2rem] border border-border object-cover object-top shadow-xl"
							/>
							{!reduce ? (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur"
								>
									<span className="grid size-9 place-items-center rounded-xl bg-accent-gold/15 text-accent-gold">
										<Icon name="Award" className="size-5" />
									</span>
									<div className="text-left">
										<p className="text-sm font-semibold">
											{t("education.gpaValue")}
										</p>
										<p className="text-xs text-muted-foreground">
											{t("education.gpaLabel")}
										</p>
									</div>
								</motion.div>
							) : null}
						</div>
					</motion.div>
				</div>

				{/* Stats strip */}
				<motion.div
					variants={container}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
				>
					{heroStats.map((stat) => (
						<motion.div key={stat.id} variants={item}>
							<StatCard stat={stat} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
