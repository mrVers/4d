import { Media } from '~/types/index';

export interface RootState {
  movies: Media[];
  shows: Media[];
}

export interface FrontMedia {
  movies: Media[];
  shows: Media[];
}
