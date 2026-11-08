import { Component } from '@angular/core';
import { investmentMetrics, investmentBars, investmentRows } from '../../../../src/app/bank-data';
import { MetricsComponent } from '../../../../src/app/metrics.component';
import { TableComponent } from '../../../../src/app/table.component';

export { inject as angularRuntime } from '@angular/core';

@Component({
  imports: [MetricsComponent, TableComponent],
  template: `
    <main>
      <div class="page-heading"><div><p class="eyebrow">Patrimônio</p><h1>Investimentos</h1><p>Uma visão dos investimentos da sua carteira.</p></div><span class="demo-badge">AMBIENTE DEMONSTRATIVO</span></div>
      <div class="content-grid">
        <app-metrics [metrics]="metrics" />
        <section class="card chart-card full-slot">
          <div class="section-heading"><div><h2>Distribuição da carteira</h2><p>Participação por categoria</p></div></div>
          <div class="chart" role="list" aria-label="Distribuição da carteira">
            @for (bar of bars; track bar.label) {
              <div class="chart-item" role="listitem">
                <span class="chart-value">{{ bar.display }}</span>
                <div class="bar-track"><div class="bar" [style.height.%]="bar.value"></div></div>
                <span class="chart-label">{{ bar.label }}</span>
              </div>
            }
          </div>
        </section>
        <app-table class="full-slot" title="Produtos em destaque" [columns]="columns" [rows]="rows" />
      </div>
      <footer>Banco Roxo · Dados fictícios para demonstração</footer>
    </main>
  `
})
export class InvestmentsPage {
  protected readonly metrics = investmentMetrics;
  protected readonly bars = investmentBars;
  protected readonly rows = investmentRows;
  protected readonly columns = ['Produto', 'Categoria', 'Clientes', 'Saldo'];
}
