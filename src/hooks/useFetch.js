import { useState, useEffect } from 'react';

const useFetch = (fetchFn, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFn(...params);
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;
