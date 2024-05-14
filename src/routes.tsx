import React, { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Routes/Home";
import About from "./Routes/About";
import Contato from "./Routes/Contato";
import NotFound from "./Routes/NotFound";
import Header from "./components/surfaces/Header";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contato />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
