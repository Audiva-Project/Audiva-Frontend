import "./SongsSection.css"
import AlbumSection from "./AlbumSection"

const WeeklyTopSongs = () => {
  const albumIds = [1, 2, 3]
  return (
    <div>
      {albumIds.map(id => (
        <AlbumSection key={id} albumId={id} />
      ))}
    </div>
  );
};

export default WeeklyTopSongs;
