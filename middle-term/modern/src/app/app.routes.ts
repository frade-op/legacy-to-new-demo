import { Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AccountsPage } from './accounts.page';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomePage },
  { path: 'contas', component: AccountsPage },
  { path: '**', redirectTo: 'inicio' }
];
