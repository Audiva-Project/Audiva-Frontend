import MusicGenres from "@/components/sections/MusicGenres"
import NewReleaseSongs from "@/components/sections/NewReleaseSongs"
import PlaylistSection from "@/components/sections/PlaylistSection"
import PopularArtist from "@/components/sections/PopularArtist"
import TopAlbums from "@/components/sections/TopAlbums"
import { artist, playlists } from "@/data/mockData"

const DiscoverPage = () => {
  return (
    <div className="page-container">
        <MusicGenres /> 
        <PlaylistSection  title={{ main: "Chill", highlight: "Mood" }} playlists={playlists}  />
        <PopularArtist title={{ main: "Popular", highlight: "Artists" }} artists={artist} />
        <NewReleaseSongs />
        <TopAlbums />
    </div>
  )
}

export default DiscoverPage
