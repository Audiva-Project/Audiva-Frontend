import "./HeroSection.css"

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          All the <span className="hero-highlight">Best Songs</span>
          <br />
          in One Place
        </h1>
        <p className="hero-description">
          On our website, we've got an amazing collection of songs, all in one place. You can listen to your favorite
          songs, create playlists, and discover new music.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary hero-btn">Discover Now</button>
          <button className="btn btn-secondary hero-btn">Create Playlist</button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src=""
          alt="Woman listening to music with headphones"
          className="hero-img"
        />
      </div>
    </section>
  )
}

export default HeroSection
