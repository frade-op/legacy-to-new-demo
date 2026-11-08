import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CardComponent, ChartComponent, FilterComponent, TableComponent } from './blocks.component';
import { DynamicBlockDirective } from './dynamic-block.directive';
import { LayoutComponent } from './layout.component';
import { ContasResolver, DashboardResolver, InvestimentosResolver, MovimentacoesResolver } from './page.resolvers';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: LayoutComponent, resolve: { page: DashboardResolver } },
  { path: 'contas', component: LayoutComponent, resolve: { page: ContasResolver } },
  { path: 'movimentacoes', component: LayoutComponent, resolve: { page: MovimentacoesResolver } },
  { path: 'investimentos', component: LayoutComponent, resolve: { page: InvestimentosResolver } },
  { path: '**', redirectTo: 'inicio' }
];

@Component({ selector: 'app-root', template: '<router-outlet></router-outlet>' })
export class AppComponent {}

@NgModule({
  declarations: [AppComponent, LayoutComponent, DynamicBlockDirective, CardComponent, TableComponent, FilterComponent, ChartComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  entryComponents: [CardComponent, TableComponent, FilterComponent, ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
