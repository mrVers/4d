export default {
  env: {},
  head: {
    title: 'VIDEOTEK4_',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Zbirka dokumentarnih filmov in koprodukcija za prijatelje.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Space+Mono:400,700&display=swap&subset=latin-ext' }
    ]
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/css/main.scss'],
  build: {},
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: '../' }],
  ],
  axios: {}
};
