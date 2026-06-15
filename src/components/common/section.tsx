import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionProps extends React.ComponentProps<"section"> {
	id: string;
}

/** Standard page section: full-width band with a centered, padded container. */
export function Section({ id, className, children, ...props }: SectionProps) {
	return (
		<section
			id={id}
			className={cn("scroll-mt-20 py-20 sm:py-24 lg:py-28", className)}
			{...props}
		>
			<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
		</section>
	);
}

interface SectionHeadingProps {
	kicker: string;
	title: string;
	subtitle?: string;
	align?: "left" | "center";
	className?: string;
}

/** Consistent kicker + title + subtitle block used at the top of each section. */
export function SectionHeading({
	kicker,
	title,
	subtitle,
	align = "center",
	className,
}: SectionHeadingProps) {
	return (
		<Reveal
			className={cn(
				"flex max-w-2xl flex-col gap-3",
				align === "center" && "mx-auto items-center text-center",
				className,
			)}
		>
			<span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
				<span className="h-px w-6 bg-primary/50" aria-hidden />
				{kicker}
			</span>
			<h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
				{title}
			</h2>
			{subtitle ? (
				<p className="text-base text-pretty text-muted-foreground sm:text-lg">
					{subtitle}
				</p>
			) : null}
		</Reveal>
	);
}
