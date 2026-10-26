# Etapa intermediária

Esta pasta representa a fase de coexistência da modernização. O sistema legado e as partes novas devem funcionar no mesmo projeto, permitindo uma migração gradual sem exigir que todas as páginas sejam reescritas de uma só vez.

## Objetivos desta etapa

- Preservar as funcionalidades que ainda dependem do legado.
- Introduzir novas páginas ou componentes aos poucos.
- Permitir que usuários naveguem entre experiências legadas e novas durante a transição.
- Tornar explícito o que já foi migrado e o que continua no Laravel.

Esta fase ilustra uma abordagem incremental, próxima ao padrão Strangler Fig: novas funcionalidades podem assumir responsabilidades progressivamente, enquanto o sistema antigo continua disponível para o que ainda não foi migrado.

## Direção técnica

A intenção é integrar o legado Laravel às novas partes da aplicação e encaminhar cada experiência para a implementação apropriada. O mecanismo concreto de integração e roteamento será definido conforme a arquitetura evoluir; esta documentação não pressupõe que proxy, autenticação compartilhada ou comunicação entre micro-frontends já estejam implementados.

Consulte o [README principal](../README.md) para conhecer o escopo geral e o [contexto da arquitetura nova](../new/README.md).
