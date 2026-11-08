import { Component, computed, signal } from '@angular/core';
import { movementMetrics, movementRows } from '../../../../src/app/bank-data';
import { MetricsComponent } from '../../../../src/app/metrics.component';
import { TableComponent } from '../../../../src/app/table.component';

export { inject as angularRuntime } from '@angular/core';

@Component({
  imports: [MetricsComponent, TableComponent],
  template: `
    <main>
      <div class="page-heading"><div><p class="eyebrow">Operações</p><h1>Movimentações</h1><p>Acompanhe as movimentações recentes das contas.</p></div><span class="demo-badge">AMBIENTE DEMONSTRATIVO</span></div>
      <div class="content-grid">
        <app-metrics [metrics]="metrics" />
        <div class="filter full-slot">
          <label for="movement-filter">Buscar movimentações</label>
          <input #search id="movement-filter" type="search" placeholder="Busque por cliente, tipo ou data"
            [value]="filter()" (input)="filter.set(search.value)">
        </div>
        <app-table class="full-slot" title="Histórico de operações" [columns]="columns" [rows]="filteredRows()" />
      </div>
      <footer>Banco Roxo · Dados fictícios para demonstração</footer>
    </main>
  `
})
export class MovementsPage {
  protected readonly metrics = movementMetrics;
  protected readonly columns = ['Data', 'Cliente', 'Tipo', 'Valor'];
  protected readonly filter = signal('');
  protected readonly filteredRows = computed(() => {
    const term = this.filter().trim().toLowerCase();
    return movementRows.filter(row => row.some(cell => cell.toLowerCase().includes(term)));
  });
}
