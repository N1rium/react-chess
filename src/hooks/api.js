import { useState, useEffect } from 'react';
import { REQUEST } from 'Store/middleware/api';

const useApi = ({ url, method = 'GET', body }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await REQUEST(url, method, body);
        setData(resp);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useApi;
