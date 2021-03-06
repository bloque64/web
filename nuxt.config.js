
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'medium-editor/dist/css/medium-editor.css',
    'vue2-content-editor/src/themes/default.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: './plugins/medium-editor', ssr: false },
    { src: './plugins/vuelidate.js' },
    { src: '~/plugins/fontawesome.js' },
    { src: '~/plugins/vuex-persist.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
    /* '@nuxtjs/fontawesome' */
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  /* fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faCog', 'faCalendar', 'faHome', 'faCircle', 'faCheck', 'faPerson']
      }
    ],
    icons: {
      solid: true,
      brands: [
        'faNode',
        'faVuejs'
      ]
    }
  }, */
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
        if (ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue|ts)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/,
            options: {
              fix: true
            }
          })
          config.node = {
            fs: 'empty',
            child_process: 'empty',
          }
        }
      }
    }
  },
  /*
  ** Inversify crashes without this
  */
  render: {
    bundleRenderer: {
      runInNewContext: false
    }
  },
  /*
  ** Wihtout this vue config I can't debug in Chrome
  */
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  }
}
