export type QuizOption = {
	id: string;
	label: string;
};

export type QuizQuestion = {
	id: string;
	title: string;
	scenario: string;
	options: readonly QuizOption[];
	correctOptionId: string;
	explanation: string;
};

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
	{
		id: "pedido-pix",
		title: "O que você faria ao receber um pedido urgente de dinheiro?",
		scenario:
			"Você recebe uma mensagem no WhatsApp de um número desconhecido, mas a foto de perfil é do seu filho. A pessoa diz: “Oi mãe/pai, troquei de número porque o meu quebrou. Preciso pagar uma conta urgente hoje e meu aplicativo do banco travou. Pode fazer um Pix para mim de R$ 800 que te devolvo amanhã?”",
		options: [
			{
				id: "a",
				label:
					"Faria o Pix imediatamente para ajudar, pois parece ser uma urgência.",
			},
			{
				id: "b",
				label:
					"Ligaria ou faria uma chamada de vídeo para o número antigo do meu filho para confirmar se é ele mesmo.",
			},
			{
				id: "c",
				label:
					"Pediria que a pessoa enviasse um áudio confirmando a história antes de fazer o Pix.",
			},
		],
		correctOptionId: "b",
		explanation:
			"A foto do perfil, as mensagens e até um áudio podem ser usados por golpistas. Antes de enviar dinheiro, confirme o pedido por um número ou canal que você já conhece.",
	},
	{
		id: "bloqueio-conta",
		title: "O que você faria ao receber um aviso de bloqueio de conta?",
		scenario:
			"Chega uma mensagem de texto (SMS) ou WhatsApp dizendo: “BANCO X: Sua conta possui uma pendência cadastral e será bloqueada em 2 horas. Evite o bloqueio acessando o link: www.banco-atualizacaosegura.com”.",
		options: [
			{
				id: "a",
				label:
					"Clicaria no link rapidamente para resolver o problema e não ter a conta bloqueada.",
			},
			{
				id: "b",
				label:
					"Responderia à mensagem perguntando qual é a pendência específica.",
			},
			{
				id: "c",
				label:
					"Não clicaria no link. Abriria o aplicativo oficial do banco ou ligaria para o número que fica no verso do cartão.",
			},
		],
		correctOptionId: "c",
		explanation:
			"Bancos não pedem atualizações urgentes por links recebidos em mensagens. Abra você mesmo o aplicativo oficial do banco ou ligue para o telefone impresso no cartão.",
	},
];
