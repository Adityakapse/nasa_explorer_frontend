import { useState } from "react";
import { fetchNeoWs } from "../../services/nasaService";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const Asteroids = () => {
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(weekAgo);
  const [endDate, setEndDate] = useState(today);
  const [applied, setApplied] = useState({ start: weekAgo, end: today });
  const [validationError, setValidationError] = useState("");

  const { data, loading, error } = useFetch(fetchNeoWs, [
    applied.start,
    applied.end,
  ]);

  const asteroids = data ? Object.values(data.near_earth_objects).flat() : [];
  const hazardous = asteroids.filter(
    (a) => a.is_potentially_hazardous_asteroid,
  );
  const safe = asteroids.filter((a) => !a.is_potentially_hazardous_asteroid);

  // Chart 1: diameter bar chart (top 10)
  const diameterData = asteroids.slice(0, 10).map((a) => ({
    name: a.name.replace(/[()]/g, "").slice(0, 12),
    diameter: parseFloat(
      a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3),
    ),
  }));

  // Chart 2: hazardous pie chart
  const pieData = [
    { name: "Safe", value: safe.length },
    { name: "Hazardous", value: hazardous.length },
  ];

  // Chart 3: asteroids per day
  const perDayData = data
    ? Object.entries(data.near_earth_objects)
        .map(([date, items]) => ({
          date: date.slice(5),
          count: items.length,
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const handleClick = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = (end - start) / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      setValidationError("Date range cannot exceed 7 days");
      return;
    }
    if (end < start) {
      setValidationError("End date must be after start date.");
      return;
    }

    setValidationError("");
    setApplied({ start: startDate, end: endDate });
  };

  // Chart 4: miss distance (top 10)
  const distanceData = asteroids.slice(0, 10).map((a) => ({
    name: a.name.replace(/[()]/g, "").slice(0, 12),
    distance: parseFloat(
      (a.close_approach_data[0].miss_distance.kilometers / 1000000).toFixed(2),
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Near-Earth Asteroid Dashboard</h1>
      <p className="text-gray-400 mb-6">
        Multi-panel analysis of asteroids passing close to Earth
      </p>

      {/* Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
        >
          Search
        </button>
      </div>
      {validationError && (
        <p className="text-yellow-400 mb-4">⚠ {validationError}</p>
      )}

    
      {loading && <Loader />}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && data && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-blue-400">
                {asteroids.length}
              </p>
              <p className="text-gray-400 mt-1">Total Asteroids</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-red-400">
                {hazardous.length}
              </p>
              <p className="text-gray-400 mt-1">Potentially Hazardous</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-green-400">{safe.length}</p>
              <p className="text-gray-400 mt-1">Non-Hazardous</p>
            </div>
          </div>

          {/* Row 2: Diameter + Pie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Estimated Diameter — Top 10 (km)
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={diameterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="diameter"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    name="Diameter (km)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Hazardous vs Safe</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "#10B981" : "#EF4444"} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 3: Per Day + Miss Distance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Asteroids Per Day</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={perDayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6" }}
                    name="Asteroids"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Miss Distance — Top 10 (million km)
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={distanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    type="number"
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="distance"
                    fill="#F59E0B"
                    radius={[0, 4, 4, 0]}
                    name="Distance (M km)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
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
                    <tr
                      key={a.id}
                      className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-3 pr-4">{a.name}</td>
                      <td className="py-3 pr-4">
                        {a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                          3,
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {parseFloat(
                          a.close_approach_data[0].miss_distance.kilometers,
                        ).toLocaleString()}
                      </td>
                      <td className="py-3 pr-4">
                        {a.close_approach_data[0].close_approach_date}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${a.is_potentially_hazardous_asteroid ? "bg-red-900 text-red-300" : "bg-green-900 text-green-300"}`}
                        >
                          {a.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Asteroids;
