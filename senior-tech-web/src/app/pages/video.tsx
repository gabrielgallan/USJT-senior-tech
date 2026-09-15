import { BrowserTitle } from "@/components/browser-title";
import { Button } from "@base-ui/react/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function VideoPage() {
	const navigate = useNavigate()

	return (
		<>
			<BrowserTitle title="Veja como o golpe acontece" />
			<section className="mx-auto w-full h-[calc(h-screen - 20)] max-w-7xl p-8 flex flex-col">
				<Button 
                    className="transition-all duration-100 w-fit flex items-center gap-2 hover:gap-4 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <ChevronLeft /> Voltar
                </Button>
                <div className="mt-2">
					<h1 className="text-3xl font-bold tracking-tight text-primary sm:text-3xl">
						Veja como o golpe acontece
					</h1>
					<p className="mt-5 text-lg leading-relaxed text-foreground">
						Assista ao vídeo e preste atenção nos detalhes. Depois, responda: <strong>Você teria percebido o golpe ?</strong>
					</p>
				</div>

				<Button onClick={() => navigate('/quiz')} className="w-full mt-auto cursor-pointer transition-all duration-200 ease-in-out hover:brightness-85 bg-sidebar text-white text-xl md:text-2xl font-bold flex items-center justify-center gap-4 px-4 py-6 rounded-2xl">
					Continuar <ChevronRight className="size-6 md:size-12" />
				</Button>
			</section>
		</>
	);
}
