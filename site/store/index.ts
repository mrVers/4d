import { Media, RootState } from '~/types';
import { MutationTree, ActionTree } from 'vuex';

const API = `${process.env.API_URL}:${process.env.API_PORT}`;

export const state = (): RootState => ({
  episodes: []
});

export const mutations: MutationTree<RootState> = {
  // tslint:disable-next-line:no-shadowed-variable
  setEpisodes(state: RootState, episodes: Media[]): void {
    state.episodes = episodes;
  }
};

export const actions: ActionTree<RootState, RootState> = {

  async GET({ commit }) {
    try {
      commit('setEpisodes', []);
      const episodes = await this.$axios.$get(`${API}/media`);
      commit('setEpisodes', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_DOCS({ commit }) {
    try {
      commit('setEpisodes', []);
      const episodes = await this.$axios.$get(`${API}/media/docs`);
      commit('setEpisodes', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_MOVIES({ commit }) {
    try {
      commit('setEpisodes', []);
      const episodes = await this.$axios.$get(`${API}/media/movies`);
      commit('setEpisodes', episodes);
    } catch (e) {
      console.log(e);
    }
  }

};
