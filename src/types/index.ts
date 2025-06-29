export interface Song {
  id: string
  title: string
  artist: string
  album: string
  thumbnailUrl: string
  audioUrl: string
  duration: string
  releaseDate: string
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
}
