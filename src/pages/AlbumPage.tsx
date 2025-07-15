import AlbumSection from "@/components/sections/AlbumSection";
import Banner from "@/components/sections/Banner";
import "@/components/sections/SongsSection.css";

const AlbumPage = () => {
  const albumIds = [1, 2, 3];
  return (
    <div className="album-page">
      <Banner
        title="Thư Viện Album"
        subtitle="Khám phá những album hay nhất từ các nghệ sĩ yêu thích của bạn"
        variant="album"
      />
      {albumIds.map((id) => (
        <AlbumSection key={id} albumId={id} />
      ))}
    </div>
  );
};

export default AlbumPage;
