import { Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/pages/HomePage"
import DiscoverPage from "@/pages/DiscoverPage"
import ArtistsPageById from "@/pages/ArtistsPageById"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import ArtistPage from "./pages/ArtistPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="artists/:id" element={<ArtistsPageById />} />
        <Route path="artists" element={<ArtistPage/>} />
      </Route>
    </Routes>
  )
}

export default App
