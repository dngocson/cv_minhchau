import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@/lib/i18n";
import { Navbar } from "@/components/layout/navbar";

describe("Navbar mobile menu", () => {
	it("toggles the mobile menu and wires aria attributes", () => {
		render(<Navbar />);
		const toggle = screen.getByRole("button", { name: "Menu" });

		expect(toggle.getAttribute("aria-expanded")).toBe("false");
		expect(toggle.getAttribute("aria-controls")).toBe("mobile-navigation");
		expect(document.getElementById("mobile-navigation")).toBeNull();

		fireEvent.click(toggle);
		expect(toggle.getAttribute("aria-expanded")).toBe("true");
		expect(document.getElementById("mobile-navigation")).not.toBeNull();

		// Escape closes the menu.
		fireEvent.keyDown(document, { key: "Escape" });
		expect(toggle.getAttribute("aria-expanded")).toBe("false");
	});
});
