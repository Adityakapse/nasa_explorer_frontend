import { useState } from 'react';
import { fetchMarsPhotos } from '../../services/nasaService';
import Loader from '../../components/Loader/Loader';
import useFetch from '../../hooks/useFetch';

const ROVERS = ['curiosity', 'opportunity', 'spirit'];
const CAMERAS = {
  curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
  opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
  spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
};

const Mars = () => {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(3000);
  const [applied, setApplied] = useState({ rover: 'curiosity', sol: 3000, camera: '' });
  const [camera, setCamera] = useState('');
  const [selected, setSelected] = useState(null);

  const { data, loading, error } = useFetch(fetchMarsPhotos, [
    applied.rover,
    applied.sol,
    applied.camera,
  ]);

  const photos = data?.photos || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Mars Rover Photos</h1>
      <p className="text-gray-400 mb-6">Browse photos taken by NASA's Mars rovers</p>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          value={rover}
          onChange={(e) => { setRover(e.target.value); setCamera(''); }}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          {ROVERS.map((r) => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>

        <select
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Cameras</option>
          {CAMERAS[rover].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          value={sol}
          onChange={(e) => setSol(e.target.value)}
          placeholder="Sol (Martian day)"
          min={0}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-44"
        />

        <button
          onClick={() => setApplied({ rover, sol, camera })}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
        >
          Search
        </button>
      </div>

      {/* Active filters info */}
      <p className="text-gray-500 text-sm mb-6">
        Showing: <span className="text-gray-300">{applied.rover}</span> · Sol <span className="text-gray-300">{applied.sol}</span> · Camera: <span className="text-gray-300">{applied.camera || 'All'}</span>
      </p>

      {loading && <Loader />}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && photos.length === 0 && !error && (
        <p className="text-gray-400">No photos found for this combination. Try a different sol or camera.</p>
      )}

      {/* Photo Grid */}
      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelected(photo)}
            >
              <img src={photo.img_src} alt={photo.id} className="w-full h-48 object-cover" />
              <div className="p-3">
                <p className="text-xs text-gray-400">{photo.camera.full_name}</p>
                <p className="text-xs text-gray-500">{photo.earth_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.img_src} alt={selected.id} className="w-full max-h-[70vh] object-contain" />
            <div className="p-6">
              <p className="font-semibold text-lg">{selected.camera.full_name}</p>
              <p className="text-gray-400 text-sm">Rover: {selected.rover.name} · Sol: {selected.sol} · Earth date: {selected.earth_date}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mars;
