const ImageSearchBar = ({ query, onChange, onSearch }) => (
  <div className="flex gap-3 mb-4 flex-wrap">
    <input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      placeholder="Search (e.g. mars, apollo, saturn...)"
      className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 flex-1 min-w-60"
    />
    <button
      onClick={onSearch}
      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
    >
      Search
    </button>
  </div>
);

export default ImageSearchBar;
