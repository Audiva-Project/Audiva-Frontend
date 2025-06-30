export interface Song {
  id: string
  title: string
  artist: string
  album: string
  thumbnailUrl: string
  audioUrl: string
  duration: string
  releaseDate: string
  artists: {
    id: number;
    name: string;
  }[];
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string
  songs: Song[]
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  playlists: Playlist[]
  likedSongs: Song[]
  token?: string
}

export interface Album {
  id: number;
  title: string;
  thumbnailUrl: string;
  releaseDate: string;
  artistId: number;
  artistName: string;
  songIds: number[];
  songs: Song[];
}

export interface Artist {
  id: number;
  name: string;
  avatar: string;
  albums: Album[];
}