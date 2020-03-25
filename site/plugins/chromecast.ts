import Vue from 'vue';

declare const Castjs: any;

// load Castjs chromecast library into Vue
Vue.prototype.$cast = new Castjs();
