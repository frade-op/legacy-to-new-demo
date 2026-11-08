import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(error => console.error(error));
