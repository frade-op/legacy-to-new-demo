import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <section class="card table-card">
      <div class="section-heading"><h2>{{ title() }}</h2><span>Dados demonstrativos</span></div>
      <div class="table-scroll">
        <table>
          <thead><tr>@for (column of columns(); track column) { <th scope="col">{{ column }}</th> }</tr></thead>
          <tbody>
            @for (row of rows(); track $index) {
              <tr>@for (cell of row; track $index) { <td>{{ cell }}</td> }</tr>
            } @empty {
              <tr><td [attr.colspan]="columns().length">Nenhum resultado encontrado.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class TableComponent {
  readonly title = input.required<string>();
  readonly columns = input.required<string[]>();
  readonly rows = input.required<string[][]>();
}
