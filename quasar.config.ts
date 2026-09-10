// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app'

export default defineConfig((ctx) => {
  return {
    boot: [
      'auth',
      'openVault',
      'i18n',
      'darkmode'
    ],
    css: [
      'app.scss'
    ],
    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      typescript: {
        strict: true,
        vueShim: true
      },

      filenameBasedRouting: true,

      vueRouterMode: 'hash',

      vitePlugins: [
        ['@intlify/unplugin-vue-i18n/vite', {
          ssr: ctx.mode.ssr || ctx.mode.ssg,

          include: [ ctx.appPaths.resolve.app('src/i18n') ]
        }]
      ]
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},
      plugins: [
        'Notify',
        'Platform'
      ]
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: [
        'render'
      ],
    },

    pwa: {
      workboxMode: 'GenerateSW'
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      preloadScripts: [ 'electron-preload' ],

      inspectPort: 5858,

      bundler: 'packager',

      builder: {
        appId: 'password-manager-web'
      }
    },
    bex: {
      extraScripts: []
    }
  }
});
