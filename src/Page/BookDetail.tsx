import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookApi from '../api/book';
import { BookDetailEntity } from '../api/book.dto';
import indexStore from '../store/indexStore';
import { observer } from 'mobx-react';

const BookDetail = () => {
  const { optionStore } = indexStore();
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState<BookDetailEntity>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  const fetchBookDetail = async () => {
    const { data, error } = await bookApi.getBookById(id as string);
    setLoading(false);

    if (error) {
      setError(error);
    }

    if (data) {
      setBookDetail(data.book);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, []);

  return <div>id: {id}</div>;
};

export default observer(BookDetail);
