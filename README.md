# Legacy to New Demo

Este repositório é um projeto de portfólio para demonstrar a evolução gradual de uma aplicação legada, sem exigir a substituição de todo o sistema de uma só vez.

O cenário parte do Banco Vermelho, uma aplicação interna fictícia em Angular 7, e explora uma migração incremental para o Banco Roxo. A etapa intermediária combina Angular 7 e Angular moderno; a etapa nova usa Angular 22 e Module Federation por página. Os dados são fictícios e não há backend.

## Objetivos

- Apresentar um sistema legado funcional como ponto de partida.
- Documentar uma etapa intermediária em que funcionalidades antigas e novas convivem.
- Demonstrar uma direção de modernização com Angular moderno e microfrontends federados.
- Manter algumas páginas no legado intencionalmente, ilustrando uma migração em andamento em vez de uma troca total.
- Explorar conceitos de roteamento entre aplicações, micro-frontends e evolução incremental, inspirados no padrão Strangler Fig.

Este é um projeto demonstrativo. As pastas descrevem etapas e contextos da evolução; decisões e integrações podem ser detalhadas à medida que o projeto avançar.

Para uma apresentação visual da jornada, abra a [página estática](./index.html) no navegador. Ela usa capturas reais das aplicações demonstrativas e não precisa de servidor ou instalação.

## Estrutura

| Pasta | Contexto |
| --- | --- |
| [`legacy/`](./legacy/README.md) | Aplicação Angular 7 legada, com dados fictícios, usada como ponto de partida. |
| [`middle-term/`](./middle-term/README.md) | Banco Roxo: Angular moderno e Angular 7 coexistem por roteamento entre microfrontends. |
| [`new/`](./new/README.md) | Banco Roxo com shell Angular 22 e quatro microfrontends via Module Federation para Vite. |

## Visão da evolução

1. **Legacy:** compreender e manter a aplicação Angular 7 existente.
2. **Middle-term:** introduzir partes novas sem remover imediatamente as equivalentes legadas.
3. **New:** compor as quatro páginas modernizadas com Angular 22 e Module Federation.

O objetivo é tornar visível o processo de transição: as aplicações antiga e nova podem atender partes diferentes da experiência enquanto a migração acontece.
