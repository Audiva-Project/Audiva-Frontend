import { useEffect, useState } from "react"
import api from "@/utils/api"

export type Artist = {
  id: string
  name: string
}

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/identity/artists")
        setArtists(response.data as Artist[])
      } catch (err) {
        console.error("Error fetching artists:", err)
      }
    }
    fetchArtists()
  }, [])

  return artists
}
