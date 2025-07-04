import HeroSection from "@/components/sections/HeroSection"
import WeeklyTopSongs from "@/components/sections/WeeklyTopSongs"
import NewReleaseSongs from "@/components/sections/NewReleaseSongs"
import TrendingSongs from "@/components/sections/TrendingSongs"
import "./HomePage.css"
import PopularArtist from "@/components/sections/PopularArtist"
import api from "@/utils/api"
import { useState, useEffect } from "react"
import { useAuthStore } from "@/stores/authStore"
import type { AuthState } from "@/stores/authStore"

type Artist = {
  id: string
  name: string
  // add other relevant fields based on your API response
}

const HomePage = () => {
  const [artists, setArtists] = useState<Artist[]>([])
  // const token = useAuthStore((state: AuthState) => state.token)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/identity/artists")
        setArtists(response.data as Artist[])
      } catch (error) {
        console.error("Error fetching artists:", error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="home-page">
      {/* <HeroSection /> */}
      <WeeklyTopSongs />
      {/* <NewReleaseSongs /> */}
      <TrendingSongs />
      <PopularArtist title={{ main: "Popular", highlight: "Artists" }} artists={artists} />
    </div>
  )
}

export default HomePage
