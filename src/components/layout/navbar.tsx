import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { navSections, profile } from "@/data/cv";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const MENU_ID = "mobile-navigation";

export function Navbar() {
	const { t } = useTranslation();
	const reduce = useReducedMotion();
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

	// Close the menu on Escape and when the viewport grows to desktop.
	useEffect(() => {
		if (!mobileOpen) return;
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setMobileOpen(false);
		}
		const desktop = window.matchMedia("(min-width: 1024px)");
		function onDesktop(e: MediaQueryListEvent) {
			if (e.matches) setMobileOpen(false);
		}
		document.addEventListener("keydown", onKey);
		desktop.addEventListener("change", onDesktop);
		return () => {
			document.removeEventListener("keydown", onKey);
			desktop.removeEventListener("change", onDesktop);
		};
	}, [mobileOpen]);

	const listVariants = {
		hidden: {},
		visible: {
			transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.05 },
		},
	};
	const itemVariants = {
		hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -12 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
	};

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-40 transition-all duration-300",
				scrolled
					? "border-b border-border bg-background/80 backdrop-blur-lg"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
				<a
					href="#home"
					className="group flex min-w-0 items-center gap-2.5 font-heading text-sm font-bold tracking-tight"
				>
					<span className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
						NC
					</span>
					<span className="hidden truncate sm:inline">{t("nav.brand")}</span>
				</a>

				<ul className="hidden min-w-0 items-center gap-1 lg:flex">
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

				<div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
					<LanguageSwitcher />
					<ThemeToggle />
					<Button
						nativeButton={false}
						render={
							<a href={profile.cvFile} download>
								<Icon name="Download" />
								<span className="hidden md:inline">
									{t("common.downloadCv")}
								</span>
							</a>
						}
						size="sm"
						className="ml-1 hidden h-10 sm:inline-flex lg:h-9"
					/>
					<Button
						variant="ghost"
						size="icon"
						className="size-11 lg:hidden"
						aria-label={t("common.menu")}
						aria-haspopup="menu"
						aria-expanded={mobileOpen}
						aria-controls={MENU_ID}
						onClick={() => setMobileOpen((v) => !v)}
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={mobileOpen ? "close" : "open"}
								initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
								animate={{ rotate: 0, opacity: 1, scale: 1 }}
								exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
								transition={{ duration: 0.18 }}
								className="flex items-center justify-center"
							>
								<Icon name={mobileOpen ? "X" : "Menu"} className="size-5" />
							</motion.span>
						</AnimatePresence>
					</Button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileOpen ? (
					<motion.div
						id={MENU_ID}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg lg:hidden"
					>
						<motion.ul
							variants={listVariants}
							initial="hidden"
							animate="visible"
							className="mx-auto flex max-h-[calc(100dvh-4rem)] w-full max-w-6xl flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6"
						>
							{navSections.map((id) => (
								<motion.li key={id} variants={itemVariants}>
									<a
										href={`#${id}`}
										onClick={() => setMobileOpen(false)}
										aria-current={activeId === id ? "true" : undefined}
										className={cn(
											"flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors active:scale-[0.99]",
											activeId === id
												? "bg-primary/10 text-primary"
												: "text-foreground hover:bg-muted",
										)}
									>
										{t(`nav.${id}`)}
									</a>
								</motion.li>
							))}
							<motion.li variants={itemVariants} className="pt-2">
								<Button
									nativeButton={false}
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
									size="lg"
									className="w-full"
								/>
							</motion.li>
						</motion.ul>
					</motion.div>
				) : null}
			</AnimatePresence>
		</header>
	);
}
