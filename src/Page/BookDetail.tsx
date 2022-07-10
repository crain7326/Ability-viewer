import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookApi from '../api/book';

const BookDetail = () => {
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookDetail = async () => {
    const { data, error } = await bookApi.getBookById(id as string);
    setLoading(false);

    if (error) {
      setError(error);
    }

    if (data) {
      setBookDetail(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, []);

  return <div>id: {id}</div>;
};

export default BookDetail;
