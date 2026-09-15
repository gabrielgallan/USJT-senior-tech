import { useAccessibility } from "@/components/accessibility-provider";
import { useSpeech } from "@/components/speech-provider";
import { Button } from "@/components/ui/button";
import {
	AArrowDown,
	AArrowUp,
	Pause,
	Play,
	Square,
	Volume2,
} from "lucide-react";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { ButtonGroup } from "./ui/button-group";

const SPEECH_SELECTOR =
	"h1, h2, h3, p, li, legend, label, figcaption, [data-speech-text]";

function getReadablePageContent() {
	const main = document.getElementById("conteudo-principal");
	if (!main) {
		return [];
	}

	const segments: string[] = [];
	const seen = new Set<string>();

	for (const element of main.querySelectorAll<HTMLElement>(SPEECH_SELECTOR)) {
		if (
			element.closest("[data-speech-ignore], [aria-hidden='true']") ||
			element.getClientRects().length === 0 ||
			(element.matches("li") && element.querySelector("p"))
		) {
			continue;
		}

		const text = element.innerText.replace(/\s+/g, " ").trim();
		if (text && !seen.has(text)) {
			seen.add(text);
			segments.push(text);
		}
	}

	return segments;
}

export function AccessibilityToolbar() {
	const {
		canDecreaseFontScale,
		canIncreaseFontScale,
		decreaseFontScale,
		increaseFontScale,
	} = useAccessibility();
	const { announcement, pause, resume, speak, status, stop } = useSpeech();
	const location = useLocation();
	const previousPathRef = React.useRef(location.pathname);

	React.useEffect(() => {
		if (previousPathRef.current !== location.pathname) {
			stop();
			previousPathRef.current = location.pathname;
		}
	}, [location.pathname, stop]);

	const handleReadButton = () => {
		if (status === "speaking") {
			pause();
			return;
		}

		if (status === "paused") {
			resume();
			return;
		}

		speak(getReadablePageContent());
	};

	const speechButtonLabel =
		status === "speaking"
			? "Pausar"
			: status === "paused"
				? "Continuar leitura"
				: status === "unsupported"
					? "Áudio indisponível"
					: "Ouvir esta página";

	return (
		<div className="flex min-w-0 flex-wrap items-center gap-3">
			<fieldset className="flex min-w-0 flex-wrap items-center gap-2 border-0 p-0">
				<legend className="sr-only">Ajustar tamanho do texto</legend>
				<ButtonGroup>
					<Button
						aria-label="Diminuir tamanho do texto"
						className="border-white/50 bg-white text-primary hover:bg-white/90 focus-visible:border-white focus-visible:ring-white/70"
						disabled={!canDecreaseFontScale}
						onClick={decreaseFontScale}
						size="icon"
						variant="outline"
					>
						<AArrowDown aria-hidden="true" className="size-7" />
					</Button>
					{/* <output
						aria-label="Tamanho atual do texto"
						className="min-w-16 text-center font-semibold tabular-nums text-sidebar-foreground"
					>
						{fontScale}%
					</output> */}
					<Button
						aria-label="Aumentar tamanho do texto"
						className="border-white/50 bg-white text-primary hover:bg-white/90 focus-visible:border-white focus-visible:ring-white/70"
						disabled={!canIncreaseFontScale}
						onClick={increaseFontScale}
						size="icon"
						variant="outline"
					>
						<AArrowUp aria-hidden="true" className="size-7" />
					</Button>
				</ButtonGroup>
			</fieldset>

			<fieldset className="flex min-w-0 flex-wrap items-center gap-2 border-0 p-0">
				<legend className="sr-only">Leitura em voz alta</legend>
				<Button
					className="h-auto min-h-11 max-w-full whitespace-normal border-white/50 bg-white py-2 text-center text-primary hover:bg-white/90 focus-visible:border-white focus-visible:ring-white/70"
					disabled={status === "unsupported"}
					onClick={handleReadButton}
					variant="outline"
				>
					{status === "speaking" ? (
						<Pause aria-hidden="true" data-icon="inline-start" />
					) : status === "paused" ? (
						<Play aria-hidden="true" data-icon="inline-start" />
					) : (
						<Volume2 aria-hidden="true" data-icon="inline-start" />
					)}
					{speechButtonLabel}
				</Button>
				{(status === "speaking" || status === "paused") && (
					<Button
						className="h-auto min-h-11 max-w-full whitespace-normal border-white/60 bg-transparent py-2 text-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:border-white focus-visible:ring-white/70"
						onClick={stop}
						variant="outline"
					>
						<Square aria-hidden="true" data-icon="inline-start" />
						Parar
					</Button>
				)}
			</fieldset>

			<p aria-live="polite" className="sr-only">
				{announcement}
			</p>
		</div>
	);
}
