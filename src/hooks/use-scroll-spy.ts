import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view, for nav highlighting.
 * Uses IntersectionObserver against the given section ids.
 */
export function useScrollSpy(
	ids: readonly string[],
	rootMargin = "-45% 0px -50% 0px",
) {
	const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

	useEffect(() => {
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		// Track every section currently inside the trigger band so we can pick a
		// stable winner instead of reacting to whichever entry fires last.
		const visible = new Set<string>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target.id);
					else visible.delete(entry.target.id);
				}
				// Highlight the topmost visible section (document order). When the
				// band sits between sections, keep the previous id to avoid flicker.
				const next = ids.find((id) => visible.has(id));
				if (next) setActiveId(next);
			},
			{ rootMargin, threshold: 0 },
		);

		for (const el of elements) observer.observe(el);
		return () => observer.disconnect();
	}, [ids, rootMargin]);

	return activeId;
}
