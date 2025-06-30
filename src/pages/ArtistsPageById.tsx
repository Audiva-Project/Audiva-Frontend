import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArtistImageSection from '@/components/sections/ArtistImageSection'
import PlaylistSection from '@/components/sections/PlaylistSection'
import PopularArtist from '@/components/sections/PopularArtist'
import PopularSong from '@/components/sections/PopularSong'
import TopAlbums from '@/components/sections/TopAlbums'
import { artist, playlists } from '@/data/mockData'
import { Artist } from '@/types'




export default function ArtistsPageById() {
  const { id } = useParams<{ id: string }>()
  const [artistData, setArtistData] = useState<Artist | null>(null)

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:8080/identity/artists/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGluaC5jb20iLCJzdWIiOiJodXkyIiwiZXhwIjoxNzU0MzM5MTIwLCJpYXQiOjE3NTEwOTkxMjAsImp0aSI6IjI1ZWNiOTBmLWI1NGQtNDE4OC04OWVjLWI2MDkxMzMyM2NkOSIsInNjb3BlIjoiIn0.Gma3ok8K54kAc9UJLm94PIpxDX_qCkr7lyEBo60rKT7cMoFsAHVBXD1kQGiq2FW18VUojn5zxmRVylSW2wAarw`
          }
        })
        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()
        setArtistData(data)

      } catch (error) {
        console.error('Error fetching artist:', error)
      }
    }

    if (id) fetchArtist()
  }, [id])

  if (!artistData) return <p>Loading artist...</p>

  return (
    <div className="page-container">
      <ArtistImageSection
        imgUrl={`http://localhost:8080/identity/audio/${artistData.avatar}`}
        name={artistData.name}
      />
      <PopularSong
        songs={artistData.albums.flatMap(album =>
          album.songs.map(song => ({
            ...song,
            album: album.title, // Gán tên album
          }))
        )}
      />
      <PlaylistSection title={{ main: "Artist's ", highlight: "Playlist" }} playlists={playlists} />
      <TopAlbums albums={artistData.albums} />
      <PopularArtist
        title={{
          main: `${artistData.name} Fans `,
          highlight: "Also Listen To"
        }}
        artists={artist} />
    </div>
  )
}
