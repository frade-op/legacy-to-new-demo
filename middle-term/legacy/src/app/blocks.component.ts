import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardBlock, ChartBlock, FilterBlock, TableBlock } from './page.model';

@Component({
  selector: 'app-card',
  template: `
    <article class="card metric">
      <p class="metric-label">{{ block.title }}</p>
      <strong>{{ block.value }}</strong>
      <p class="metric-detail">{{ block.detail }}</p>
    </article>`
})
export class CardComponent {
  @Input() block!: CardBlock;
}

@Component({
  selector: 'app-table',
  template: `
    <section class="card table-card">
      <div class="section-heading"><h2>{{ block.title }}</h2><span>Dados demonstrativos</span></div>
      <div class="table-scroll">
        <table>
          <thead><tr><th *ngFor="let column of block.columns" scope="col">{{ column }}</th></tr></thead>
          <tbody>
            <tr *ngFor="let row of filteredRows"><td *ngFor="let cell of row">{{ cell }}</td></tr>
            <tr *ngIf="filteredRows.length === 0"><td [attr.colspan]="block.columns.length">Nenhum resultado encontrado.</td></tr>
          </tbody>
        </table>
      </div>
    </section>`
})
export class TableComponent {
  @Input() block!: TableBlock;
  @Input() filter = '';

  get filteredRows(): string[][] {
    const term = this.filter.trim().toLowerCase();
    return this.block.rows.filter(row => row.some(cell => cell.toLowerCase().indexOf(term) !== -1));
  }
}

@Component({
  selector: 'app-filter',
  template: `
    <div class="filter">
      <label for="page-filter">{{ block.label }}</label>
      <input #search id="page-filter" type="search" [placeholder]="block.placeholder"
        [value]="filter" (input)="filterChange.emit(search.value)">
    </div>`
})
export class FilterComponent {
  @Input() block!: FilterBlock;
  @Input() filter = '';
  @Output() filterChange = new EventEmitter<string>();
}

@Component({
  selector: 'app-chart',
  template: `
    <section class="card chart-card">
      <div class="section-heading"><div><h2>{{ block.title }}</h2><p>{{ block.subtitle }}</p></div></div>
      <div class="chart" role="list" [attr.aria-label]="block.title">
        <div class="chart-item" role="listitem" *ngFor="let bar of block.bars">
          <span class="chart-value">{{ bar.display }}</span>
          <div class="bar-track"><div class="bar" [style.height.%]="bar.value"></div></div>
          <span class="chart-label">{{ bar.label }}</span>
        </div>
      </div>
    </section>`
})
export class ChartComponent {
  @Input() block!: ChartBlock;
}
