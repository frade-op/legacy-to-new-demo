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
