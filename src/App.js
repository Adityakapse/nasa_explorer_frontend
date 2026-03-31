import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import APOD from './pages/APOD/APOD';
import Asteroids from './pages/Asteroids/Asteroids';
import NasaImageLibrary from './pages/Image/Image';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/asteroids" element={<Asteroids />} />
        <Route path="/image" element={<NasaImageLibrary />} />
      </Routes>
    </main>

      </div>
    </BrowserRouter>
  );
};

export default App;
