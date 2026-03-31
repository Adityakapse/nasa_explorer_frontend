const AsteroidFilters = ({ startDate, endDate, onStartChange, onEndChange, onSearch, validationError }) => (
  <div className="mb-8">
    <div className="flex gap-3 flex-wrap">
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
      >
        Search
      </button>
    </div>
    {validationError && (
      <p className="text-yellow-400 mt-3">⚠ {validationError}</p>
    )}
  </div>
);

export default AsteroidFilters;
