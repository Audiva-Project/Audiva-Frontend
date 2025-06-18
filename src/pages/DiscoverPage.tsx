import MusicGenres from "@/components/sections/MusicGenres"
import NewReleaseSongs from "@/components/sections/NewReleaseSongs"
import PlaylistSection from "@/components/sections/PlaylistSection"
import PopularArtist from "@/components/sections/PopularArtist"
import TopAlbums from "@/components/sections/TopAlbums"

const DiscoverPage = () => {
  return (
    <div className="page-container">
        <MusicGenres /> 
        <PlaylistSection />
        <PopularArtist />
        <NewReleaseSongs />
        <TopAlbums />
    </div>
  )
}

export default DiscoverPage
