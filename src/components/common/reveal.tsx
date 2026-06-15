import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	/** entrance direction */
	from?: Direction;
	/** stagger delay in seconds */
	delay?: number;
	/** render as a different element (e.g. 'li', 'span') */
	as?: keyof typeof motion;
	once?: boolean;
}

const offset = 24;

function getInitial(from: Direction) {
	switch (from) {
		case "up":
			return { opacity: 0, y: offset };
		case "down":
			return { opacity: 0, y: -offset };
		case "left":
			return { opacity: 0, x: offset };
		case "right":
			return { opacity: 0, x: -offset };
		default:
			return { opacity: 0 };
	}
}

/** Scroll-triggered entrance animation that honors reduced-motion. */
export function Reveal({
	children,
	className,
	from = "up",
	delay = 0,
	as = "div",
	once = true,
}: RevealProps) {
	const reduce = useReducedMotion();
	const Component = motion[as] as typeof motion.div;

	const variants: Variants = {
		hidden: reduce ? { opacity: 0 } : getInitial(from),
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<Component
			className={cn(className)}
			variants={variants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once, margin: "0px 0px -10% 0px" }}
		>
			{children}
		</Component>
	);
}
