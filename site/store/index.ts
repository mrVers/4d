import { FrontMedia, Media, RootState } from '../types';
import { MutationTree, ActionTree, GetterTree } from 'vuex';

const API = `${process.env.API_URL}:${process.env.API_PORT}`;

export const state = (): RootState => ({
  movies: [],
  shows: [],
  searchResults: [],
  isSearching: false,
  jwt: ''
});

export const mutations: MutationTree<RootState> = {
  setMovies(rootState: RootState, movies: Media[]): void {
    rootState.movies = movies;
  },

  setShows(rootState: RootState, shows: Media[]): void {
    rootState.shows = shows;
  },

  setAll(rootState: RootState, episodes: FrontMedia): void {
    rootState.movies = episodes.movies;
    rootState.shows = episodes.shows;
  },

  resetSearch(rootState: RootState): void {
    rootState.searchResults = [];
  },

  setSearch(rootState: RootState, results: Media[]): void {
    rootState.searchResults = results;
  },

  setIsSearching(rootState: RootState, isSearching: boolean): void {
    rootState.isSearching = isSearching;
  },

  setJwt(rootState: RootState, jwt: string): void {
    rootState.jwt = jwt;
  }
};

export const actions: ActionTree<RootState, any> = {

  async GET({ commit }) {
    try {
      const episodes = await this.$axios.$get(`${API}/media`);
      commit('setAll', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_DOCS({ commit }) {
    try {
      const episodes = await this.$axios.$get(`${API}/media/docs`);
      commit('setShows', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_MOVIES({ commit }) {
    try {
      const episodes = await this.$axios.$get(`${API}/media/movies`);
      commit('setMovies', episodes);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_ID(_, id) {
    try {
      return await this.$axios.$get(`${API}/media/find/${id}`);
    } catch (e) {
      console.log(e);
    }
  },

  async RESET_SEARCH({ commit }) {
    commit('resetSearch');
  },

  async SEARCH({ commit }, query) {
    try {
      commit('setIsSearching', true);
      const results = await this.$axios.$post(`${API}/media/search`, query);
      commit('setSearch', results);
      commit('setIsSearching', false);
    } catch (e) {
      console.log(e);
    }
  },

  async GET_JWT(store, showId) {
    try {
      if (!store.state.jwt) {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const result = await this.$axios.$get(`${corsProxy}https://api.rtvslo.si/ava/getRecordingDrm/${showId}?client_id=82013fb3a531d5414f478747c1aca622`,
          { headers: { 'Access-Control-Allow-Headers': 'Origin' } }
        );
        const jwt = result.response.jwt;
        store.commit('setJwt', jwt);
        return jwt;
      }
      return store.state.jwt;
    } catch (e) {
      console.log(e);
    }
  },

};

export const getters: GetterTree<RootState, any> = {

  getShowById: (rootState: RootState) => (id: number) => {
    return rootState.shows.concat(rootState.movies).find(show => show.recordingId === id);
  },

  allShowsLoaded: (rootState: RootState) => () => {
    return !!rootState.shows.length && !!rootState.movies.length;
  },

  totalShowsLoaded: (rootState: RootState) => () => {
    return rootState.shows.length > 16;
  },

  totalMoviesLoaded: (rootState: RootState) => () => {
    return rootState.movies.length > 16;
  }

};
