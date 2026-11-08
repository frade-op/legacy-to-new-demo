import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageContent } from './page.model';

@Component({
  selector: 'app-layout',
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand" href="/inicio"><span class="brand-mark">r</span><span>banco<br><strong>roxo</strong></span></a>
        <p class="sidebar-label">ÁREA INTERNA</p>
        <nav aria-label="Navegação principal">
          <a href="/inicio"><span class="nav-icon">◫</span> Visão geral</a>
          <a href="/contas"><span class="nav-icon">◎</span> Contas</a>
          <a routerLink="/movimentacoes" routerLinkActive="active"><span class="nav-icon">⇄</span> Movimentações</a>
          <a routerLink="/investimentos" routerLinkActive="active"><span class="nav-icon">▥</span> Investimentos</a>
        </nav>
        <div class="sidebar-footer">Banco Roxo<br><span>Ambiente de demonstração</span></div>
      </aside>
      <div class="workspace">
        <header class="topbar"><span>Banco Roxo <span class="separator">/</span> Área interna</span><div class="profile"><span class="avatar">MC</span><span>Marina Costa<br><small>Gerente de relacionamento</small></span></div></header>
        <main *ngIf="page">
          <div class="page-heading"><div><p class="eyebrow">{{ page.eyebrow }}</p><h1>{{ page.title }}</h1><p>{{ page.description }}</p></div><span class="demo-badge">AMBIENTE DEMONSTRATIVO</span></div>
          <div class="content-grid">
            <ng-container *ngFor="let block of page.blocks">
              <div [class.metric-slot]="block.type === 'card'" [class.full-slot]="block.type !== 'card'">
                <ng-container [appDynamicBlock]="block" [filter]="filter" (filterChange)="filter = $event"></ng-container>
              </div>
            </ng-container>
          </div>
          <footer>Banco Roxo · Dados fictícios para demonstração</footer>
        </main>
      </div>
    </div>`
})
export class LayoutComponent implements OnInit, OnDestroy {
  page?: PageContent;
  filter = '';
  private subscription?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.page = data.page as PageContent;
      this.filter = '';
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
