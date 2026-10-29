type VideoPlayerProps = {
	embedUrl: string;
	title: string;
	videoUrl: string;
};

export function VideoPlayer({
	embedUrl,
	title,
	videoUrl,
}: VideoPlayerProps) {
	return (
		<section aria-label="Reprodutor do vídeo" className="mt-8 w-full">
			<div className="overflow-hidden rounded-xl bg-black shadow-sm">
				<iframe
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					className="aspect-video w-full"
					src={embedUrl}
					title={title}
				/>
			</div>

			<p className="mt-3 text-base leading-relaxed">
				Se o vídeo não abrir, {" "}
				<a
					className="font-semibold text-primary underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-ring"
					href={videoUrl}
					rel="noopener noreferrer"
					target="_blank"
				>
					assista no YouTube
				</a>
				.
			</p>
		</section>
	);
}
