import { useState } from 'react';
import { fetchAPOD } from '../../services/nasaService';
import Loader from '../../components/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import APODDatePicker from '../../components/APOD/APODDatePicker';
import APODMediaCard from '../../components/APOD/APODMediaCard';

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
      <h1 className="text-4xl font-bold mb-2 gradient-heading">Astronomy Picture of the Day</h1>
      <p className="text-gray-400 mb-6">NASA's daily featured space image or video</p>
      <APODDatePicker
        date={date}
        onChange={setDate}
        onSubmit={handleSubmit}
        onReset={() => { setDate(''); setSelectedDate(''); }}
      />
      {loading && <Loader />}
      {error && <p className="text-red-400">{error}</p>}
      {data && !loading && <APODMediaCard data={data} />}
    </div>
  );
};

export default APOD;
