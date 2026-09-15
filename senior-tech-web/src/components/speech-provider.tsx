import * as React from "react";

export type SpeechStatus = "idle" | "speaking" | "paused" | "unsupported";

type SpeechProviderProps = {
	children: React.ReactNode;
};

type SpeechProviderState = {
	announcement: string;
	status: SpeechStatus;
	pause: () => void;
	resume: () => void;
	speak: (content: string | string[]) => void;
	stop: () => void;
};

const SpeechContext = React.createContext<SpeechProviderState | undefined>(
	undefined,
);

function supportsSpeechSynthesis() {
	return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function normalizeSpeechContent(content: string | string[]) {
	const segments = Array.isArray(content) ? content : [content];
	return segments.map((segment) => segment.trim()).filter(Boolean);
}

function selectPortugueseVoice() {
	const voices = window.speechSynthesis.getVoices();

	return (
		voices.find((voice) => voice.lang.toLowerCase() === "pt-br") ??
		voices.find((voice) => voice.lang.toLowerCase().startsWith("pt"))
	);
}

export function SpeechProvider({ children }: SpeechProviderProps) {
	const supported = supportsSpeechSynthesis();
	const [status, setStatus] = React.useState<SpeechStatus>(
		supported ? "idle" : "unsupported",
	);
	const [announcement, setAnnouncement] = React.useState(
		supported
			? "Leitura em voz alta pronta."
			: "A leitura em voz alta não está disponível neste navegador.",
	);
	const sessionRef = React.useRef(0);
	const statusRef = React.useRef<SpeechStatus>(status);
	const voiceRef = React.useRef<SpeechSynthesisVoice | undefined>(undefined);

	React.useEffect(() => {
		statusRef.current = status;
	}, [status]);

	React.useEffect(() => {
		if (!supported) {
			return undefined;
		}

		const updateVoice = () => {
			voiceRef.current = selectPortugueseVoice();
		};

		updateVoice();
		window.speechSynthesis.addEventListener("voiceschanged", updateVoice);

		return () => {
			sessionRef.current += 1;
			window.speechSynthesis.cancel();
			window.speechSynthesis.removeEventListener("voiceschanged", updateVoice);
		};
	}, [supported]);

	const stop = React.useCallback(() => {
		if (!supported) {
			return;
		}

		const wasActive =
			statusRef.current === "speaking" || statusRef.current === "paused";
		sessionRef.current += 1;
		window.speechSynthesis.cancel();
		statusRef.current = "idle";
		setStatus("idle");

		if (wasActive) {
			setAnnouncement("Leitura interrompida.");
		}
	}, [supported]);

	const speak = React.useCallback(
		(content: string | string[]) => {
			if (!supported) {
				setAnnouncement(
					"A leitura em voz alta não está disponível neste navegador.",
				);
				return;
			}

			const segments = normalizeSpeechContent(content);
			if (segments.length === 0) {
				stop();
				setAnnouncement("Não há texto disponível para leitura nesta página.");
				return;
			}

			stop();
			const session = sessionRef.current;

			const speakSegment = (index: number) => {
				if (session !== sessionRef.current) {
					return;
				}

				if (index >= segments.length) {
					statusRef.current = "idle";
					setStatus("idle");
					setAnnouncement("Leitura finalizada.");
					return;
				}

				const utterance = new SpeechSynthesisUtterance(segments[index]);
				utterance.lang = "pt-BR";
				utterance.rate = 0.9;
				utterance.pitch = 1;

				if (voiceRef.current) {
					utterance.voice = voiceRef.current;
				}

				utterance.addEventListener("end", () => speakSegment(index + 1));
				utterance.addEventListener("error", (event) => {
					if (session !== sessionRef.current || event.error === "canceled") {
						return;
					}

					statusRef.current = "idle";
					setStatus("idle");
					setAnnouncement("Não foi possível concluir a leitura desta página.");
				});

				window.speechSynthesis.speak(utterance);
			};

			statusRef.current = "speaking";
			setStatus("speaking");
			setAnnouncement("Leitura iniciada.");
			speakSegment(0);
		},
		[stop, supported],
	);

	const pause = React.useCallback(() => {
		if (!supported || statusRef.current !== "speaking") {
			return;
		}

		window.speechSynthesis.pause();
		statusRef.current = "paused";
		setStatus("paused");
		setAnnouncement("Leitura pausada.");
	}, [supported]);

	const resume = React.useCallback(() => {
		if (!supported || statusRef.current !== "paused") {
			return;
		}

		window.speechSynthesis.resume();
		statusRef.current = "speaking";
		setStatus("speaking");
		setAnnouncement("Leitura retomada.");
	}, [supported]);

	const value = React.useMemo(
		() => ({ announcement, pause, resume, speak, status, stop }),
		[announcement, pause, resume, speak, status, stop],
	);

	return (
		<SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
	);
}

export function useSpeech() {
	const context = React.useContext(SpeechContext);

	if (context === undefined) {
		throw new Error("useSpeech must be used within a SpeechProvider");
	}

	return context;
}
