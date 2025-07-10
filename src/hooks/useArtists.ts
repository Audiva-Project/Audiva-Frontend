import { useEffect, useState } from "react"
import api from "@/utils/api"
import { Artist } from "@/types";

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);

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
