import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, type MetaFunction } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";
import { cn } from "@/lib/utils";

const youtubeVideoUrl = "https://www.youtube.com/shorts/zZn9ejYODTM";
const youtubeEmbedUrl = "https://www.youtube-nocookie.com/embed/zZn9ejYODTM";

export const meta: MetaFunction = () => [
	{ title: "Veja como o golpe acontece | Senior Tech" },
	{
		content:
			"Assista a uma situação simulada e aprenda a perceber sinais de golpes virtuais.",
		name: "description",
	},
];

export default function VideoPage() {
	return (
		<section className="mx-auto flex w-full max-w-7xl flex-col p-4 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
			<Link
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"w-fit gap-2 transition-[gap] duration-200 hover:gap-4",
				)}
				to="/"
			>
				<ChevronLeft aria-hidden="true" /> Voltar
			</Link>
			<div className="mt-2">
				<h1 className="text-3xl font-bold tracking-tight text-primary sm:text-3xl">
					Veja como o golpe acontece
				</h1>
				<p className="mt-5 text-lg leading-relaxed text-foreground">
					Assista ao vídeo e preste atenção aos detalhes. Depois, responda:{" "}
					<strong>Você teria percebido o golpe?</strong>
				</p>
			</div>

			<VideoPlayer
				embedUrl={youtubeEmbedUrl}
				title="Situação simulada de golpe por mensagem"
				videoUrl={youtubeVideoUrl}
			/>

			<Link
				className={cn(
					buttonVariants({ size: "lg", variant: "success" }),
					"mt-10 h-auto min-h-12 w-full gap-4 whitespace-normal rounded-xl px-4 py-5 text-lg font-bold sm:mt-14 md:text-xl",
				)}
				to="/reflexao"
			>
				Continuar <ChevronRight aria-hidden="true" className="size-6" />
			</Link>
		</section>
	);
}
