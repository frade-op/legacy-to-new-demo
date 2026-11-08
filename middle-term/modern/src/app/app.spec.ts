import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('Banco Roxo moderno', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('mostra os mesmos dados da visão geral e liga as páginas legadas', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/inicio');
    await fixture.whenStable();
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('Bem-vinda de volta, Marina');
    expect(page.querySelectorAll('.metric').length).toBe(3);
    expect(page.querySelectorAll('.chart-item').length).toBe(6);
    expect(page.querySelector('tbody')?.textContent).toContain('Ana Martins');
    expect(page.querySelector('a[href="/legado/movimentacoes"]')).not.toBeNull();
    expect(page.querySelector('a[href="/legado/investimentos"]')).not.toBeNull();
  });

  it('filtra contas e informa quando não há resultados', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/contas');
    await fixture.whenStable();
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    const input = page.querySelector('input') as HTMLInputElement;
    expect(page.querySelectorAll('tbody tr').length).toBe(4);
    input.value = 'ricardo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(page.querySelectorAll('tbody tr').length).toBe(1);
    expect(page.querySelector('tbody')?.textContent).toContain('Ricardo Lima');
    input.value = 'não existe';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(page.querySelector('tbody')?.textContent).toContain('Nenhum resultado encontrado.');
  });
});
