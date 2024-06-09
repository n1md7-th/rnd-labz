import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 4096,
    host: '0.0.0.0',
    open: '?name=Rnd_Labz',
    https: {
      key: readFileSync(join(cwd(), 'certs', 'key.pem')),
      cert: readFileSync(join(cwd(), 'certs', 'cert.pem')),
    },
    proxy: {},
  },
});
