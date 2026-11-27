import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function browserManifest(browser) {
  return {
    name: 'browser-extension-manifest',
    generateBundle() {
      const manifest = JSON.parse(readFileSync(resolve(__dirname, 'public/manifest.json'), 'utf8'));
      if (browser === 'firefox') {
        manifest.browser_specific_settings = {
          gecko: {
            id: 'weatherex@lordmaksymus',
            strict_min_version: '140.0',
            data_collection_permissions: { required: ['locationInfo'] },
          },
        };
      } else {
        manifest.permissions = manifest.permissions.filter(permission => permission !== 'geolocation');
      }

      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(manifest, null, 2) + '\n',
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const browser = ['firefox', 'safari'].includes(mode) ? mode : 'chromium';

  return {
    plugins: [react(), browser !== 'chromium' && browserManifest(browser)],
    base: './',
    publicDir: 'public',
    build: {
      target: ['chrome109', 'edge109', 'firefox140', 'safari17'],
      outDir: browser === 'chromium' ? 'dist' : 'dist-' + browser,
      rollupOptions: {
        input: { popup: resolve(__dirname, 'popup.html') },
      },
    },
  };
});
