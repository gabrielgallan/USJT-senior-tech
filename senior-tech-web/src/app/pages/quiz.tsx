import { BrowserTitle } from "@/components/browser-title";
import { Button } from "@base-ui/react/button";
import { BadgeQuestionMark, ChevronLeft, Play } from "lucide-react";
import homeImage2 from '../../assets/home_2.png'
import { useNavigate } from "react-router-dom";

export function QuizPage() {
	const navigate = useNavigate()

	return (
		<>
			<BrowserTitle title="Quiz" />
			<section className="mx-auto w-full h-[calc(h-screen - 20)] max-w-7xl p-8 flex flex-col">
				<Button 
                    className="transition-all duration-100 w-fit flex items-center gap-2 hover:gap-4 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <ChevronLeft /> Voltar
                </Button>
                <div className="mt-2">
					<h1 className="text-3xl font-bold tracking-tight text-primary sm:text-3xl">
						Quiz...
					</h1>
				</div>
			</section>
		</>
	);
}
