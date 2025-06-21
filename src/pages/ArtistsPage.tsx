import ArtistImageSection from '@/components/sections/ArtistImageSection';
import PlaylistSection from '@/components/sections/PlaylistSection';
import PopularArtist from '@/components/sections/PopularArtist';
import PopularSong from '@/components/sections/PopularSong';
import TopAlbums from '@/components/sections/TopAlbums';
import { artist, playlists } from '@/data/mockData';
import { artistImages } from '@/data/mockData';

const ArtistsPage = () => {
  return (
    <div className="page-container">
      <ArtistImageSection name={artistImages[0].name} imageUrl={artistImages[0].imageUrl} />
      <PopularSong />
      <PlaylistSection title={{ main: "Artist's ", highlight: "Playlist" }} playlists={playlists} />
      <TopAlbums />
      <PopularArtist title={{ main: "Eminem Fans ", highlight: "Also Listen To" }} artists={artist} />
    </div>
  )
}

export default ArtistsPage
