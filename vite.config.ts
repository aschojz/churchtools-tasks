import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath, URL } from 'url';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    base: `/ccm/tasks/`,
    server: {
        https: true,
    },
    plugins: [vue(), eslintPlugin(), basicSsl()],
    define: {
        __VUE_I18N_LEGACY_API__: false,
    },
    resolve: {
        dedupe: ['vue'], // this line,
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
