import HeroSection from "@/components/sections/HeroSection"
import WeeklyTopSongs from "@/components/sections/WeeklyTopSongs"
import NewReleaseSongs from "@/components/sections/NewReleaseSongs"
import TrendingSongs from "@/components/sections/TrendingSongs"
import "./HomePage.css"
import PopularArtist from "@/components/sections/PopularArtist"
import api from "@/utils/api"
import { useState, useEffect } from "react"

const HomePage = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/identity/artists", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGluaC5jb20iLCJzdWIiOiJBRE1JTiIsImV4cCI6MTc1NDA1OTMzNSwiaWF0IjoxNzUwODE5MzM1LCJqdGkiOiI3NjJhMTY1MC0wM2Q3LTRmOTAtODMzZi05MzA1YmY4ZmI5NWQiLCJzY29wZSI6IlJPTEVfQURNSU4gQ1JFQVRFX0RBVEEgQVBQUk9WRV9QT1NUIn0.dpZd1rxKhTJiTLDCbJ0-jLBCnLeXtvjteEBPCKeU2GXD6osSfl1znuPrFA5inZv8nUu2rL9DzdbdyWyvhxN0_Q"
        }}
        )
        setArtists(response.data)
        console.log("Artists fetched successfully:", response.data)
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
