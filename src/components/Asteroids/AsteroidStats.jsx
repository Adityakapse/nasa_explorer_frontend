const AsteroidStats = ({ total, hazardous, safe }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-gray-800 rounded-2xl p-6 text-center">
      <p className="text-4xl font-bold text-blue-400">{total}</p>
      <p className="text-gray-400 mt-1">Total Asteroids</p>
    </div>
    <div className="bg-gray-800 rounded-2xl p-6 text-center">
      <p className="text-4xl font-bold text-red-400">{hazardous}</p>
      <p className="text-gray-400 mt-1">Potentially Hazardous</p>
    </div>
    <div className="bg-gray-800 rounded-2xl p-6 text-center">
      <p className="text-4xl font-bold text-green-400">{safe}</p>
      <p className="text-gray-400 mt-1">Non-Hazardous</p>
    </div>
  </div>
);

export default AsteroidStats;
