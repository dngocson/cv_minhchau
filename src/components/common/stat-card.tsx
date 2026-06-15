import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/types/cv";
import { CountUp } from "./count-up";
import { Icon } from "./icon";

interface StatCardProps {
	stat: StatItem;
	className?: string;
}

/** A single animated KPI: icon, counted-up value, and translated label. */
export function StatCard({ stat, className }: StatCardProps) {
	const { t } = useTranslation();
	const decimals = Number.isInteger(stat.value) ? 0 : 2;

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40",
				className,
			)}
		>
			<div className="flex items-center gap-2 text-primary">
				<Icon name={stat.icon} className="size-5" />
			</div>
			<div className="mt-3 font-heading text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
				{stat.prefix}
				<CountUp value={stat.value} decimals={decimals} />
				{stat.suffix}
			</div>
			<p className="mt-1 text-sm text-muted-foreground">
				{t(`stats.${stat.id}`)}
			</p>
			<div className="pointer-events-none absolute -right-6 -bottom-6 size-20 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
		</div>
	);
}
