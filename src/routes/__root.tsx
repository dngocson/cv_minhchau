import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useApplySettings } from "@/hooks/use-apply-settings";

import "../styles.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	useApplySettings();

	return <Outlet />;
}
