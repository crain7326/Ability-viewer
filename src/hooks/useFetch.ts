import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const UseFetch = (config: AxiosRequestConfig) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(config)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default UseFetch;
