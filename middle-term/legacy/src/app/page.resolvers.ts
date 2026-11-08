import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PageContent } from './page.model';
import { PageContentService } from './page-content.service';

export const SIMULATED_REQUEST_DELAY_MS = 3000;

function simulateRequest(page: PageContent): Observable<PageContent> {
  return of(page).pipe(delay(SIMULATED_REQUEST_DELAY_MS));
}

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<PageContent> {
  constructor(private content: PageContentService) {}
  resolve(): Observable<PageContent> { return simulateRequest(this.content.dashboard()); }
}

@Injectable({ providedIn: 'root' })
export class ContasResolver implements Resolve<PageContent> {
  constructor(private content: PageContentService) {}
  resolve(): Observable<PageContent> { return simulateRequest(this.content.contas()); }
}

@Injectable({ providedIn: 'root' })
export class MovimentacoesResolver implements Resolve<PageContent> {
  constructor(private content: PageContentService) {}
  resolve(): Observable<PageContent> { return simulateRequest(this.content.movimentacoes()); }
}

@Injectable({ providedIn: 'root' })
export class InvestimentosResolver implements Resolve<PageContent> {
  constructor(private content: PageContentService) {}
  resolve(): Observable<PageContent> { return simulateRequest(this.content.investimentos()); }
}
