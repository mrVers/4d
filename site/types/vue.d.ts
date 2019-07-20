/**
 * Extends interfaces in Vue.js
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueRouter, { Route } from 'vue-router';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    localePath(route: string | any, locale?: string): string; // Temporal https://cmty.app/nuxt/nuxt-i18n/issues/c180
    $store: Store<any>;
    $axios: NuxtAxiosInstance;
    $route: Route;
  }

  interface VueConstructor {
    $store: Store<any>;
    $router: VueRouter;
  }
}
