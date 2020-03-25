export default {
  env: {},
  head: {
    title: 'VIDEOTEK4_',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Zbirka dokumentarnih filmov in koprodukcija za prijatelje.' },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'referrer', content: 'no-referrer' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Space+Mono:400,700&display=swap&subset=latin-ext' }
    ],
    script: [
      { src: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1' },
      { src: 'https://cdn.jsdelivr.net/gh/fenny/castjs@3.0.1/cast.min.js' }
    ]
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/css/main.scss'],
  build: {},
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: '../' }],
  ],
  plugins: [
    { src: '~/plugins/chromecast.ts', mode: 'client' }
  ],
  axios: {}
};
