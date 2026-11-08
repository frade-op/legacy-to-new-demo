import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent, routes } from './app.module';
import { CardComponent, ChartComponent, FilterComponent, TableComponent } from './blocks.component';
import { DynamicBlockDirective } from './dynamic-block.directive';
import { LayoutComponent } from './layout.component';
import { SIMULATED_REQUEST_DELAY_MS } from './page.resolvers';

@NgModule({
  declarations: [AppComponent, LayoutComponent, DynamicBlockDirective, CardComponent, TableComponent, FilterComponent, ChartComponent],
  imports: [CommonModule, RouterTestingModule],
  entryComponents: [CardComponent, TableComponent, FilterComponent, ChartComponent]
})
class TestAppModule {}

describe('Banco Roxo legado', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestAppModule, RouterTestingModule.withRoutes(routes)]
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('resolve as quatro páginas no mesmo layout e renderiza os blocos', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const pages = [
      { path: '/inicio', title: 'Bem-vinda de volta, Marina', chart: true, filter: false },
      { path: '/contas', title: 'Contas', chart: false, filter: true },
      { path: '/movimentacoes', title: 'Movimentações', chart: false, filter: true },
      { path: '/investimentos', title: 'Investimentos', chart: true, filter: false }
    ];
    pages.forEach(page => {
      const previousPath = location.path();
      const previousTitle = fixture.nativeElement.querySelector('h1');
      router.navigateByUrl(page.path);
      tick(SIMULATED_REQUEST_DELAY_MS - 1);
      fixture.detectChanges();
      expect(location.path()).toBe(previousPath);
      expect(fixture.nativeElement.querySelector('h1')).toBe(previousTitle);
      tick(1);
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      expect(location.path()).toBe(page.path);
      expect(element.querySelector('h1')!.textContent).toContain(page.title);
      expect(element.querySelectorAll('app-card').length).toBe(3);
      expect(element.querySelectorAll('app-table').length).toBe(1);
      expect(!!element.querySelector('app-chart')).toBe(page.chart);
      expect(!!element.querySelector('app-filter')).toBe(page.filter);
      expect(element.querySelector('a[href="/inicio"]')).not.toBeNull();
      expect(element.querySelector('a[href="/contas"]')).not.toBeNull();
    });
  }));

  it('filtra a tabela e limpa o filtro ao trocar de página', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    router.navigateByUrl('/contas');
    tick(SIMULATED_REQUEST_DELAY_MS);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector('input') as HTMLInputElement;
    input.value = 'ricardo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(element.querySelectorAll('tbody tr').length).toBe(1);
    expect(element.querySelector('tbody')!.textContent).toContain('Ricardo Lima');
    input.value = 'inexistente';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(element.querySelector('tbody')!.textContent).toContain('Nenhum resultado encontrado.');
    router.navigateByUrl('/movimentacoes');
    tick(SIMULATED_REQUEST_DELAY_MS);
    fixture.detectChanges();
    expect((element.querySelector('input') as HTMLInputElement).value).toBe('');
    expect(element.querySelectorAll('tbody tr').length).toBe(4);
  }));

  it('redireciona caminhos desconhecidos para o início', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    router.navigateByUrl('/nao-existe');
    tick(SIMULATED_REQUEST_DELAY_MS);
    fixture.detectChanges();
    expect(location.path()).toBe('/inicio');
  }));
});
