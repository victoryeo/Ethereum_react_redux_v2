import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes, Link } 
       from "react-router-dom";
import ViewTransactions from "./components/ViewTransactions";
import Home from "./components/Home";

function App() {

  let routes = (
    <Routes>
      <Route index element={<Home />} />
      <Route path="viewTransactions/:account" 
        element={<ViewTransactions />} />
    </Routes>
  )

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

export default App;
