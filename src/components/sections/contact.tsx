import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactChannels, profile } from "@/data/cv";
import { cn } from "@/lib/utils";

export function Contact() {
	const { t } = useTranslation();
	const [copied, setCopied] = useState<string | null>(null);

	async function copy(id: string, value: string) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(id);
			window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1800);
		} catch {
			/* clipboard unavailable — ignore */
		}
	}

	return (
		<Section id="contact" className="bg-card/30">
			<SectionHeading
				kicker={t("contact.kicker")}
				title={t("contact.title")}
				subtitle={t("contact.subtitle")}
			/>

			<div className="mt-12 grid gap-6 lg:grid-cols-5">
				<div className="flex min-w-0 flex-col gap-4 lg:col-span-3">
					{contactChannels.map((channel, i) => {
						const isCopied = copied === channel.id;
						return (
							<Reveal key={channel.id} delay={i * 0.06}>
								<Card className="flex items-center gap-4 p-4 transition-colors hover:border-primary/40 sm:p-5">
									<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
										<Icon name={channel.icon} className="size-5" />
									</span>
									<a
										href={channel.href}
										target={channel.id === "linkedin" ? "_blank" : undefined}
										rel={channel.id === "linkedin" ? "noreferrer" : undefined}
										className="min-w-0 flex-1"
									>
										<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
											{t(`contact.channels.${channel.id}`)}
										</p>
										<p className="truncate font-medium transition-colors group-hover:text-primary">
											{channel.value}
										</p>
									</a>
									{channel.copyable ? (
										<Button
											variant="ghost"
											size="icon-sm"
											onClick={() => copy(channel.id, channel.value)}
											aria-label={
												isCopied ? t("common.copied") : t("common.copy")
											}
											className={cn(isCopied && "text-primary")}
										>
											<AnimatePresence mode="wait" initial={false}>
												<motion.span
													key={isCopied ? "check" : "copy"}
													initial={{ scale: 0.6, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													exit={{ scale: 0.6, opacity: 0 }}
													transition={{ duration: 0.15 }}
												>
													<Icon
														name={isCopied ? "Check" : "Copy"}
														className="size-4"
													/>
												</motion.span>
											</AnimatePresence>
										</Button>
									) : (
										<Icon
											name="ArrowUpRight"
											className="size-4 shrink-0 text-muted-foreground"
										/>
									)}
								</Card>
							</Reveal>
						);
					})}

					<Reveal delay={0.2}>
						<Card className="flex items-center gap-4 p-4 sm:p-5">
							<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
								<Icon name="MapPin" className="size-5" />
							</span>
							<div>
								<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
									{t("contact.location.label")}
								</p>
								<p className="font-medium">{t("contact.location.value")}</p>
							</div>
						</Card>
					</Reveal>
				</div>

				<Reveal from="left" className="min-w-0 lg:col-span-2">
					<Card className="relative flex h-full flex-col justify-center overflow-hidden p-6 sm:p-8">
						<div
							aria-hidden
							className="absolute -top-12 -right-12 size-40 rounded-full bg-primary/10 blur-2xl"
						/>
						<span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
							<Icon name="Sparkles" className="size-6" />
						</span>
						<h3 className="mt-5 font-heading text-xl font-semibold text-balance">
							{t("contact.ctaTitle")}
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							{t("contact.ctaText")}
						</p>
						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<Button
								nativeButton={false}
								render={
									<a href={`mailto:${profile.email}`}>
										<Icon name="Mail" />
										{t("contact.ctaButton")}
									</a>
								}
							/>
							<Button
								variant="outline"
								nativeButton={false}
								render={
									<a href={profile.cvFile} download>
										<Icon name="Download" />
										{t("common.downloadCv")}
									</a>
								}
							/>
						</div>
					</Card>
				</Reveal>
			</div>
		</Section>
	);
}
