# Banco Roxo: modernização gradual

Esta etapa reúne duas aplicações independentes, com a mesma identidade visual e dados fictícios:

| Caminho | Aplicação | Páginas |
| --- | --- | --- |
| `/inicio`, `/contas` | Angular 22 | Visão geral e contas reescritas |
| `/legado/movimentacoes`, `/legado/investimentos` | Angular 7 | Páginas ainda não migradas |

O navegador troca de aplicação ao cruzar essa fronteira. O roteamento por URL integra os microfrontends sem compartilhar runtime nem usar iframe. A cópia em `legacy/` preserva o layout dinâmico, os resolvers e a demora simulada de três segundos. A cópia original em [`../legacy/`](../legacy/README.md) permanece Banco Vermelho.

Todos os dados são estáticos. Não há backend, autenticação ou operações bancárias. Não use dados reais. O Angular 7 e suas dependências estão fora de suporte.

## Desenvolvimento

São necessárias duas versões do Node e dois terminais:

1. Com **Node 10.24.1 e npm 6**, no diretório `middle-term/legacy`:

   ```sh
   npm ci
   npm start
   ```

2. Com **Node 24.15.0 ou mais recente compatível com Angular 22**, no diretório `middle-term/modern`:

   ```sh
   npm ci
   npm start
   ```

3. Acesse `http://127.0.0.1:4200`. O servidor moderno encaminha `/legado/*` para o servidor Angular 7 na porta 4301. Ambos precisam estar em execução. Ao usar um gerenciador de versões global como nvm-windows, inicie o legado antes de trocar a versão do Node e iniciar o moderno.

O Angular CLI usa Vite no servidor de desenvolvimento e esbuild no build de produção. Tailwind CSS é processado pelo PostCSS. Os estilos preservam as dimensões e o conteúdo do legado, alterando a identidade para roxo.

## Build e prévia

Execute `npm run build` em cada aplicação com sua respectiva versão do Node. Depois, com Node 24, execute `node server.mjs` em `middle-term/` e acesse `http://127.0.0.1:4200`. A prévia serve os dois builds sob a mesma origem; pare os servidores de desenvolvimento antes de iniciá-la. Para implantação real, o servidor estático ou proxy deve reproduzir o mesmo roteamento e disponibilizar os arquivos compilados de ambas as aplicações.

## Testes

- `npm test` em `modern/`, com Node 24.
- `npm test` em `legacy/`, com Node 10 e Chrome instalado; configure `CHROME_BIN` caso necessário.
- Depois de compilar as duas aplicações, execute `npm run test:e2e` em `modern/`, com Node 24 e Google Chrome instalado. O teste inicia a prévia na porta 4209 e verifica navegação, filtros e recarregamento entre as versões.

O projeto demonstra coexistência, não uma integração de sessão ou autenticação. Para migrar outra página, implemente-a no frontend moderno e altere os links e o roteamento; para reverter, direcione a URL novamente à aplicação legada. Não existe persistência nem dados a migrar.
