import {
	ArrowRight,
	Check,
	CheckCircle2,
	ChevronLeft,
	ExternalLink,
	Hand,
	House,
	PhoneCall,
	Search,
	TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, type MetaFunction } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { QUIZ_QUESTIONS } from "./quiz-data";

type QuizStatus = "answering" | "reviewing" | "completed";

export const meta: MetaFunction = () => [
	{ title: "Quiz de segurança | Senior Tech" },
	{
		content:
			"Pratique como agir com segurança em cinco situações comuns de golpes virtuais.",
		name: "description",
	},
];

function getResultMessage(score: number, totalQuestions: number) {
	if (score === totalQuestions) {
		return "Excelente! Você identificou as atitudes mais seguras nas cinco situações.";
	}

	if (score >= 3) {
		return "Bom trabalho! Você reconheceu vários sinais de golpe. Continue atento às situações em que ainda teve dúvida.";
	}

	return "Tudo bem errar durante o treino. Lembre-se de parar, pensar e confirmar antes de agir.";
}

function StaticQuizGuide() {
	return (
		<section className="mt-7" data-no-js-only>
			<header className="max-w-[70ch]">
				<h2 className="text-2xl font-bold text-primary">
					Guia das cinco situações
				</h2>
				<p className="mt-3 text-lg leading-relaxed">
					O modo interativo do quiz precisa de JavaScript. Enquanto isso, leia
					as situações abaixo e conheça a atitude mais segura em cada uma.
				</p>
			</header>

			<ol className="mt-7 divide-y divide-border rounded-xl bg-card ring-1 ring-foreground/10">
				{QUIZ_QUESTIONS.map((question, index) => {
					const safeOption = question.options.find(
						(option) => option.id === question.correctOptionId,
					);

					return (
						<li className="p-5 sm:p-7" key={question.id}>
							<article>
								<h3 className="text-xl font-bold leading-snug">
									{index + 1}. {question.title}
								</h3>
								<p className="mt-4 rounded-xl bg-secondary p-4 text-lg leading-relaxed">
									{question.scenario}
								</p>
								<p className="mt-5 leading-relaxed">
									<strong className="text-success">Atitude mais segura:</strong>{" "}
									{safeOption?.label}
								</p>
								<p className="mt-3 leading-relaxed">{question.successText}</p>
							</article>
						</li>
					);
				})}
			</ol>
		</section>
	);
}

