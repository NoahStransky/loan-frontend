import { useState, useEffect } from 'react';
import api from '../api';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(url)
      .then(response => {
        setData(response.data);
        setError(null);
      })
      .catch(error => {
        setData(null);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { data, error, loading };
}

export default useFetch;
