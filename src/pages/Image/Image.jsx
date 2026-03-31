import { useState, useEffect } from 'react';
import { fetchNasaImages } from '../../services/nasaService';
import Loader from '../../components/Loader/Loader';
import ImageSearchBar from '../../components/ImageLibrary/ImageSearchBar';
import ImageGrid from '../../components/ImageLibrary/ImageGrid';
import ImageLightbox from '../../components/ImageLibrary/ImageLightbox';
import ImagePagination from '../../components/ImageLibrary/ImagePagination';

const NasaImageLibrary = () => {
  const [query, setQuery] = useState('mars');
  const [appliedQuery, setAppliedQuery] = useState('mars');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      console.log('Fetching:', appliedQuery, 'page:', page);
      setLoading(true);
      setError(null);
      try {
        const response = await fetchNasaImages(appliedQuery, page);
        console.log('Response items:', response.data.data?.items?.length, 'hits:', response.data.data?.metadata?.total_hits);
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [appliedQuery, page]);

  const items = data?.items || [];
  const totalHits = data?.metadata?.total_hits || 0;

  const handleSearch = () => {
    setAppliedQuery(query);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">NASA Image Library</h1>
      <p className="text-gray-400 mb-6">Search NASA's official image and video library</p>
      <ImageSearchBar query={query} onChange={setQuery} onSearch={handleSearch} />
      {totalHits > 0 && (
        <p className="text-gray-500 text-sm mb-6">
          {totalHits.toLocaleString()} results for <span className="text-gray-300">"{appliedQuery}"</span> · Page {page}
        </p>
      )}
      {loading && <Loader />}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && items.length === 0 && !error && (
        <p className="text-gray-400">No results found. Try a different search term.</p>
      )}
      {!loading && items.length > 0 && (
        <>
          <ImageGrid items={items} onSelect={setSelected} />
          <ImagePagination page={page} onPageChange={setPage} />
        </>
      )}
      {selected && <ImageLightbox item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default NasaImageLibrary;
