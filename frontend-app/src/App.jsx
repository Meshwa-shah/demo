import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import City from "./pages/City";
import Category from "./pages/Category";
import CategoryFaq from "./pages/CategoryFaq";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import VideoGallery from './pages/VideoGallery'
import Testimonials from "./pages/Testimonials";
import Offer from "./pages/Offer";
import Inquiry from "./pages/Inquiry";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import Redirection from "./pages/Redirection";
import Login from "./Login";
import Media from "./pages/Media";
import OurFact from "./pages/OurFact";
import Cms from "./pages/Cms";
import CommentsSection from "./pages/comments";
import Signin from "./Signin";
import Clinic from "./pages/OurClinic";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="city" element={<City />} />
        <Route path="category" element={<Category />} />
        <Route path="category-faq" element={<CategoryFaq />} />
        <Route path="blog" element={<Blog />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="videogallery" element={<VideoGallery />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="offer" element={<Offer />} />
        <Route path="inquiry" element={<Inquiry />} />
        <Route path="services" element={<Services />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="redirection" element={<Redirection />} />
        <Route path="comments/:id" element={<CommentsSection />} />
        <Route path="media" element={<Media />} />
        <Route path="our-fact" element={<OurFact />} />
        <Route path="our-clinic" element={<Clinic />} />
        <Route path="cms" element={<Cms />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="Signup" element={<Signin/>} />
    </Routes>
  );
}
