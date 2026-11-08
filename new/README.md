# Banco Roxo: arquitetura nova

As quatro páginas do Banco Roxo foram recriadas em Angular 22 como microfrontends carregados pelo shell com **Module Federation para Vite**. Os dados são fictícios; não há backend, autenticação nem persistência.

| Rota | Remoto federado | Conteúdo |
| --- | --- | --- |
| `/inicio` | `inicio` | Visão geral |
| `/contas` | `contas` | Carteira e filtro |
| `/movimentacoes` | `movimentacoes` | Histórico e filtro |
| `/investimentos` | `investimentos` | Carteira e gráfico |

O workspace está na raiz de `new/`: o shell está em `src/` e cada página em `projects/<nome>/`. A configuração compartilhada em `vite.config.ts` compila cinco builds independentes usando `@analogjs/vite-plugin-angular` e `@module-federation/vite`, sem Webpack. Cada remoto expõe `./Page`; o shell carrega seu `remoteEntry.js` sob demanda, sem recarregar a aplicação.

Angular, RxJS e tslib são configurados como singletons com validação estrita de versão. O shell também verifica se o remoto usa a mesma instância de `@angular/core`. Falha de carregamento ou incompatibilidade exibe uma mensagem e uma opção de recarregar. Os projetos devem ser publicados com versões compatíveis das dependências compartilhadas.

Componentes visuais e dados fictícios em `src/app/` são código-fonte compartilhado no monorepositório e incorporado aos builds que os utilizam; não são um serviço, API ou pacote remoto. Tailwind CSS é processado pelo PostCSS. Os componentes são standalone e usam signals e control flow do Angular.

## Executar

Requisitos: Node.js 24.15.0 ou outra versão compatível com Angular 22, npm 11 e Google Chrome para o teste de navegador.

```sh
cd new
npm ci
npm run build
npm start
```

Acesse `http://127.0.0.1:4200`. O servidor incluso serve os builds como prévia local, não é infraestrutura de produção.

Para desenvolver o shell com Vite, após compilar os projetos execute `npm run dev`. O Vite fica na porta 4200 e encaminha `/remotes/` à prévia na porta 4205. Os remotos são servidos a partir de seus builds: após alterá-los, execute novamente o respectivo comando `npm run build:<nome>` e recarregue a página. O shell tem o servidor de desenvolvimento Vite; os remotos não têm HMR nessa configuração.

Cada projeto também pode ser compilado separadamente: `npm run build:shell`, `npm run build:inicio`, `npm run build:contas`, `npm run build:movimentacoes` e `npm run build:investimentos`. Os remotos são carregados em `/remotes/<nome>/remoteEntry.js`. Para publicação independente, configure um proxy ou servidor estático que encaminhe esses caminhos e os demais arquivos de cada remoto aos respectivos builds, mantendo-os acessíveis ao navegador.

## Testes

Após compilar os cinco projetos:

```sh
npm run typecheck
npm test
npm run test:e2e
```

O typecheck usa o compilador Angular com templates estritos para o shell e os quatro remotos. O E2E inicia uma prévia na porta 4219 e verifica navegação, carregamento sob demanda, dados, filtros, compartilhamento do runtime, falha e recuperação de remoto, além de rota inexistente e tela estreita. Usa o Chrome instalado localmente.

Nos builds verificados em Windows, o plugin de federação emite `moduleParseIdleTimeout` para os remotos, avisando que a análise de dependências pode estar incompleta. Os builds e testes de navegador passaram, mas o aviso deve ser acompanhado ao atualizar o plugin ou as dependências. O Vite também alerta sobre chunks acima de 500 kB; os bundles ainda não foram otimizados.

Consulte a [etapa intermediária](../middle-term/README.md) para a coexistência entre Angular 7 e Angular 22 e o [README principal](../README.md) para a visão completa.
