import React from "react";
import Home from "./components/home/Home";
import Access from "./components/access/Access";
import Navbar from "./components/navbar/Navbar";
import Film from "./components/film/Film";
import Payment from "./components/payment/Payment";
import {Personal} from "./components/personal/Personal"
import Films_Result from "./components/films_result/Films_Result";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />}/>
            <Route path="/access" element={<Access />}/>
            <Route path="/personal" element={<Personal />}/>
            <Route path="/film/:id" element={<Film />}/>
            <Route path="/films/:t/:param" element={<Films_Result />}/>
            <Route path="/payment" element={<Payment/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
