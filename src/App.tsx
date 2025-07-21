import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import ArtistsPageById from "@/pages/ArtistsPageById";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ArtistPage from "./pages/ArtistPage";
import AboutPage from "./pages/AboutPage";
import AlbumPage from "./pages/AlbumPage";
import UploadPage from "./pages/UploadPage";
import RecentlyAddedPage from "./pages/RecentlyAddedPage";
import HistoryPage from "./pages/HistoryPage";
import PlaylistPage from "./pages/PlaylistPage";
import SongInPlaylistPage from "./pages/SongInPlaylistPage";
import PremiumPage from "./pages/PremiumPage";
import ThanksPage from "./pages/thanks-page";
import UserProfile from "./components/UserProfile";
import SearchPage from "./pages/SearchPage";
import SongInAlbumPage from "./pages/SongInAlbumPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="artists/:id" element={<ArtistsPageById />} />
        <Route path="artists" element={<ArtistPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="about" element={<AboutPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="albums" element={<AlbumPage />} />
        <Route path="recently-added" element={<RecentlyAddedPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="playlist" element={<PlaylistPage />} />
        <Route path="playlist/:id" element={<SongInPlaylistPage />} />
        <Route path="albums/:id" element={<SongInAlbumPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
