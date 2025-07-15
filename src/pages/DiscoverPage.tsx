import MusicGenres from "@/components/sections/MusicGenres";
import NewReleaseSongs from "@/components/sections/NewReleaseSongs";
import PopularArtist from "@/components/sections/PopularArtist";
<<<<<<< HEAD
import { useArtists } from "@/hooks/useArtists";
=======
import TopAlbums from "@/components/sections/TopAlbums";
import { artist, albums } from "@/data/mockData";
>>>>>>> c0e832ac768acf1ed0ac675b1767b24540ea0898

const DiscoverPage = () => {
  const artists = useArtists();

  return (
    <div className="page-container">
      <MusicGenres />
      <PopularArtist
        title={{ main: "Popular", highlight: "Artists" }}
        artists={artists}
      />
      <NewReleaseSongs />
    </div>
  );
};

export default DiscoverPage;
