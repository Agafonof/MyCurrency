import React from 'react';

import { Route, Routes } from 'react-router-dom';
import ConverterPage from './components/pages/ConverterPage';
import MainPage from './components/pages/MainPage';
import NavBar from './components/UI/NavBar';

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/converter" element={<ConverterPage />} />
      </Routes>
    </>
  );
}

export default App;
