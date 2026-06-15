import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES, useSettings } from "@/store/settings";

export function LanguageSwitcher() {
	const language = useSettings((s) => s.language);
	const setLanguage = useSettings((s) => s.setLanguage);
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function onPointerDown(e: PointerEvent) {
			if (ref.current && !ref.current.contains(e.target as Node))
				setOpen(false);
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const current = SUPPORTED_LANGUAGES.find((l) => l.code === language);

	return (
		<div ref={ref} className="relative">
			<Button
				variant="ghost"
				size="sm"
				className="h-11 gap-1.5 px-2.5 lg:h-9"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="menu"
				aria-expanded={open}
				aria-label={t("common.language")}
			>
				<Icon name="Globe" className="size-4" />
				<span className="font-semibold">{current?.short}</span>
			</Button>

			<AnimatePresence>
				{open ? (
					<motion.ul
						role="menu"
						initial={{ opacity: 0, y: -6, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.97 }}
						transition={{ duration: 0.15 }}
						className="absolute right-0 z-50 mt-2 w-44 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border bg-popover p-1 shadow-lg flex flex-col gap-1"
					>
						{SUPPORTED_LANGUAGES.map((lang) => {
							const active = lang.code === language;
							return (
								<li key={lang.code} role="none">
									<button
										type="button"
										role="menuitemradio"
										aria-checked={active}
										onClick={() => {
											setLanguage(lang.code);
											setOpen(false);
										}}
										className={cn(
											"flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors sm:min-h-9",
											active
												? "bg-primary/10 font-medium text-primary"
												: "text-foreground hover:bg-muted",
										)}
									>
										<span>{lang.label}</span>
										{active ? <Icon name="Check" className="size-4" /> : null}
									</button>
								</li>
							);
						})}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</div>
	);
}
