import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import DiscoverPage from "@/pages/DiscoverPage";
import ArtistsPageById from "@/pages/ArtistsPageById";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ArtistPage from "./pages/ArtistPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PremiumPage from "./pages/PremiumPage";
import ThanksPage from "./pages/thanks-page";
import UserProfile from "./components/UserProfile";

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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
