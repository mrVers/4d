/**
 * Extends interfaces in Vue.js
 */


import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    localePath(route: string | any, locale?: string): string; // Temporal https://cmty.app/nuxt/nuxt-i18n/issues/c180
    $store: Store<any>;
  }

  interface VueConstructor {
    $store: Store<any>;
    $router: VueRouter;
  }
}

// declare module 'vue/types/options' {
//   // Declare augmentation for Options
//   interface ComponentOptions<V extends Vue,
//     Data = DefaultData<V>,
//     Methods = DefaultMethods<V>,
//     Computed = DefaultComputed,
//     PropsDef = PropsDefinition<DefaultProps>,
//     Props = DefaultProps> {
//
//     middleware?: string;
//     layout?: string;
//
//     $store?: Store<any>;
//     $router: VueRouter;
//   }
// }
