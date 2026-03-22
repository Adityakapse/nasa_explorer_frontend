import { useState } from 'react';
import { fetchAPOD } from '../../services/nasaService';
import Loader from '../../components/Loader/Loader';
import useFetch from '../../hooks/useFetch';

const APOD = () => {
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const { data, loading, error } = useFetch(fetchAPOD, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedDate(date);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Astronomy Picture of the Day</h1>
      <p className="text-gray-400 mb-6">NASA's daily featured space image or video</p>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          onClick={() => { setDate(''); setSelectedDate(''); }}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
        >
          Today
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className="text-red-400">{error}</p>}

      {data && !loading && (
        <div className="bg-gray-800 rounded-2xl overflow-hidden">
            {data.media_type === 'video' ? (
            data.url.includes('youtube') || data.url.includes('vimeo') ? (
                <iframe
                src={data.url}
                title={data.title}
                className="w-full h-96"
                allowFullScreen
                />
            ) : (
                <video controls className="w-full max-h-96">
                <source src={data.url} />
                </video>
            )
            ) : (
            <img src={data.url} alt={data.title} className="w-full object-cover max-h-[600px]" />
            )}

          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-semibold">{data.title}</h2>
              <span className="text-gray-400 text-sm">{data.date}</span>
            </div>
            {data.copyright && (
              <p className="text-gray-500 text-sm mb-3">© {data.copyright}</p>
            )}
            <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default APOD;
