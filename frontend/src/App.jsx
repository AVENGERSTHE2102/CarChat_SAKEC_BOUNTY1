import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Paths from './pages/Paths';
import Roadmaps from './pages/Roadmaps';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="paths" element={<Paths />} />
          <Route path="roadmaps" element={<Roadmaps />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
