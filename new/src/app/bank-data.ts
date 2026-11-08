export interface Metric {
  title: string;
  value: string;
  detail: string;
}

export const homeMetrics: Metric[] = [
  { title: 'Saldo disponível', value: 'R$ 128.450,90', detail: 'Atualizado hoje' },
  { title: 'Clientes ativos', value: '1.284', detail: '+ 8% neste mês' },
  { title: 'Operações no mês', value: '342', detail: '12 aguardando análise' }
];

export const accountMetrics: Metric[] = [
  { title: 'Total de contas', value: '1.284', detail: 'Contas ativas' },
  { title: 'Novas contas', value: '48', detail: 'Neste mês' },
  { title: 'Em análise', value: '12', detail: 'Aguardando documentação' }
];

export const movements = [
  ['Ana Martins', 'Transferência recebida', '18/06/2024', 'R$ 4.250,00'],
  ['Ricardo Lima', 'Pagamento', '17/06/2024', 'R$ 890,00'],
  ['Carla Souza', 'Depósito', '17/06/2024', 'R$ 2.150,00']
];

export const accounts = [
  ['Ana Martins', '00458-2', '0001', 'Ativa'],
  ['Ricardo Lima', '01762-9', '0001', 'Ativa'],
  ['Carla Souza', '02385-4', '0002', 'Em análise'],
  ['Bruno Almeida', '03121-0', '0002', 'Ativa']
];

export const monthlyBars = [
  { label: 'JAN', value: 42, display: 'R$ 42 mil' },
  { label: 'FEV', value: 58, display: 'R$ 58 mil' },
  { label: 'MAR', value: 48, display: 'R$ 48 mil' },
  { label: 'ABR', value: 72, display: 'R$ 72 mil' },
  { label: 'MAI', value: 65, display: 'R$ 65 mil' },
  { label: 'JUN', value: 90, display: 'R$ 90 mil' }
];

export const movementMetrics: Metric[] = [
  { title: 'Entradas', value: 'R$ 86.420,00', detail: 'Neste mês' },
  { title: 'Saídas', value: 'R$ 42.180,00', detail: 'Neste mês' },
  { title: 'Operações', value: '342', detail: 'Neste mês' }
];

export const movementRows = [
  ['18/06/2024', 'Ana Martins', 'Transferência recebida', 'R$ 4.250,00'],
  ['17/06/2024', 'Ricardo Lima', 'Pagamento', 'R$ 890,00'],
  ['17/06/2024', 'Carla Souza', 'Depósito', 'R$ 2.150,00'],
  ['16/06/2024', 'Bruno Almeida', 'Transferência enviada', 'R$ 1.200,00']
];

export const investmentMetrics: Metric[] = [
  { title: 'Total investido', value: 'R$ 2.450.000,00', detail: 'Patrimônio sob gestão' },
  { title: 'Rentabilidade', value: '0,84%', detail: 'No último mês' },
  { title: 'Investidores', value: '324', detail: 'Clientes com investimentos' }
];

export const investmentBars = [
  { label: 'CDB', value: 80, display: '40%' },
  { label: 'TESOURO', value: 60, display: '30%' },
  { label: 'FUNDOS', value: 40, display: '20%' },
  { label: 'OUTROS', value: 20, display: '10%' }
];

export const investmentRows = [
  ['CDB Roxo', 'Renda fixa', '142', 'R$ 980.000,00'],
  ['Tesouro Selic', 'Título público', '98', 'R$ 735.000,00'],
  ['Fundo Equilíbrio', 'Fundo', '64', 'R$ 490.000,00']
];
