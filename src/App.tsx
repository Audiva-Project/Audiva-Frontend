import { Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/pages/HomePage"
import DiscoverPage from "@/pages/DiscoverPage"
import ArtistsPage from "@/pages/ArtistsPage"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="artists" element={<ArtistsPage />} />
      </Route>
    </Routes>
  )
}

export default App
