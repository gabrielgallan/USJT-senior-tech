import { AccessibilityProvider } from "@/components/accessibility-provider";
import { SpeechProvider } from "@/components/speech-provider";
import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./index.css";

const INITIAL_DOCUMENT_SCRIPT = `
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");
try {
  const scale = localStorage.getItem("senior-tech.font-scale");
  if (["100", "125", "150", "175", "200"].includes(scale)) {
    document.documentElement.dataset.fontScale = scale;
  }
} catch {}
`;

export const links = () => [
	{ href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
];

export function Layout({ children }: { children: ReactNode }) {
	return (
		<html className="no-js" lang="pt-BR" suppressHydrationWarning>
			<head>
				<meta charSet="UTF-8" />
				<meta content="width=device-width, initial-scale=1.0" name="viewport" />
				<Meta />
				<Links />
				{/* This runs before the body is painted, preventing fallback flash. */}
				<script>{INITIAL_DOCUMENT_SCRIPT}</script>
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function Root() {
	return (
		<AccessibilityProvider>
			<SpeechProvider>
				<Outlet />
			</SpeechProvider>
		</AccessibilityProvider>
	);
}
