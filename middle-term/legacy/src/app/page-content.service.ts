import { Injectable } from '@angular/core';
import { PageContent } from './page.model';

@Injectable({ providedIn: 'root' })
export class PageContentService {
  dashboard(): PageContent {
    return {
      eyebrow: 'Visão geral', title: 'Bem-vinda de volta, Marina',
      description: 'Acompanhe os principais números da sua carteira.',
      blocks: [
        { type: 'card', title: 'Saldo disponível', value: 'R$ 128.450,90', detail: 'Atualizado hoje' },
        { type: 'card', title: 'Clientes ativos', value: '1.284', detail: '+ 8% neste mês' },
        { type: 'card', title: 'Operações no mês', value: '342', detail: '12 aguardando análise' },
        { type: 'chart', title: 'Movimentação mensal', subtitle: 'Volume financeiro dos últimos seis meses', bars: [
          { label: 'JAN', value: 42, display: 'R$ 42 mil' }, { label: 'FEV', value: 58, display: 'R$ 58 mil' },
          { label: 'MAR', value: 48, display: 'R$ 48 mil' }, { label: 'ABR', value: 72, display: 'R$ 72 mil' },
          { label: 'MAI', value: 65, display: 'R$ 65 mil' }, { label: 'JUN', value: 90, display: 'R$ 90 mil' }
        ] },
        { type: 'table', title: 'Últimas movimentações', columns: ['Cliente', 'Operação', 'Data', 'Valor'], rows: [
          ['Ana Martins', 'Transferência recebida', '18/06/2024', 'R$ 4.250,00'],
          ['Ricardo Lima', 'Pagamento', '17/06/2024', 'R$ 890,00'],
          ['Carla Souza', 'Depósito', '17/06/2024', 'R$ 2.150,00']
        ] }
      ]
    };
  }

  contas(): PageContent {
    return {
      eyebrow: 'Relacionamento', title: 'Contas',
      description: 'Consulte as contas e os clientes da sua carteira.',
      blocks: [
        { type: 'card', title: 'Total de contas', value: '1.284', detail: 'Contas ativas' },
        { type: 'card', title: 'Novas contas', value: '48', detail: 'Neste mês' },
        { type: 'card', title: 'Em análise', value: '12', detail: 'Aguardando documentação' },
        { type: 'filter', label: 'Buscar contas', placeholder: 'Busque por cliente, conta ou situação' },
        { type: 'table', title: 'Carteira de clientes', columns: ['Cliente', 'Conta', 'Agência', 'Situação'], rows: [
          ['Ana Martins', '00458-2', '0001', 'Ativa'],
          ['Ricardo Lima', '01762-9', '0001', 'Ativa'],
          ['Carla Souza', '02385-4', '0002', 'Em análise'],
          ['Bruno Almeida', '03121-0', '0002', 'Ativa']
        ] }
      ]
    };
  }

  movimentacoes(): PageContent {
    return {
      eyebrow: 'Operações', title: 'Movimentações',
      description: 'Acompanhe as movimentações recentes das contas.',
      blocks: [
        { type: 'card', title: 'Entradas', value: 'R$ 86.420,00', detail: 'Neste mês' },
        { type: 'card', title: 'Saídas', value: 'R$ 42.180,00', detail: 'Neste mês' },
        { type: 'card', title: 'Operações', value: '342', detail: 'Neste mês' },
        { type: 'filter', label: 'Buscar movimentações', placeholder: 'Busque por cliente, tipo ou data' },
        { type: 'table', title: 'Histórico de operações', columns: ['Data', 'Cliente', 'Tipo', 'Valor'], rows: [
          ['18/06/2024', 'Ana Martins', 'Transferência recebida', 'R$ 4.250,00'],
          ['17/06/2024', 'Ricardo Lima', 'Pagamento', 'R$ 890,00'],
          ['17/06/2024', 'Carla Souza', 'Depósito', 'R$ 2.150,00'],
          ['16/06/2024', 'Bruno Almeida', 'Transferência enviada', 'R$ 1.200,00']
        ] }
      ]
    };
  }

  investimentos(): PageContent {
    return {
      eyebrow: 'Patrimônio', title: 'Investimentos',
      description: 'Uma visão dos investimentos da sua carteira.',
      blocks: [
        { type: 'card', title: 'Total investido', value: 'R$ 2.450.000,00', detail: 'Patrimônio sob gestão' },
        { type: 'card', title: 'Rentabilidade', value: '0,84%', detail: 'No último mês' },
        { type: 'card', title: 'Investidores', value: '324', detail: 'Clientes com investimentos' },
        { type: 'chart', title: 'Distribuição da carteira', subtitle: 'Participação por categoria', bars: [
          { label: 'CDB', value: 80, display: '40%' }, { label: 'TESOURO', value: 60, display: '30%' },
          { label: 'FUNDOS', value: 40, display: '20%' }, { label: 'OUTROS', value: 20, display: '10%' }
        ] },
        { type: 'table', title: 'Produtos em destaque', columns: ['Produto', 'Categoria', 'Clientes', 'Saldo'], rows: [
          ['CDB Roxo', 'Renda fixa', '142', 'R$ 980.000,00'],
          ['Tesouro Selic', 'Título público', '98', 'R$ 735.000,00'],
          ['Fundo Equilíbrio', 'Fundo', '64', 'R$ 490.000,00']
        ] }
      ]
    };
  }
}
