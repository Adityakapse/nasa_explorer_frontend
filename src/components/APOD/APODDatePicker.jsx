const APODDatePicker = ({ date, onChange, onSubmit, onReset }) => (
  <form onSubmit={onSubmit} className="flex gap-3 mb-8">
    <input
      type="date"
      value={date}
      onChange={(e) => onChange(e.target.value)}
      max={new Date().toISOString().split('T')[0]}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
    >
      Search
    </button>
    <button
      type="button"
      onClick={onReset}
      className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
    >
      Today
    </button>
  </form>
);

export default APODDatePicker;
