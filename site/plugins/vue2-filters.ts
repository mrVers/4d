export default () => {
  console.log(`Hello from ${process.server ? 'Server' : 'Client'} !`);
}

import Vue from 'vue';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);
