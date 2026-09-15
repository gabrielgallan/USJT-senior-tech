import { BrowserTitle } from "@/components/browser-title";
import { Button } from "@base-ui/react/button";
import { BadgeQuestionMark, Play } from "lucide-react";
import homeImage2 from "../../assets/home_2.png";
import { useNavigate } from "react-router-dom";

export function HomePage() {
	const navigate = useNavigate();

	return (
		<>
			<BrowserTitle />
			<section className="mx-auto w-full h-[calc(h-screen - 20)] max-w-7xl p-8 flex flex-col gap-8 justify-between">
				<div className="grid md:grid-cols-2 gap-8">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-primary sm:text-3xl">
							Cuidado com golpes no celular
						</h1>
						<p className="mt-5 text-lg leading-relaxed text-foreground">
							Golpistas podem se passar por familiares, bancos, empresas e
							órgãos do governo. Aprenda a reconhecer uma mensagem falsa e
							proteja seu dinheiro.
						</p>
					</div>

					<img src={homeImage2} alt="" className="rounded-full" />
				</div>

				<div className="grid md:grid-cols-2 md:gap-8 gap-6">
					<div className="flex flex-col transition-all duration-200 ease-in-out rounded-2xl overflow-hidden border-2 border-sidebar">
						<Button
							onClick={() => navigate("/video")}
							className="w-full cursor-pointer hover:brightness-85 bg-sidebar text-white text-xl md:text-2xl font-bold flex items-center justify-center gap-4 px-4 py-6 rounded-0"
						>
							<Play className="size-6 md:size-12 fill-white" /> Ver vídeos
						</Button>

						<div className="flex items-center justify-center text-center py-6 mx-12 text-lg">
							Veja exemplos de golpes na prática
						</div>
					</div>

					<div className="flex flex-col transition-all duration-200 ease-in-out rounded-2xl overflow-hidden border-2 border-sidebar">
						<Button
							onClick={() => navigate("/quiz")}
							className="w-full cursor-pointer hover:brightness-85 bg-sidebar text-white text-xl md:text-2xl font-bold flex items-center justify-center gap-4 px-4 py-6 rounded-0"
						>
							<BadgeQuestionMark className="size-6 md:size-12 fill-white stroke-sidebar" />{" "}
							Fazer o quiz
						</Button>

						<div className="flex items-center justify-center text-center py-6 mx-12 text-lg">
							Teste o que voçê aprendeu
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
