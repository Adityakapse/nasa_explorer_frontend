import { useState } from 'react';
import { fetchNeoWs } from '../../services/nasaService';
import Loader from '../../components/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import AsteroidFilters from '../../components/Asteroids/AsteroidFilters';
import AsteroidStats from '../../components/Asteroids/AsteroidStats';
import DiameterChart from '../../components/Asteroids/DiameterChart';
import HazardousPieChart from '../../components/Asteroids/HazardousPieChart';
import PerDayChart from '../../components/Asteroids/PerDayChart';
import MissDistanceChart from '../../components/Asteroids/MissDistanceChart';
import AsteroidTable from '../../components/Asteroids/AsteroidTable';

const Asteroids = () => {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(weekAgo);
  const [endDate, setEndDate] = useState(today);
  const [applied, setApplied] = useState({ start: weekAgo, end: today });
  const [validationError, setValidationError] = useState('');

  const { data, loading, error } = useFetch(fetchNeoWs, [applied.start, applied.end]);

  const asteroids = data ? Object.values(data.near_earth_objects).flat() : [];
  const hazardous = asteroids.filter((a) => a.is_potentially_hazardous_asteroid);
  const safe = asteroids.filter((a) => !a.is_potentially_hazardous_asteroid);

  const diameterData = asteroids.slice(0, 10).map((a) => ({
    name: a.name.replace(/[()]/g, '').slice(0, 12),
    diameter: parseFloat(a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)),
  }));

  const pieData = [
    { name: 'Safe', value: safe.length },
    { name: 'Hazardous', value: hazardous.length },
  ];

  const perDayData = data
    ? Object.entries(data.near_earth_objects)
        .map(([date, items]) => ({ date: date.slice(5), count: items.length }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const distanceData = asteroids.slice(0, 10).map((a) => ({
    name: a.name.replace(/[()]/g, '').slice(0, 12),
    distance: parseFloat((a.close_approach_data[0].miss_distance.kilometers / 1000000).toFixed(2)),
  }));

  const handleSearch = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = (end - start) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) { setValidationError('Date range cannot exceed 7 days'); return; }
    if (end < start) { setValidationError('End date must be after start date.'); return; }
    setValidationError('');
    setApplied({ start: startDate, end: endDate });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Near-Earth Asteroid Dashboard</h1>
      <p className="text-gray-400 mb-6">Multi-panel analysis of asteroids passing close to Earth</p>
      <AsteroidFilters
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
        onSearch={handleSearch}
        validationError={validationError}
      />
      {loading && <Loader />}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && data && (
        <>
          <AsteroidStats total={asteroids.length} hazardous={hazardous.length} safe={safe.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DiameterChart data={diameterData} />
            <HazardousPieChart data={pieData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <PerDayChart data={perDayData} />
            <MissDistanceChart data={distanceData} />
          </div>
          <AsteroidTable asteroids={asteroids} />
        </>
      )}
    </div>
  );
};

export default Asteroids;
