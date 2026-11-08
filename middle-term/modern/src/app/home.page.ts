import { Component } from '@angular/core';
import { homeMetrics, monthlyBars, movements } from './bank-data';
import { MetricsComponent } from './metrics.component';
import { TableComponent } from './table.component';

@Component({
  imports: [MetricsComponent, TableComponent],
  template: `
    <main>
      <div class="page-heading"><div><p class="eyebrow">Visão geral</p><h1>Bem-vinda de volta, Marina</h1><p>Acompanhe os principais números da sua carteira.</p></div><span class="demo-badge">AMBIENTE DEMONSTRATIVO</span></div>
      <div class="content-grid">
        <app-metrics [metrics]="metrics" />
        <section class="card chart-card full-slot">
          <div class="section-heading"><div><h2>Movimentação mensal</h2><p>Volume financeiro dos últimos seis meses</p></div></div>
          <div class="chart" role="list" aria-label="Movimentação mensal">
            @for (bar of bars; track bar.label) {
              <div class="chart-item" role="listitem">
                <span class="chart-value">{{ bar.display }}</span>
                <div class="bar-track"><div class="bar" [style.height.%]="bar.value"></div></div>
                <span class="chart-label">{{ bar.label }}</span>
              </div>
            }
          </div>
        </section>
        <app-table class="full-slot" title="Últimas movimentações" [columns]="columns" [rows]="rows" />
      </div>
      <footer>Banco Roxo · Dados fictícios para demonstração</footer>
    </main>
  `
})
export class HomePage {
  protected readonly metrics = homeMetrics;
  protected readonly bars = monthlyBars;
  protected readonly rows = movements;
  protected readonly columns = ['Cliente', 'Operação', 'Data', 'Valor'];
}
