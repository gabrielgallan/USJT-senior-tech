import { BrowserTitle } from "@/components/browser-title";
import {
	ArrowRight,
	BadgeQuestionMark,
	Play,
	ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

import homeImage2 from "../../assets/home_2.png";

export function HomePage() {
	return (
		<>
			<BrowserTitle />
			<section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
				<div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
					<div className="max-w-[70ch]">
						<h1 className="text-3xl font-bold tracking-tight text-primary">
							Aprenda a reconhecer golpes no celular
						</h1>
						<p className="mt-5 text-lg leading-relaxed text-foreground">
							Golpistas podem se passar por familiares, bancos, empresas ou
							órgãos públicos. Eles tentam criar pressa para você agir sem
							conferir. Aqui, você vai aprender a identificar esses sinais e
							proteger seu dinheiro e suas informações.
						</p>

						<div
							className="mt-6 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/12 p-4 text-warning-foreground"
							role="note"
						>
							<ShieldAlert
								aria-hidden="true"
								className="mt-0.5 size-6 shrink-0 text-warning"
							/>
							<p className="leading-relaxed">
								<strong>Recebeu um pedido urgente?</strong> Pare, não clique nem
								faça pagamentos. Confirme a mensagem por outro telefone ou canal
								oficial.
							</p>
						</div>
					</div>

					<figure className="flex justify-center md:justify-end">
						<img
							alt="Ilustração de uma mensagem em que alguém se passa por um filho e pede um Pix urgente."
							className="h-auto max-h-112 w-full max-w-xl object-contain rounded-4xl"
							height="1086"
							src={homeImage2}
							width="1448"
						/>
					</figure>
				</div>

				<nav
					aria-label="Próximas atividades"
					className="mt-10 flex flex-col gap-4 lg:flex-row lg:gap-6"
				>
					<Link
						className="group flex min-h-32 flex-1 flex-col items-start gap-4 rounded-xl border-2 border-primary bg-card p-5 text-card-foreground outline-none transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 motion-reduce:transform-none sm:flex-row sm:items-center"
						to="/video"
					>
						<span className="flex size-[56px] shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-14">
							<Play aria-hidden="true" className="size-7 fill-current" />
						</span>
						<span className="min-w-0 flex-1">
							<span className="block text-xl font-bold text-primary">
								Assistir ao vídeo
							</span>
							<span className="mt-1 block leading-relaxed">
								Veja uma situação de golpe simulada e descubra quais sinais
								merecem atenção.
							</span>
						</span>
						<ArrowRight
							aria-hidden="true"
							className="size-6 shrink-0 self-end text-primary transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none sm:self-auto"
						/>
					</Link>

					<Link
						className="group flex min-h-32 flex-1 flex-col items-start gap-4 rounded-xl border-2 border-success bg-card p-5 text-card-foreground outline-none transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--success),white_92%)] focus-visible:ring-3 focus-visible:ring-success/40 active:translate-y-0 motion-reduce:transform-none sm:flex-row sm:items-center"
						to="/quiz"
					>
						<span className="flex size-[56px] shrink-0 items-center justify-center rounded-lg bg-success text-success-foreground sm:size-14">
							<BadgeQuestionMark aria-hidden="true" className="size-8" />
						</span>
						<span className="min-w-0 flex-1">
							<span className="block text-xl font-bold text-success">
								Praticar com o quiz
							</span>
							<span className="mt-1 block leading-relaxed">
								Analise cinco situações do dia a dia e escolha a atitude mais
								segura.
							</span>
						</span>
						<ArrowRight
							aria-hidden="true"
							className="size-6 shrink-0 self-end text-success transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none sm:self-auto"
						/>
					</Link>
				</nav>
			</section>
		</>
	);
}
