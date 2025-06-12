import HeroSection from "@/components/sections/HeroSection"
import WeeklyTopSongs from "@/components/sections/WeeklyTopSongs"
import NewReleaseSongs from "@/components/sections/NewReleaseSongs"
import TrendingSongs from "@/components/sections/TrendingSongs"
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <WeeklyTopSongs />
      <NewReleaseSongs />
      <TrendingSongs />
    </div>
  )
}

export default HomePage
