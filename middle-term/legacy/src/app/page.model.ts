export interface CardBlock {
  type: 'card';
  title: string;
  value: string;
  detail: string;
}

export interface TableBlock {
  type: 'table';
  title: string;
  columns: string[];
  rows: string[][];
}

export interface FilterBlock {
  type: 'filter';
  label: string;
  placeholder: string;
}

export interface ChartBlock {
  type: 'chart';
  title: string;
  subtitle: string;
  bars: { label: string; value: number; display: string }[];
}

export type PageBlock = CardBlock | TableBlock | FilterBlock | ChartBlock;

export interface PageContent {
  eyebrow: string;
  title: string;
  description: string;
  blocks: PageBlock[];
}
