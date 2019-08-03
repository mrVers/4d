export interface Media {
  title: string;
  link: string;
  recordingId: number;
  description: string;
  response: any;
}

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
