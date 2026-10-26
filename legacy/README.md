# Aplicação legada

Esta pasta contém a aplicação Laravel legada usada como ponto de partida para o projeto de demonstração de modernização gradual. A aplicação é um site de publicação social chamado **Conduit**, construído com Laravel e HTMX e baseado na especificação [RealWorld](https://github.com/gothinkster/realworld).

## Créditos e origem

Este projeto foi clonado de [agmadt/realworld-laravel-htmx](https://github.com/agmadt/realworld-laravel-htmx). Os créditos pela implementação original de Laravel + HTMX pertencem aos autores e contribuidores do repositório de origem. Esta cópia é utilizada como base para o contexto de portfólio deste repositório; a proposta de modernização incremental é o objetivo deste projeto demonstrativo.

O conceito e a especificação **RealWorld** são mantidos pelo projeto [gothinkster/realworld](https://github.com/gothinkster/realworld).

## Sobre a aplicação

Conduit é uma aplicação de publicação social, semelhante a um clone do Medium. Ela oferece funcionalidades como cadastro e autenticação, artigos, comentários, perfis e favoritos.

## Instalação

Execute os comandos a partir desta pasta:

1. Instale as dependências com `composer install`.
2. Copie `.env.example` para `.env` (no PowerShell, use `Copy-Item .env.example .env`; em shells Unix, use `cp .env.example .env`).
3. Execute os comandos restantes:

```sh
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

SQLite é suficiente para executar a aplicação localmente. Para entrar com a conta de demonstração, use `test@email.com` com a senha `secret`; também é possível criar uma conta pela interface.

## Papel no projeto

O legado permanece como referência funcional para as etapas seguintes. A intenção é que páginas e funcionalidades possam ser migradas gradualmente, mantendo outras no Laravel durante a transição. Veja o [README principal](../README.md), o contexto da [etapa intermediária](../middle%20term/README.md) e a visão da [arquitetura nova](../new/README.md).
