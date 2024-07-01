import {resolve, join} from 'path'
import {defineConfig, externalizeDepsPlugin} from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                plugins: [
                    {
                        name: 'watch-external',
                        buildStart(){
                            this.addWatchFile(join(process.env.APP_PATH, 'app', 'Providers', 'NativeAppServiceProvider.php'));
                            this.addWatchFile(join(process.env.APP_PATH, 'forks', 'nativephp-electron', 'resources', 'js', 'build'));
                            this.addWatchFile(join(process.env.APP_PATH, 'forks', 'nativephp-electron', 'resources', 'js', 'resources'));
                            this.addWatchFile(join(process.env.APP_PATH, 'forks', 'nativephp-electron', 'resources', 'js', 'src'));
                            this.addWatchFile(join(process.env.APP_PATH, 'forks', 'nativephp-electron-plugin', 'dist'));
                            this.addWatchFile(join(process.env.APP_PATH, 'forks', 'nativephp-laravel', 'src'));
                        }
                    }
                ]
            },
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [vue()]
    }
})