export default function QuizPage() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptionId, setSelectedOptionId] = useState("");
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState<QuizStatus>("answering");
	const stepHeadingRef = useRef<HTMLHeadingElement>(null);

	const totalQuestions = QUIZ_QUESTIONS.length;
	const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
	const isReviewing = status === "reviewing";
	const selectedAnswerIsCorrect =
		selectedOptionId === currentQuestion?.correctOptionId;
	const progressValue = ((currentQuestionIndex + 1) / totalQuestions) * 100;

	const focusStepHeading = () => {
		requestAnimationFrame(() => stepHeadingRef.current?.focus());
	};

	const handleConfirmAnswer = () => {
		if (status !== "answering" || !selectedOptionId || !currentQuestion) {
			return;
		}

		if (selectedAnswerIsCorrect) {
			setScore((currentScore) => currentScore + 1);
		}

		setStatus("reviewing");
	};

	const handleContinue = () => {
		if (status !== "reviewing") {
			return;
		}

		if (isLastQuestion) {
			setStatus("completed");
			focusStepHeading();
			return;
		}

		setCurrentQuestionIndex((index) => index + 1);
		setSelectedOptionId("");
		setStatus("answering");
		focusStepHeading();
	};

	const resultMessage = getResultMessage(score, totalQuestions);

	return (
		<section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
			<Link
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"w-fit gap-2 transition-[gap] duration-200 hover:gap-4",
				)}
				to="/"
			>
				<ChevronLeft aria-hidden="true" /> Voltar
			</Link>
			<h1 className="sr-only">Quiz de segurança</h1>

			<div data-js-only>
				{status !== "completed" && (
					<Progress
						aria-label={`Progresso: pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`}
						className="mt-7"
						value={progressValue}
					>
						<ProgressLabel>
							{`Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`}
						</ProgressLabel>
						<ProgressValue>
							{(_formattedValue, value) => `${Math.round(value ?? 0)}%`}
						</ProgressValue>
					</Progress>
				)}

				{status === "completed" ? (
					<div className="mt-7 animate-in duration-200 fade-in motion-reduce:animate-none">
						<section className="rounded-xl border border-success/35 bg-card px-5 py-8 text-center sm:px-9 sm:py-10">
							<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-success text-success-foreground">
								<Check aria-hidden="true" className="size-11 stroke-[2.5]" />
							</div>
							<h2
								className="mt-5 text-2xl font-bold text-foreground outline-none"
								ref={stepHeadingRef}
								tabIndex={-1}
							>
								Você concluiu o quiz
							</h2>
							<p className="mt-2 text-xl font-bold text-primary">
								Você acertou {score} de {totalQuestions} perguntas.
							</p>
							<p className="mx-auto mt-3 max-w-[65ch] text-lg leading-relaxed">
								{resultMessage}
							</p>
						</section>

						<section aria-labelledby="reminder-title" className="mt-9">
							<h2
								className="mb-4 text-2xl font-bold text-primary"
								id="reminder-title"
							>
								Lembre-se:
							</h2>
							<ol className="space-y-3">
								{[
									{
										title: "Pare",
										description:
											"Não clique em links nem faça pagamentos por impulso.",
										icon: Hand,
										color: "text-warning",
										background: "bg-warning/10",
									},
									{
										title: "Pense",
										description:
											"Observe pedidos urgentes, links e informações que parecem estranhas.",
										icon: Search,
										color: "text-primary",
										background: "bg-secondary",
									},
									{
										title: "Confirme",
										description:
											"Fale com a pessoa ou instituição por um canal que você já conhece.",
										icon: PhoneCall,
										color: "text-success",
										background: "bg-success/10",
									},
								].map((step, index) => {
									const Icon = step.icon;
									return (
										<li
											className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 sm:gap-5 sm:p-5"
											key={step.title}
										>
											<div
												className={cn(
													"flex size-14 shrink-0 items-center justify-center rounded-xl",
													step.background,
													step.color,
												)}
											>
												<Icon aria-hidden="true" className="size-7" />
											</div>
											<div className="min-w-0">
												<div className="flex items-center gap-3">
													<span
														className={cn(
															"flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-foreground",
															step.background,
														)}
													>
														{index + 1}
													</span>
													<h3 className="text-xl font-bold">{step.title}</h3>
												</div>
												<p className="mt-1 leading-relaxed">
													{step.description}
												</p>
											</div>
										</li>
									);
								})}
							</ol>
						</section>

						<div className="mt-7">
							<p className="text-lg leading-relaxed">
								Sua opinião nos ajuda a melhorar. O formulário de avaliação abre
								em uma nova aba.
							</p>
							<div className="mt-4 flex flex-col gap-3 sm:flex-row">
								<Link
									className={cn(
										buttonVariants({ size: "lg", variant: "outline" }),
										"h-auto min-h-12 w-full whitespace-normal py-3 sm:w-auto",
									)}
									to="/"
								>
									<House aria-hidden="true" />
									Voltar para a home
								</Link>
								<a
									className={cn(
										buttonVariants({ size: "lg" }),
										"h-auto min-h-12 w-full whitespace-normal py-3 sm:w-auto",
									)}
									href="https://forms.gle/uU2rwfKs2ufrLsQLA"
									rel="noopener noreferrer"
									target="_blank"
								>
									Avaliar este site
									<ExternalLink aria-hidden="true" />
								</a>
							</div>
						</div>
					</div>
				) : (
					<article
						className="mt-8 animate-in duration-200 fade-in slide-in-from-right-2 motion-reduce:animate-none"
						key={currentQuestion.id}
					>
						<h2
							className="text-2xl font-bold leading-snug text-foreground outline-none"
							id={`question-title-${currentQuestion.id}`}
							ref={stepHeadingRef}
							tabIndex={-1}
						>
							{currentQuestion.title}
						</h2>

						<div
							className="mt-5 rounded-xl border border-primary/25 bg-secondary p-4 sm:p-5"
							id={`scenario-${currentQuestion.id}`}
						>
							<p className="text-lg leading-relaxed">
								{currentQuestion.scenario}
							</p>
						</div>

						<fieldset className="mt-7 min-w-0 border-0 p-0">
							{/* <legend className="mb-3 max-w-full text-lg font-bold">
								Qual atitude você escolheria?
							</legend> */}
							<RadioGroup
								aria-describedby={`scenario-${currentQuestion.id} answer-help`}
								aria-labelledby={`question-title-${currentQuestion.id}`}
								className="gap-3"
								name={`question-${currentQuestion.id}`}
								onValueChange={(value) => {
									if (status === "answering") {
										setSelectedOptionId(String(value));
									}
								}}
								readOnly={isReviewing}
								value={selectedOptionId}
							>
								{currentQuestion.options.map((option, _optionIndex) => {
									const inputId = `${currentQuestion.id}-option-${option.id}`;
									const isSelected = selectedOptionId === option.id;
									const isCorrect =
										option.id === currentQuestion.correctOptionId;
									const isIncorrectSelection =
										isReviewing && isSelected && !isCorrect;

									return (
										<Item
											className={cn(
												"min-h-14 min-w-0 cursor-pointer flex-nowrap items-start gap-4 p-4 text-base transition-[background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none",
												!isReviewing &&
													"hover:border-primary/55 hover:bg-secondary/70",
												!isReviewing &&
													isSelected &&
													"border-primary bg-secondary ring-2 ring-primary/20",
												isReviewing &&
													isCorrect &&
													"cursor-default border-success bg-[color-mix(in_oklch,var(--success),white_92%)]",
												isIncorrectSelection &&
													"cursor-default border-warning bg-warning/10",
												isReviewing &&
													!isCorrect &&
													!isIncorrectSelection &&
													"cursor-default",
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
												<RadioGroupItem
													className={cn(
														isReviewing &&
															isCorrect &&
															"border-success data-checked:border-success data-checked:bg-success",
														isIncorrectSelection &&
															"border-warning data-checked:border-warning data-checked:bg-warning",
													)}
													inputRef={(input) => {
														if (input) {
															input.id = inputId;
														}
													}}
													value={option.id}
												/>
											</ItemMedia>
											<ItemContent className="min-w-0 gap-0">
												<ItemTitle className="line-clamp-none w-auto items-start text-base leading-relaxed font-medium whitespace-normal">
													<span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
														{option.label}
													</span>
												</ItemTitle>
											</ItemContent>
											{isReviewing && isCorrect && (
												<ItemActions
													aria-label="Resposta mais segura"
													className="ml-auto text-success"
												>
													<CheckCircle2 aria-hidden="true" className="size-6" />
												</ItemActions>
											)}
											{isIncorrectSelection && (
												<ItemActions
													aria-label="Escolha arriscada"
													className="ml-auto text-warning"
												>
													<TriangleAlert
														aria-hidden="true"
														className="size-6"
													/>
												</ItemActions>
											)}
										</Item>
									);
								})}
							</RadioGroup>
						</fieldset>

						{isReviewing && (
							<div
								aria-live="polite"
								className={cn(
									"mt-6 animate-in rounded-xl border p-4 duration-200 fade-in motion-reduce:animate-none sm:p-5",
									selectedAnswerIsCorrect
										? "border-success/45 bg-[color-mix(in_oklch,var(--success),white_92%)]"
										: "border-warning/45 bg-warning/10",
								)}
								role="status"
							>
								<div className="flex items-start gap-3">
									{selectedAnswerIsCorrect ? (
										<CheckCircle2
											aria-hidden="true"
											className="mt-0.5 size-6 shrink-0 text-success"
										/>
									) : (
										<TriangleAlert
											aria-hidden="true"
											className="mt-0.5 size-6 shrink-0 text-warning"
										/>
									)}
									<div>
										<h3 className="text-lg font-bold">
											{selectedAnswerIsCorrect
												? "Boa escolha!"
												: "Atenção: essa escolha pode trazer riscos."}
										</h3>
										{selectedAnswerIsCorrect ? (
											<p className="mt-2 leading-relaxed">
												{currentQuestion.successText}
											</p>
										) : (
											<p className="mt-2 leading-relaxed">
												<strong>Resposta mais segura:</strong>{" "}
												{
													currentQuestion.options.find(
														(option) =>
															option.id === currentQuestion.correctOptionId,
													)?.label
												}
											</p>
										)}
									</div>
								</div>
							</div>
						)}

						<div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
							<p className="leading-relaxed" id="answer-help">
								{isReviewing
									? "Resposta confirmada. Leia a orientação antes de continuar."
									: "Escolha uma alternativa para continuar."}
							</p>

							{isReviewing ? (
								<Button
									className="h-auto min-h-12 whitespace-normal py-3 sm:shrink-0"
									onClick={handleContinue}
									size="lg"
									variant="success"
								>
									{isLastQuestion ? "Ver resultado" : "Próxima pergunta"}
									<ArrowRight aria-hidden="true" />
								</Button>
							) : (
								<Button
									aria-describedby="answer-help"
									className="h-auto min-h-12 whitespace-normal py-3 sm:shrink-0"
									disabled={!selectedOptionId}
									onClick={handleConfirmAnswer}
									size="lg"
								>
									<Check aria-hidden="true" />
									Confirmar resposta
								</Button>
							)}
						</div>
					</article>
				)}
			</div>

			<StaticQuizGuide />
		</section>
	);
}
