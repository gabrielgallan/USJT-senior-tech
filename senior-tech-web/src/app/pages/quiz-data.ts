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
	successText: string;
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
		successText:
			"Golpistas usam fotos públicas das redes sociais para criar perfis falsos no WhatsApp. Nunca transfira dinheiro para um “novo número” de um parente sem antes falar com a pessoa pelo número antigo, fazer uma chamada de vídeo ou confirmar pessoalmente. Se a pessoa der desculpas para não atender, desconfie: pode ser golpe!",
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
		successText:
			"Bancos nunca enviam links por SMS ou WhatsApp exigindo atualização cadastral ou ameaçando bloqueio imediato da conta. Esses links podem levar a páginas falsas que roubam senhas e dados bancários. Em caso de dúvida, abra o aplicativo oficial do banco ou consulte seu gerente por um canal verificado.",
	},
	{
		id: "codigo-sms",
		title: "O que você faria ao receber um pedido de código SMS?",
		scenario:
			"Você está aguardando a confirmação de um sorteio ou o agendamento de uma consulta médica. Uma pessoa liga ou envia uma mensagem dizendo: “Para confirmar seu atendimento ou sorteio, acabei de enviar um código de 6 dígitos por SMS. Pode me dizer esse código agora?”",
		options: [
			{
				id: "a",
				label:
					"Não passaria o código de jeito nenhum e desligaria a ligação ou ignoraria a mensagem.",
			},
			{
				id: "b",
				label:
					"Olharia o SMS e ditaria os 6 dígitos para a pessoa continuar o cadastro.",
			},
			{
				id: "c",
				label:
					"Passaria o código, desde que a pessoa dissesse meu nome completo e CPF.",
			},
		],
		correctOptionId: "a",
		successText:
			"Esse código de 6 dígitos pode ser a verificação usada para instalar sua conta do WhatsApp em outro celular. Se você informar o código, o golpista pode tomar sua conta e pedir dinheiro aos seus contatos em seu nome. Nenhuma empresa séria solicita códigos recebidos por SMS!",
	},
	{
		id: "falsa-central",
		title:
			"O que você faria com uma ligação sobre compra suspeita ou recadastramento do INSS?",
		scenario:
			"Você recebe uma ligação da “Central de Segurança do Banco” ou do “INSS”: “Identificamos uma compra suspeita de R$ 2.500 no seu cartão. Para cancelar essa transação e proteger sua aposentadoria, preciso que você confirme sua senha e digite-a no teclado do telefone.”",
		options: [
			{
				id: "a",
				label:
					"Digitaria a senha imediatamente para evitar que o valor de R$ 2.500 fosse cobrado.",
			},
			{
				id: "b",
				label:
					"Desligaria a ligação, aguardaria alguns minutos ou usaria outro telefone e ligaria diretamente para o número oficial do banco ou do INSS.",
			},
			{
				id: "c",
				label:
					"Pediria para a pessoa falar com meu filho e forneceria o número dele.",
			},
		],
		correctOptionId: "b",
		successText:
			"Esse é o golpe da falsa central de atendimento. Nem o INSS nem os bancos ligam solicitando senha, código de acesso ou transferências de “segurança”. Ao receber uma chamada desse tipo, desligue e procure o órgão pelo aplicativo, site ou telefone oficial.",
	},
	{
		id: "falsa-indenizacao",
		title:
			"O que você faria ao receber uma mensagem sobre liberação de indenização?",
		scenario:
			"Uma pessoa se apresenta como “secretário do escritório de advocacia” e manda a mensagem: “Boa notícia! Seu processo judicial ou revisão de benefício foi aprovado e você tem R$ 45.000 para receber. Porém, para liberar o alvará do juiz, é necessário pagar hoje uma taxa de custas cartorárias no valor de R$ 1.200.”",
		options: [
			{
				id: "a",
				label:
					"Pagaria a taxa de R$ 1.200 imediatamente para garantir o recebimento dos R$ 45.000.",
			},
			{
				id: "b",
				label: "Pediria um desconto na taxa antes de fazer a transferência.",
			},
			{
				id: "c",
				label:
					"Entraria em contato diretamente com meu advogado de confiança, usando o número antigo de contato, antes de realizar qualquer pagamento.",
			},
		],
		correctOptionId: "c",
		successText:
			"Golpistas podem monitorar diários oficiais e processos públicos para descobrir nomes de beneficiários e advogados. Juízes e advogados não exigem pagamento prévio via Pix para uma conta de terceiros como condição para liberar indenizações. Confirme sempre com seu advogado, pessoalmente ou por um canal já verificado.",
	},
];
