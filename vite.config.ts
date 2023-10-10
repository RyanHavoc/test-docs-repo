import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import typescript from '@rollup/plugin-typescript';

function foo(bar: string) {
  return bar;
}

export default defineConfig(async ({ mode }) => {
  return {
    plugins: [
      vue3(),
      dts({
        insertTypesEntry: true,
      }),
      typescript({
        exclude: ['vite.config.ts'],
      }),
    ],
    build: {
      cssCodeSplit: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ReefUI',
        formats: ['es'],
        fileName: () => `index.js`,
      },

      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.ts'),
        },
        external: ['vue', '@swimm/reefui'],
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'index.css') return 'styles.css';
            return assetInfo.name;
          },
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
      sourcemap: true,
    },
    test: {
      foo: 'bar',
    },
    typesDir: 'dist/types',
    define: {
      'process.env': {},
    },
  };
});
