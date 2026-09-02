import { existsSync } from 'node:fs';
import { sites } from '@openai/sites-vite-plugin';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// Read-only content: export static files, with no Worker or database runtime.
export default defineConfig({
  // Sites metadata is local-only; GitHub builds do not require this plugin.
  plugins: [
    vinext(),
    ...(existsSync(new URL('./.openai/hosting.json', import.meta.url))
      ? [sites()]
      : []),
  ],
  server: {
    host: '127.0.0.1',
    strictPort: true,
  },
});
