import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/common/icon";

export function BackToTop() {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		function onScroll() {
			setVisible(window.scrollY > 600);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AnimatePresence>
			{visible ? (
				<motion.button
					type="button"
					initial={{ opacity: 0, scale: 0.6, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.6, y: 10 }}
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label={t("common.backToTop")}
					title={t("common.backToTop")}
					className="fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-colors hover:border-primary/50 hover:text-primary sm:right-8 sm:bottom-8"
				>
					<Icon name="ArrowUp" className="size-5" />
				</motion.button>
			) : null}
		</AnimatePresence>
	);
}
