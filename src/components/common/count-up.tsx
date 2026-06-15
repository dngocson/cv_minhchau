import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
	value: number;
	/** number of decimal places to render */
	decimals?: number;
	duration?: number;
	className?: string;
}

/** Animates a number from 0 to `value` once it scrolls into view. */
export function CountUp({
	value,
	decimals = 0,
	duration = 1.4,
	className,
}: CountUpProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
	const reduce = useReducedMotion();
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (!inView) return;
		if (reduce) {
			setDisplay(value);
			return;
		}
		const controls = animate(0, value, {
			duration,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (latest) => setDisplay(latest),
		});
		return () => controls.stop();
	}, [inView, value, duration, reduce]);

	return (
		<span ref={ref} className={className}>
			{display.toLocaleString("en-US", {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			})}
		</span>
	);
}
