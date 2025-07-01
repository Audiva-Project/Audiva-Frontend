import { Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/pages/HomePage"
import DiscoverPage from "@/pages/DiscoverPage"
import ArtistsPageById from "@/pages/ArtistsPageById"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import ArtistPage from "./pages/ArtistPage"
import AboutPage from "./pages/AboutPage"
import AlbumPage from "./pages/AlbumPage"
import UploadPage from "./pages/UploadPage"
import RecentlyAddedPage from "./pages/RecentlyAddedPage"
import HistoryPage from "./pages/HistoryPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="artists/:id" element={<ArtistsPageById />} />
        <Route path="artists" element={<ArtistPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="about" element={<AboutPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="albums" element={<AlbumPage />} />
        <Route path="recently-added" element={<RecentlyAddedPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>
    </Routes>
  )
}

export default App
