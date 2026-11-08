import { Component } from '@angular/core';

@Component({
  template: `
    <main>
      <h1>Não foi possível carregar esta página</h1>
      <p>O microfrontend está indisponível ou é incompatível com o shell.</p>
      <p>Verifique o servidor da página e recarregue para tentar novamente.</p>
      <button type="button" (click)="reload()">Recarregar página</button>
    </main>
  `
})
export class RemoteErrorPage {
  protected reload(): void { window.location.reload(); }
}
