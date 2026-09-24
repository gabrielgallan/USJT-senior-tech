import { BrowserTitle } from "@/components/browser-title";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function VideoPage() {
	const navigate = useNavigate();

	return (
		<>
			<BrowserTitle title="Veja como o golpe acontece" />
			<section className="mx-auto w-full h-[calc(h-screen - 20)] max-w-7xl p-4 sm:px-6 sm:py-10 lg:px-8 lg:py-12 flex flex-col">
				<Button
					variant="ghost"
					className="transition-all duration-100 w-fit flex items-center gap-2 hover:gap-4 cursor-pointer"
					onClick={() => navigate("/")}
				>
					<ChevronLeft /> Voltar
				</Button>
				<div className="mt-2">
					<h1 className="text-3xl font-bold tracking-tight text-primary sm:text-3xl">
						Veja como o golpe acontece
					</h1>
					<p className="mt-5 text-lg leading-relaxed text-foreground">
						Assista ao vídeo e preste atenção nos detalhes. Depois, responda:{" "}
						<strong>Você teria percebido o golpe ?</strong>
					</p>
				</div>

				<Button
					onClick={() => navigate("/quiz")}
					variant="success"
					className="w-full mt-auto cursor-pointer text-white text-xl md:text-2xl font-bold flex items-center justify-center gap-4 px-4 py-10 rounded-2xl"
				>
					Continuar <ChevronRight className="size-6 md:size-12" />
				</Button>
			</section>
		</>
	);
}
