import React from "react";
import Home from "./components/home/Home";
import Access from "./components/access/Access";
import Navbar from "./components/navbar/Navbar";
import Film from "./components/film/Film"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />}/>
            <Route path="/access" element={<Access />}/>
            <Route path="/film/:id" components={Film}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
