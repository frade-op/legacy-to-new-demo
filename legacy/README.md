# Banco Vermelho: aplicação legada

Aplicação interna fictícia de um banco, criada para demonstrar a modernização gradual de um frontend Angular 7. Não há backend, autenticação, contas reais ou operações bancárias: todos os dados estão em memória e são demonstrativos.

## Executar

Use Node.js 10.24.1 e npm 6.14.12, versões compatíveis com o Angular CLI 7. O projeto usa dependências antigas e sem suporte; execute-o somente em ambiente local, sem dados reais.

```sh
npm ci
npm start
```

Execute os comandos dentro de `legacy/` e acesse `http://127.0.0.1:4200`. Para compilar, use `npm run build`. Para executar os testes, instale o Google Chrome e use `npm test`; configure `CHROME_BIN` se o Karma não encontrar o navegador.

## Estrutura

- As rotas `/inicio`, `/contas`, `/movimentacoes` e `/investimentos` usam o mesmo componente de página `LayoutComponent`.
- Cada rota possui um resolver baseado na interface `Resolve` do Angular 7. Ele fornece os dados e a lista de blocos para o layout antes da navegação. Esse padrão de classes está obsoleto nas versões atuais do Angular, mas foi mantido aqui para representar o legado.
- Os resolvers simulam uma chamada de três segundos. Durante a espera, a navegação fica bloqueada: a página anterior permanece visível ou, no primeiro acesso, o conteúdo ainda não aparece. Não há chamada de rede.
- O layout observa os dados da rota e carrega componentes de card, tabela, filtro e gráfico dinamicamente por `ComponentFactoryResolver`, usando `entryComponents`, como em aplicações Angular 7.
- `PageContentService` contém os dados fictícios. Os filtros atuam somente nas tabelas em memória; não alteram nem persistem dados.

## Modernização desejada

A empresa deseja recriar o sistema em módulos, não substituí-lo de uma vez. A intenção é migrar uma capacidade por vez, como contas ou investimentos, enquanto as demais permanecem no legado. A [etapa intermediária](../middle-term/README.md) demonstra a coexistência por roteamento entre aplicações independentes, e a [arquitetura nova](../new/README.md) apresenta a direção futura.
