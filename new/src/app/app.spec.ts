import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('Shell Banco Roxo', () => {
  it('apresenta links para os quatro microfrontends', () => {
    TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    for (const route of ['/inicio', '/contas', '/movimentacoes', '/investimentos']) {
      expect(element.querySelector(`a[href="${route}"]`)).not.toBeNull();
    }
    expect(element.textContent).toContain('Banco Roxo');
  });
});
