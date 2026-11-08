import { inject, Type } from '@angular/core';
import { Routes } from '@angular/router';
import { RemoteErrorPage } from './remote-error.page';

type PageExport = 'HomePage' | 'AccountsPage' | 'MovementsPage' | 'InvestmentsPage';
type RemotePage = { angularRuntime: typeof inject } & Partial<Record<PageExport, Type<unknown>>>;

function remotePage(name: string, exportName: PageExport, load: () => Promise<RemotePage>): () => Promise<Type<unknown>> {
  return async () => {
    try {
      const remote = await load();
      if (remote.angularRuntime !== inject) {
        throw new Error(`O microfrontend ${name} não compartilha o runtime Angular do shell.`);
      }
      const page = remote[exportName];
      if (typeof page !== 'function') {
        throw new Error(`O microfrontend ${name} não exporta ${exportName}.`);
      }
      return page;
    } catch (error) {
      console.error(`Não foi possível carregar o microfrontend ${name}.`, error);
      return RemoteErrorPage;
    }
  };
}

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: remotePage('inicio', 'HomePage', () => import('inicio/Page')) },
  { path: 'contas', loadComponent: remotePage('contas', 'AccountsPage', () => import('contas/Page')) },
  { path: 'movimentacoes', loadComponent: remotePage('movimentacoes', 'MovementsPage', () => import('movimentacoes/Page')) },
  { path: 'investimentos', loadComponent: remotePage('investimentos', 'InvestmentsPage', () => import('investimentos/Page')) },
  { path: '**', redirectTo: 'inicio' }
];
