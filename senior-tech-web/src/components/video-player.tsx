import {
	Maximize2,
	Minimize2,
	Pause,
	Play,
	Volume2,
	VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type VideoPlayerProps = {
	poster: string;
	src: string;
};

function formatTime(seconds: number) {
	if (!Number.isFinite(seconds)) {
		return "--:--";
	}

	const wholeSeconds = Math.floor(seconds);
	const minutes = Math.floor(wholeSeconds / 60);
	const remainingSeconds = String(wholeSeconds % 60).padStart(2, "0");
	return `${minutes}:${remainingSeconds}`;
}

export function VideoPlayer({ poster, src }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const frameRef = useRef<HTMLDivElement>(null);
	const [enhanced, setEnhanced] = useState(false);
	const [duration, setDuration] = useState(Number.NaN);
	const [currentTime, setCurrentTime] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [waiting, setWaiting] = useState(false);
	const [volume, setVolume] = useState(1);
	const [muted, setMuted] = useState(false);
	const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const [loadError, setLoadError] = useState(false);
	const [actionError, setActionError] = useState("");

	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		// Keep native controls in the prerendered HTML and until hydration finishes.
		setCurrentTime(video.currentTime);
		setDuration(video.duration);
		setPlaying(!video.paused && !video.ended);
		setVolume(video.volume);
		setMuted(video.muted);
		setLoadError(video.error !== null);
		setFullscreenAvailable(
			document.fullscreenEnabled &&
				typeof frameRef.current?.requestFullscreen === "function",
		);
		setEnhanced(true);

		const handleFullscreenChange = () => {
			setFullscreen(document.fullscreenElement === frameRef.current);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () =>
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);

	const hasDuration = Number.isFinite(duration) && duration > 0;
	const shownTime = hasDuration ? Math.min(currentTime, duration) : 0;

	const togglePlayback = async () => {
		const video = videoRef.current;
		if (!video || loadError) {
			return;
		}

		setActionError("");
		if (!video.paused) {
			video.pause();
			return;
		}

		if (video.ended) {
			video.currentTime = 0;
		}

		try {
			await video.play();
		} catch {
			setActionError("Não foi possível iniciar o vídeo. Tente novamente.");
		}
	};

	const toggleFullscreen = async () => {
		const frame = frameRef.current;
		if (!frame) {
			return;
		}

		setActionError("");
		try {
			if (document.fullscreenElement === frame) {
				await document.exitFullscreen();
			} else {
				await frame.requestFullscreen();
			}
		} catch {
			setActionError("Não foi possível abrir o vídeo em tela cheia.");
		}
	};

	const statusMessage = loadError
		? "Não foi possível carregar o vídeo. Você pode abri-lo pelo link abaixo."
		: actionError ||
			(waiting ? "Carregando vídeo…" : !hasDuration ? "Preparando vídeo…" : "");

	return (
		<section aria-label="Reprodutor do vídeo" className="mt-8 w-full">
			<div
				className="overflow-hidden rounded-xl bg-black fullscreen:flex fullscreen:flex-col fullscreen:justify-center fullscreen:overflow-y-auto fullscreen:rounded-none"
				ref={frameRef}
			>
				{/* biome-ignore lint/a11y/useMediaCaption: The video is still being edited; captions will be added when its audio is final. */}
				<video
					aria-label="Situação simulada de golpe por mensagem"
					className={
						fullscreen
							? "max-h-[calc(100dvh-11rem)] w-full bg-black object-contain"
							: "aspect-video h-auto w-full bg-black object-contain"
					}
					controls={!enhanced}
					onDurationChange={(event) =>
						setDuration(event.currentTarget.duration)
					}
					onEnded={() => {
						setPlaying(false);
						setWaiting(false);
					}}
					onError={() => {
						setLoadError(true);
						setWaiting(false);
					}}
					onLoadedMetadata={(event) =>
						setDuration(event.currentTarget.duration)
					}
					onPause={() => {
						setPlaying(false);
						setWaiting(false);
					}}
					onPlay={() => {
						setPlaying(true);
						setActionError("");
					}}
					onPlaying={() => setWaiting(false)}
					onTimeUpdate={(event) =>
						setCurrentTime(event.currentTarget.currentTime)
					}
					onVolumeChange={(event) => {
						setVolume(event.currentTarget.volume);
						setMuted(event.currentTarget.muted);
					}}
					onWaiting={() => setWaiting(true)}
					playsInline
					poster={poster}
					preload="metadata"
					ref={videoRef}
					src={src}
				>
					Seu navegador não oferece reprodução de vídeo.{" "}
					<a href={src}>Abra o arquivo de vídeo</a>.
				</video>

				{enhanced && (
					<div className="bg-card p-3 sm:p-4">
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
							<label className="font-semibold" htmlFor="video-progress">
								Progresso do vídeo
							</label>
							<span className="ml-auto font-medium tabular-nums text-muted-foreground">
								{formatTime(shownTime)} / {formatTime(duration)}
							</span>
						</div>
						<input
							aria-valuetext={`${formatTime(shownTime)} de ${formatTime(duration)}`}
							className="mt-1 h-11 w-full cursor-pointer accent-primary outline-none focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!hasDuration || loadError}
							id="video-progress"
							max={hasDuration ? duration : 1}
							min={0}
							onChange={(event) => {
								const video = videoRef.current;
								if (video) {
									video.currentTime = Number(event.currentTarget.value);
									setCurrentTime(video.currentTime);
								}
							}}
							step="0.1"
							type="range"
							value={shownTime}
						/>

						<div className="flex flex-wrap items-center gap-3">
							<Button
								aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
								className="sm:w-auto sm:min-w-36 sm:px-5 gap-2"
								disabled={loadError}
								onClick={togglePlayback}
								size="icon-lg"
								type="button"
							>
								{playing ? (
									<Pause aria-hidden="true" />
								) : (
									<Play aria-hidden="true" />
								)}
								<span className="hidden sm:inline">
									{playing ? "Pausar" : "Reproduzir"}
								</span>
							</Button>

							<div className="flex min-w-40 flex-1 items-center gap-2 sm:justify-end">
								<Button
									aria-label={
										muted || volume === 0 ? "Ativar som" : "Silenciar"
									}
									disabled={loadError}
									onClick={() => {
										const video = videoRef.current;
										if (video) {
											if (video.muted || video.volume === 0) {
												if (video.volume === 0) video.volume = 1;
												video.muted = false;
											} else {
												video.muted = true;
											}
										}
									}}
									size="icon-lg"
									type="button"
									variant="outline"
								>
									{muted || volume === 0 ? (
										<VolumeX aria-hidden="true" />
									) : (
										<Volume2 aria-hidden="true" />
									)}
								</Button>
								<label className="sr-only" htmlFor="video-volume">
									Volume
								</label>
								<input
									aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`}
									className="h-12 min-w-24 max-w-40 flex-1 cursor-pointer accent-primary outline-none focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
									disabled={loadError}
									id="video-volume"
									max={1}
									min={0}
									onChange={(event) => {
										const video = videoRef.current;
										if (video) {
											video.volume = Number(event.currentTarget.value);
											video.muted = video.volume === 0;
										}
									}}
									step="0.05"
									type="range"
									value={muted ? 0 : volume}
								/>
							</div>

							{fullscreenAvailable && (
								<Button
									aria-label={fullscreen ? "Sair da tela cheia" : "Tela cheia"}
									className="sm:w-auto sm:min-w-36 sm:px-5 gap-2"
									onClick={toggleFullscreen}
									size="icon-lg"
									type="button"
									variant="outline"
								>
									{fullscreen ? (
										<Minimize2 aria-hidden="true" />
									) : (
										<Maximize2 aria-hidden="true" />
									)}
									<span className="hidden sm:inline">
										{fullscreen ? "Sair da tela cheia" : "Tela cheia"}
									</span>
								</Button>
							)}
						</div>
					</div>
				)}

				{enhanced && statusMessage && (
					<p
						className="bg-card px-4 pb-3 text-base leading-relaxed text-foreground"
						role={loadError || actionError ? "alert" : "status"}
					>
						{statusMessage}
					</p>
				)}
			</div>

			<p className="mt-3 text-base leading-relaxed">
				Se o vídeo não abrir,{" "}
				<a
					className="font-semibold text-primary underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-ring"
					href={src}
					rel="noopener"
					target="_blank"
				>
					abra o arquivo em outra aba
				</a>
				.
			</p>
		</section>
	);
}
