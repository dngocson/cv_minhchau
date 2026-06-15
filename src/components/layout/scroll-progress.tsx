import { motion, useScroll, useSpring } from "motion/react";

/** Thin reading-progress bar pinned under the navbar. */
export function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		mass: 0.3,
	});

	return (
		<motion.div
			aria-hidden
			style={{ scaleX }}
			className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-primary via-chart-2 to-accent-gold"
		/>
	);
}
