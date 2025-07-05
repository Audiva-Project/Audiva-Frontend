import AlbumSection from "@/components/sections/AlbumSection";
import "@/components/sections/SongsSection.css"

const AlbumPage = () => {
  const albumIds = [1, 2, 3, 7]; 
  return (
    <div>
      {albumIds.map(id => (
        <AlbumSection key={id} albumId={id} />
      ))}
    </div>
  );
};

export default AlbumPage;
