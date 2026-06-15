import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { navSections, profile } from "@/data/cv";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeId = useScrollSpy(navSections);

	useEffect(() => {
		function onScroll() {
			setScrolled(window.scrollY > 12);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll while the mobile menu is open.
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-40 transition-all duration-300",
				scrolled
					? "border-b border-border bg-background/80 backdrop-blur-lg"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
				<a
					href="#home"
					className="group flex items-center gap-2.5 font-heading text-sm font-bold tracking-tight"
				>
					<span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
						NC
					</span>
					<span className="hidden sm:inline">{t("nav.brand")}</span>
				</a>

				<ul className="hidden items-center gap-1 lg:flex">
					{navSections.map((id) => {
						const active = activeId === id;
						return (
							<li key={id}>
								<a
									href={`#${id}`}
									aria-current={active ? "true" : undefined}
									className={cn(
										"relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
										active
											? "text-primary"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{active ? (
										<motion.span
											layoutId="nav-active"
											className="absolute inset-0 rounded-full bg-primary/10"
											transition={{
												type: "spring",
												stiffness: 380,
												damping: 30,
											}}
										/>
									) : null}
									<span className="relative">{t(`nav.${id}`)}</span>
								</a>
							</li>
						);
					})}
				</ul>

				<div className="flex items-center gap-1">
					<LanguageSwitcher />
					<ThemeToggle />
					<Button
						render={
							<a href={profile.cvFile} download>
								<Icon name="Download" />
								<span className="hidden md:inline">
									{t("common.downloadCv")}
								</span>
							</a>
						}
						size="sm"
						className="ml-1 hidden sm:inline-flex"
					/>
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						aria-label={t("common.menu")}
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen((v) => !v)}
					>
						<Icon name={mobileOpen ? "X" : "Menu"} />
					</Button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileOpen ? (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg lg:hidden"
					>
						<ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
							{navSections.map((id) => (
								<li key={id}>
									<a
										href={`#${id}`}
										onClick={() => setMobileOpen(false)}
										className={cn(
											"block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
											activeId === id
												? "bg-primary/10 text-primary"
												: "text-foreground hover:bg-muted",
										)}
									>
										{t(`nav.${id}`)}
									</a>
								</li>
							))}
							<li className="pt-2">
								<Button
									render={
										<a
											href={profile.cvFile}
											download
											onClick={() => setMobileOpen(false)}
										>
											<Icon name="Download" />
											{t("common.downloadCv")}
										</a>
									}
									className="w-full"
								/>
							</li>
						</ul>
					</motion.div>
				) : null}
			</AnimatePresence>
		</header>
	);
}
