import { AccessibilityProvider } from "@/components/accessibility-provider";
import { SpeechProvider } from "@/components/speech-provider";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./router";

export function App() {
	return (
		<HelmetProvider>
			<AccessibilityProvider>
				<SpeechProvider>
					<RouterProvider router={router} />
				</SpeechProvider>
			</AccessibilityProvider>
		</HelmetProvider>
	);
}
