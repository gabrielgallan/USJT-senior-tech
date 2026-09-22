import { BrowserTitle } from "@/components/browser-title";
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
import {
	ArrowRight,
	Check,
	CheckCircle2,
	ChevronLeft,
	House,
	RotateCcw,
	ShieldCheck,
	TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QUIZ_QUESTIONS } from "./quiz-data";

type QuizStatus = "answering" | "reviewing" | "completed";

const RESULT_MESSAGES = {
	0: "Tudo bem errar durante o treino. Refaça o quiz e observe as orientações depois de cada resposta.",
	1: "Bom começo! Você já reconheceu alguns sinais. Refaça o quiz para reforçar o que aprendeu.",
	2: "Excelente! Você identificou as atitudes mais seguras nas duas situações.",
} as const;

export function QuizPage() {
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
	const progressValue =
		status === "completed"
			? 100
			: ((currentQuestionIndex + 1) / totalQuestions) * 100;

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

	const handleRestart = () => {
		setCurrentQuestionIndex(0);
		setSelectedOptionId("");
		setScore(0);
		setStatus("answering");
		focusStepHeading();
	};

	const navigate = useNavigate();

	const resultMessage =
		RESULT_MESSAGES[score as keyof typeof RESULT_MESSAGES] ??
		RESULT_MESSAGES[0];

	return (
		<>
			<BrowserTitle title="Quiz de segurança" />
			<section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
				<Button
					variant="ghost"
					className="transition-all duration-100 w-fit flex items-center gap-2 hover:gap-4 cursor-pointer"
					onClick={() => navigate("/")}
				>
					<ChevronLeft /> Voltar
				</Button>

				{/* <header className="mt-4 max-w-[70ch]">
					<h1 className="text-3xl font-bold tracking-tight text-primary">
						Quiz de segurança
					</h1>
					<p className="mt-3 text-lg leading-relaxed">
						Leia cada situação, escolha a atitude que considera mais segura e
						confirme sua resposta.
					</p>
				</header> */}

				<Progress
					aria-label={
						status === "completed"
							? "Quiz concluído"
							: `Progresso: pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`
					}
					className="mt-7"
					value={progressValue}
				>
					<ProgressLabel>
						{status === "completed"
							? "Quiz concluído"
							: `Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`}
					</ProgressLabel>
					<ProgressValue>
						{(_formattedValue, value) => `${Math.round(value ?? 0)}%`}
					</ProgressValue>
				</Progress>

				{status === "completed" ? (
					<section className="mt-8 animate-in rounded-xl bg-card p-5 ring-1 ring-foreground/10 duration-200 fade-in motion-reduce:animate-none sm:p-7">
						<div className="flex size-14 items-center justify-center rounded-xl bg-success text-success-foreground">
							<ShieldCheck aria-hidden="true" className="size-8" />
						</div>
						<h2
							className="mt-5 text-2xl font-bold text-foreground outline-none"
							ref={stepHeadingRef}
							tabIndex={-1}
						>
							Você concluiu o quiz
						</h2>
						<p className="mt-3 text-xl font-bold text-primary">
							Você acertou {score} de {totalQuestions} perguntas.
						</p>
						<p className="mt-3 max-w-[65ch] text-lg leading-relaxed">
							{resultMessage}
						</p>

						<div className="mt-7 flex flex-col gap-3 sm:flex-row">
							<Button
								className="h-auto min-h-12 whitespace-normal py-3"
								onClick={handleRestart}
								size="lg"
							>
								<RotateCcw aria-hidden="true" />
								Refazer o quiz
							</Button>
							<Link
								className={cn(
									buttonVariants({ size: "lg", variant: "outline" }),
									"h-auto min-h-12 whitespace-normal py-3",
								)}
								to="/"
							>
								<House aria-hidden="true" />
								Voltar ao início
							</Link>
						</div>
					</section>
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
													<span className="min-w-0 flex-1 wrap:anywhere">
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
										<p className="mt-2 leading-relaxed">
											{currentQuestion.explanation}
										</p>
										{!selectedAnswerIsCorrect && (
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
			</section>
		</>
	);
}
