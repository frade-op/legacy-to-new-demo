import { Component, computed, signal } from '@angular/core';
import { accountMetrics, accounts } from '../../../../src/app/bank-data';
import { MetricsComponent } from '../../../../src/app/metrics.component';
import { TableComponent } from '../../../../src/app/table.component';

export { inject as angularRuntime } from '@angular/core';

@Component({
  imports: [MetricsComponent, TableComponent],
  template: `
    <main>
      <div class="page-heading"><div><p class="eyebrow">Relacionamento</p><h1>Contas</h1><p>Consulte as contas e os clientes da sua carteira.</p></div><span class="demo-badge">AMBIENTE DEMONSTRATIVO</span></div>
      <div class="content-grid">
        <app-metrics [metrics]="metrics" />
        <div class="filter full-slot">
          <label for="account-filter">Buscar contas</label>
          <input #search id="account-filter" type="search" placeholder="Busque por cliente, conta ou situação"
            [value]="filter()" (input)="filter.set(search.value)">
        </div>
        <app-table class="full-slot" title="Carteira de clientes" [columns]="columns" [rows]="filteredRows()" />
      </div>
      <footer>Banco Roxo · Dados fictícios para demonstração</footer>
    </main>
  `
})
export class AccountsPage {
  protected readonly metrics = accountMetrics;
  protected readonly columns = ['Cliente', 'Conta', 'Agência', 'Situação'];
  protected readonly filter = signal('');
  protected readonly filteredRows = computed(() => {
    const term = this.filter().trim().toLowerCase();
    return accounts.filter(row => row.some(cell => cell.toLowerCase().includes(term)));
  });
}
