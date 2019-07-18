import { Media, RootState } from '~/types';
import { MutationTree, ActionTree } from 'vuex';

export const state = (): RootState => ({
  episodes: []
});

export const mutations: MutationTree<RootState> = {
  setEpisodes(state: RootState, episodes: Media[]): void {
    state.episodes = episodes;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  // async nuxtServerInit({ commit }, context) {
  //   let people: Person[] = [];
  //
  //   // If you serve the site statically with `nuxt generate`, you can't use HTTP requests for local
  //   people = await context.app.$axios.$get('./random-data.json');
  //
  //   commit('setPeople', people.slice(0, 10));
  // }

  async GET({ commit }) {
    try {
      commit('setEpisodes', []);
      const episodes = await (this as any).$axios.$get(`http://localhost:3001/media`);
      commit('setEpisodes', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_DOCS({ commit }) {
    try {
      commit('setEpisodes', []);
      const episodes = await (this as any).$axios.$get(`http://localhost:3001/media/docs`);
      commit('setEpisodes', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_MOVIES({ commit }) {
    try {
      commit('setEpisodes', []);
      const episodes = await (this as any).$axios.$get(`http://localhost:3001/media/movies`);
      commit('setEpisodes', episodes);
    } catch (e) {
      console.log(e);
    }
  }

};
