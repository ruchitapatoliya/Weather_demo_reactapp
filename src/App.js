import React, { useState } from 'react';
import Weather from './Pages/weather';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
const api = {
  key: "6c80be516ad36906e18afbacde716ae5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/weather' Component={Weather} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
