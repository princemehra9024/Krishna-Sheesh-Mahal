import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollEngine } from "./hooks/useScrollEngine";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PopupModal from "./components/PopupModal";
import BookNowPopover from "./components/BookNowPopover";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import Banquet from "./pages/Banquet";

function ScrollRevealHandler() {
  useScrollReveal();
  return null;
}

export default function App() {
  useScrollEngine();

  const [bookOpen, setBookOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openBook = useCallback(() => setBookOpen(true), []);
  const closeBook = useCallback(() => setBookOpen(false), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // Exit-intent "Join Our Community" popup (once per session) — mirrors data-modal-exit-intent
  useEffect(() => {
    if (sessionStorage.getItem("tpuh-popup-shown")) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !document.body.classList.contains("menu-open")) {
        sessionStorage.setItem("tpuh-popup-shown", "1");
        setModalOpen(true);
        document.removeEventListener("mouseout", onLeave);
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseout", onLeave), 5000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollRevealHandler />
      <div className="page-wrap" id="top">
        <Header onBookNow={openBook} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/banquet" element={<Banquet />} />
        </Routes>
      </div>
      <Footer />
      <BookNowPopover open={bookOpen} onClose={closeBook} />
      <PopupModal open={modalOpen} onClose={closeModal} />
      <CustomCursor />
    </BrowserRouter>
  );
}
