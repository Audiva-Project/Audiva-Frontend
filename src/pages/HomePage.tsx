import TrendingSongs from "@/components/sections/TrendingSongs"
import "./HomePage.css"
import PopularArtist from "@/components/sections/PopularArtist"
import SuggestSongSection from "@/components/sections/SuggestSongSection"
import TopAlbums from "@/components/sections/TopAlbums"
import { useArtists } from "@/hooks/useArtists"
import { useAlbums } from "@/hooks/useAlbums"


const HomePage = () => {
  const artists = useArtists();
  const albums = useAlbums();

  return (
    <div className="home-page">
      <SuggestSongSection />
      <TopAlbums
        albums={albums}
        title="Nhạc Việt" />
      <TopAlbums
        albums={albums}
        title="Top 100" />
      <TrendingSongs />
      {/* <PopularArtist title={{ main: "Popular", highlight: "Artists" }}
        artists={artists} /> */}
    </div>
  )
}

export default HomePage
