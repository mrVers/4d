export default {
  env: {},
  head: {
    title: '4d',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{ description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/css/main.scss'],
  build: {},
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {}
};
