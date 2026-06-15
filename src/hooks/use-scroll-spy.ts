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

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActiveId(entry.target.id);
				}
			},
			{ rootMargin, threshold: 0 },
		);

		for (const el of elements) observer.observe(el);
		return () => observer.disconnect();
	}, [ids, rootMargin]);

	return activeId;
}
