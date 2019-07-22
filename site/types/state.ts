import { Media } from '~/types/index';

export interface RootState {
  movies: Media[];
  shows: Media[];
  searchResults: Media[];
  isSearching: boolean;
}

export interface FrontMedia {
  movies: Media[];
  shows: Media[];
}
