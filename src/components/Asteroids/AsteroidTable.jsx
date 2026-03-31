const AsteroidTable = ({ asteroids }) => (
  <div className="bg-gray-800 rounded-2xl p-6">
    <h2 className="text-lg font-semibold mb-4">Full Asteroid List</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="text-left py-3 pr-4">Name</th>
            <th className="text-left py-3 pr-4">Diameter (km)</th>
            <th className="text-left py-3 pr-4">Miss Distance (km)</th>
            <th className="text-left py-3 pr-4">Close Approach</th>
            <th className="text-left py-3">Hazardous</th>
          </tr>
        </thead>
        <tbody>
          {asteroids.map((a) => (
            <tr key={a.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-3 pr-4">{a.name}</td>
              <td className="py-3 pr-4">{a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)}</td>
              <td className="py-3 pr-4">{parseFloat(a.close_approach_data[0].miss_distance.kilometers).toLocaleString()}</td>
              <td className="py-3 pr-4">{a.close_approach_data[0].close_approach_date}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${a.is_potentially_hazardous_asteroid ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                  {a.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AsteroidTable;
