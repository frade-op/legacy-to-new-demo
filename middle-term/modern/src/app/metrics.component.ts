import { Component, input } from '@angular/core';
import { Metric } from './bank-data';

@Component({
  selector: 'app-metrics',
  template: `
    @for (metric of metrics(); track metric.title) {
      <article class="card metric">
        <p class="metric-label">{{ metric.title }}</p>
        <strong>{{ metric.value }}</strong>
        <p class="metric-detail">{{ metric.detail }}</p>
      </article>
    }
  `,
  host: { class: 'contents' }
})
export class MetricsComponent {
  readonly metrics = input.required<Metric[]>();
}
