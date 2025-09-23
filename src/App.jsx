
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Works from "./pages/Works.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
