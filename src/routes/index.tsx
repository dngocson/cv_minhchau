import { createFileRoute } from "@tanstack/react-router";
import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		// `overflow-x-clip` contains the transient horizontal transforms of the
		// scroll-entrance animations (Reveal slides elements in from ±x). The
		// layout itself is already within the viewport; this is animation
		// containment, not a layout band-aid. `clip` (not `hidden`) avoids
		// creating a scroll container and never clips the fixed header (the root
		// is not a containing block for fixed positioning).
		<div className="min-h-screen overflow-x-clip bg-background">
			<ScrollProgress />
			<Navbar />
			<a
				href="#about"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
			>
				Skip to content
			</a>
			<main>
				<Hero />
				<About />
				<Experience />
				<Achievements />
				<Skills />
				<Education />
				<Certifications />
				{/* <Projects /> */}
				<Contact />
			</main>
			<Footer />
			<BackToTop />
		</div>
	);
}
