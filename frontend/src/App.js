import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";

import { AuthProvider } from "./lib/auth";
import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Education from "./pages/Education";
import People from "./pages/People";
import Publications from "./pages/Publications";
import Partnerships from "./pages/Partnerships";
import News from "./pages/News";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminApp from "./pages/AdminApp";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const PublicLayout = () => (
  <>
    <Nav />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="bottom-right" richColors />
        <SmoothScroll>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/research" element={<Research />} />
              <Route path="/education" element={<Education />} />
              <Route path="/people" element={<People />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/news" element={<News />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
