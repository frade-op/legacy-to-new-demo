# Legacy to New Demo

Este repositório é um projeto de portfólio para demonstrar a evolução gradual de uma aplicação legada, sem exigir a substituição de todo o sistema de uma só vez.

O cenário parte de uma aplicação existente em Laravel e explora uma migração incremental para um backend em Node.js e interfaces modernas em React e Angular. A ideia é mostrar como partes novas e antigas podem coexistir durante a transição, incluindo uma arquitetura de micro-frontends que represente páginas mantidas por equipes diferentes.

## Objetivos

- Apresentar um sistema legado funcional como ponto de partida.
- Documentar uma etapa intermediária em que funcionalidades antigas e novas convivem.
- Demonstrar uma direção de modernização com backend Node.js e frontends em React e Angular.
- Manter algumas páginas no legado intencionalmente, ilustrando uma migração em andamento em vez de uma troca total.
- Explorar conceitos de roteamento entre aplicações, micro-frontends e evolução incremental, inspirados no padrão Strangler Fig.

Este é um projeto demonstrativo. As pastas descrevem etapas e contextos da evolução; decisões e integrações podem ser detalhadas à medida que o projeto avançar.

## Estrutura

| Pasta | Contexto |
| --- | --- |
| [`legacy/`](./legacy/README.md) | Aplicação Laravel legada usada como ponto de partida. |
| [`middle term/`](./middle%20term/README.md) | Etapa de coexistência entre o legado e funcionalidades novas no mesmo projeto. |
| [`new/`](./new/README.md) | Direção da arquitetura nova: backend Node.js e frontends Angular e React organizados como micro-frontends. |

## Visão da evolução

1. **Legacy:** compreender e manter a aplicação Laravel existente.
2. **Middle term:** introduzir partes novas sem remover imediatamente as equivalentes legadas.
3. **New:** desenvolver a arquitetura-alvo com Node.js, Angular, React e micro-frontends.

O objetivo é tornar visível o processo de transição: as aplicações antiga e nova podem atender partes diferentes da experiência enquanto a migração acontece.
