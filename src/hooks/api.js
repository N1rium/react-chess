import { useState, useEffect } from 'react';
import { REQUEST } from 'Store/middleware/api';

const useApi = ({ url, method = 'GET', body }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await REQUEST(url, method, body);
        setResponse(resp);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchData();
  }, []);

  return { response, loading, error };
};

export default useApi;
