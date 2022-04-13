import ViteFonts from 'vite-plugin-fonts';
import { splitVendorChunkPlugin } from 'vite';

export default {
  plugins: [
    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles:
              'ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900',
          },
        ],
      },
    }),
  ],
  root: './',
  build: {
    target: 'es2015',
    outDir: 'docs/',
    rollupOptions: {
      output: 'compact',
    },
  },
  publicDir: 'public',
};
