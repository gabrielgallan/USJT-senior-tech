# Senior Tech - Golpes via WhatsApp e mensagens

O **Senior Tech** é um projeto de extensão universitária voltado à educação de idosos sobre segurança digital.

O projeto tem como foco a conscientização e prevenção de **golpes realizados via WhatsApp e mensagens**, utilizando conteúdos informativos e atividades interativas para ajudar na identificação de situações suspeitas e na adoção de práticas mais seguras no uso da tecnologia.

## Como rodar localmente

### Requisitos

<div style="display:flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem;">
    <div style="display:flex; align-items:center; gap: 0.5rem; border-left: 2px solid white; padding-left: 1rem;">
        <img src="https://devicons.io/devicons/icons/nodejs-icon.svg" width="25"/> Node.js
    </div>
    <div style="display:flex; align-items:center; gap: 0.5rem; border-left: 2px solid white; padding-left: 1rem;">
        <img src="https://devicons.io/devicons/icons/pnpm.svg" width="25"/> pnpm    
    </div>
</div>

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/gabrielgallan/USJT-senior-tech.git
```

2. Entre no diretório

```bash
cd senior-tech-web
```

3. Instale as dependências

```bash
pnpm install
```

4. Inicie o servidor de dev

```bash
pnpm dev
```

5. A aplicação estará disponível na URL informada pelo React Router, normalmente:

```bash
http://localhost:5173
```

## Build estático

O projeto pré-renderiza as rotas `/`, `/video` e `/quiz`. Para validar os
tipos e gerar os arquivos estáticos:

```bash
pnpm typecheck
pnpm build
```

Os arquivos publicados são gerados em `senior-tech-web/build/client`. Quando
o JavaScript não está disponível, as páginas continuam exibindo seu conteúdo;
o quiz apresenta um guia estático com as cinco situações de segurança.

## Publicação no Render

Mantenha o projeto como **Static Site** e use estas configurações:

- Root Directory: `senior-tech-web`
- Build Command: `pnpm install --frozen-lockfile && pnpm build`
- Publish Directory: `build/client`
- Rewrite: `/*` para `/__spa-fallback.html`

As rotas pré-renderizadas existentes são servidas diretamente. O rewrite é
usado apenas como fallback para caminhos que não correspondem a um arquivo
gerado. Esses valores também estão versionados no `render.yaml` da raiz do
repositório e podem ser usados por um Blueprint do Render.

## Contribuidores

- [Gabriel Gallan](https://github.com/gabrielgallan)
- Amanda Rodrigues da Silva
- Antony de Souza Del Rey
- Lucas Oliveira Uyemura
- Maria Eduarda Almeida dos Santos
- Vinicius Dias Chavans
