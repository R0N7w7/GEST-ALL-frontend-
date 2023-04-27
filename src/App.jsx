// import NavBar from './components/nav';
import { React, useState } from 'react';


import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/*' element={<MainLayout />} />
      </Routes>
    </div>
  )
}

export default App;
