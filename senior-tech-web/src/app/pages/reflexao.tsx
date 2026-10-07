import { ArrowRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link, type MetaFunction } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";

const REFLECTION_OPTIONS = [
	{
		id: "a",
		letter: "A",
		label: "Sim. Eu perceberia que havia algo estranho.",
	},
	{
		id: "b",
		letter: "B",
		label:
			"Talvez. Eu ficaria desconfiado(a) e confirmaria antes de fazer qualquer coisa.",
	},
	{
		id: "c",
		letter: "C",
		label: "Não. Eu provavelmente acreditaria na mensagem.",
	},
	{
		id: "d",
		letter: "D",
		label:
			"Não tenho certeza. Quero entender quais sinais poderiam indicar o golpe.",
	},
] as const;

export const meta: MetaFunction = () => [
	{ title: "Você teria percebido o golpe? | Senior Tech" },
	{
		content:
			"Reflita sobre a situação do vídeo, reconheça os sinais de golpe e saiba como confirmar antes de fazer um pagamento.",
		name: "description",
	},
];

function ReflectionGuidance({ idPrefix }: { idPrefix: string }) {
	return (
		<section
			aria-labelledby={`${idPrefix}-reflection-guidance-title`}
			className="mt-7 rounded-xl border border-primary/25 bg-secondary p-5 sm:p-7"
		>
			<h2
				className="text-2xl font-bold text-primary"
				id={`${idPrefix}-reflection-guidance-title`}
			>
				Você sabia?
			</h2>
			<p className="mt-4 text-lg leading-relaxed">
				Golpes podem parecer mensagens comuns do dia a dia.
			</p>
			<p className="mt-3 text-lg leading-relaxed">
				Neste caso, alguns sinais mereciam atenção:
			</p>
			<ul className="mt-3 list-disc space-y-2 pl-6 text-lg leading-relaxed marker:text-primary">
				<li>A pessoa dizia ter trocado de número.</li>
				<li>Havia um pedido de dinheiro.</li>
				<li>Existia uma sensação de urgência.</li>
			</ul>
			<p className="mt-5 text-lg leading-relaxed font-semibold">
				Na dúvida, não faça o pagamento antes de confirmar quem está falando com
				você.
			</p>
			<p className="mt-6 border-l-4 border-primary pl-4 text-xl font-bold text-primary">
				Pare, Pense e Confirme
			</p>
		</section>
	);
}

function QuizIntroduction({ idPrefix }: { idPrefix: string }) {
	return (
		<section
			aria-labelledby={`${idPrefix}-quiz-introduction-title`}
			className="mt-10 border-t border-border pt-8"
		>
			<h2
				className="text-2xl font-bold text-primary"
				id={`${idPrefix}-quiz-introduction-title`}
			>
				Agora é sua vez!
			</h2>
			<p className="mt-4 max-w-[70ch] text-lg leading-relaxed">
				Você já viu como um golpe pode parecer uma situação comum.
				<br />
				Agora vamos testar seus conhecimentos em outras situações do dia a dia.
				<br />
				Leia cada situação com atenção e escolha a resposta que você considera
				mais segura.
			</p>
			<Link
				className={cn(
					buttonVariants({ size: "lg", variant: "success" }),
					"mt-7 h-auto min-h-12 w-full gap-3 whitespace-normal px-5 py-3 sm:w-auto",
				)}
				to="/quiz"
			>
				Começar quiz <ArrowRight aria-hidden="true" />
			</Link>
		</section>
	);
}

export default function ReflectionPage() {
	const [selectedOptionId, setSelectedOptionId] = useState("");

	return (
		<section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
			<Link
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"w-fit gap-2 transition-[gap] duration-200 hover:gap-4",
				)}
				to="/video"
			>
				<ChevronLeft aria-hidden="true" /> Voltar
			</Link>

			<h1 className="mt-7 text-3xl font-bold tracking-tight text-primary">
				Você teria percebido o golpe?
			</h1>
			<p className="mt-5 text-lg leading-relaxed" id="reflection-question">
				Agora imagine que essa situação realmente acontecesse com você. Você
				acha que perceberia algo estranho?
			</p>

			<div data-js-only>
				<fieldset className="mt-7 min-w-0 border-0 p-0">
					<legend className="sr-only">
						Como você reagiria à mensagem do vídeo?
					</legend>
					<div className="grid w-full gap-3">
						{REFLECTION_OPTIONS.map((option) => {
							const inputId = `reflection-option-${option.id}`;
							const isSelected = selectedOptionId === option.id;

							return (
								<Item
									className={cn(
										"min-h-14 min-w-0 cursor-pointer flex-nowrap items-start gap-4 p-4 text-base transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary/55 hover:bg-secondary/70 motion-reduce:transition-none",
										isSelected &&
											"border-primary bg-secondary ring-2 ring-primary/20",
									)}
									key={option.id}
									render={(props) => (
										<label {...props} htmlFor={inputId}>
											{props.children}
										</label>
									)}
									variant="outline"
								>
									<ItemMedia className="mt-0.5">
										<input
											checked={isSelected}
											className="size-6 shrink-0 cursor-pointer accent-primary focus-visible:rounded-full focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
											id={inputId}
											name="reflection-answer"
											onChange={() => setSelectedOptionId(option.id)}
											type="radio"
											value={option.id}
										/>
									</ItemMedia>
									<ItemContent className="min-w-0 gap-0">
										<ItemTitle className="line-clamp-none w-auto items-start text-base leading-relaxed font-medium whitespace-normal">
											<span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
												{option.letter}. {option.label}
											</span>
										</ItemTitle>
									</ItemContent>
								</Item>
							);
						})}
					</div>
				</fieldset>

				{selectedOptionId && (
					<>
						<div aria-live="polite" role="status">
							<ReflectionGuidance idPrefix="interactive" />
						</div>
						<QuizIntroduction idPrefix="interactive" />
					</>
				)}
			</div>

			<div data-no-js-only>
				<ol className="mt-7 space-y-3" aria-label="Possíveis reações">
					{REFLECTION_OPTIONS.map((option) => (
						<li
							className="min-h-14 rounded-lg border border-border bg-card p-4 text-base leading-relaxed"
							key={option.id}
						>
							<strong>{option.letter}.</strong> {option.label}
						</li>
					))}
				</ol>
				<ReflectionGuidance idPrefix="static" />
				<QuizIntroduction idPrefix="static" />
			</div>
		</section>
	);
}
