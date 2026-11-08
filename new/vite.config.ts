import angular from '@analogjs/vite-plugin-angular';
import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';

const pages = {
  inicio: 'projects/inicio/src/app/home.page.ts',
  contas: 'projects/contas/src/app/accounts.page.ts',
  movimentacoes: 'projects/movimentacoes/src/app/movements.page.ts',
  investimentos: 'projects/investimentos/src/app/investments.page.ts',
};

const shared = Object.fromEntries([
  '@angular/core', '@angular/common', '@angular/compiler',
  '@angular/platform-browser', '@angular/router', 'rxjs', 'tslib',
].map(name => [name, { singleton: true, requiredVersion: name.startsWith('@angular/') ? '^22.2.0' : name === 'rxjs' ? '~7.8.0' : '^2.3.0', strictVersion: true }]));

export default defineConfig(({ mode }) => {
  const isShell = mode === 'shell' || mode === 'development';
  if (!isShell && !(mode in pages)) throw new Error(`Projeto desconhecido: ${mode}`);
  const name = isShell ? 'shell' : mode as keyof typeof pages;
  return {
    resolve: { mainFields: ['module'] },
    server: { proxy: { '/remotes': 'http://127.0.0.1:4205' } },
    plugins: [
      angular({ tsconfig: isShell ? 'tsconfig.app.json' : `projects/${name}/tsconfig.app.json` }),
      federation({
        name,
        filename: 'remoteEntry.js',
        dts: false,
        shareStrategy: 'loaded-first',
        exposes: isShell ? {} : { './Page': `./${pages[name as keyof typeof pages]}` },
        remotes: isShell ? Object.fromEntries(Object.keys(pages).map(page => [page, {
          type: 'module',
          name: page,
          entry: `/remotes/${page}/remoteEntry.js`,
        }])) : {},
        shared,
      }),
    ],
    build: {
      target: 'esnext',
      outDir: `dist/${isShell ? 'banco-roxo' : name}`,
      rolldownOptions: isShell ? {} : { input: pages[name as keyof typeof pages] },
    },
  };
});
