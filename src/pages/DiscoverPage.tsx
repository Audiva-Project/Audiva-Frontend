import MusicGenres from "@/components/sections/MusicGenres";
import NewReleaseSongs from "@/components/sections/NewReleaseSongs";
import PopularArtist from "@/components/sections/PopularArtist";
import { useArtists } from "@/hooks/useArtists";

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
