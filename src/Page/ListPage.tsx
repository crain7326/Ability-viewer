import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import Hashtag from '../components/common/Hashtag';

import bookApi from '../api/book';
import { BookEntity } from '../api/book.dto';
import userStorage from '../helper/localStorage';
import indexStore from '../store/indexStore';

import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineX } from 'react-icons/hi';

const ListPage = () => {
  const { appStore } = indexStore();

  const [books, setBooks] = useState<BookEntity[]>([]);
  const [tags, setTags] = useState<
    { name: string; links: { books: string } }[]
  >([]);
  const [clickedTag, setClickedTag] = useState<string>('태그');
  const [error, setError] = useState<AxiosError | boolean>();
  const navigation = useNavigate();

  const getAllBooks = async () => {
    appStore.setLoading(true);
    const { data, error } = await bookApi.getAllBooks();
    appStore.setLoading(false);

    if (data) {
      const books: BookEntity[] = data.books as BookEntity[];
      setBooks(books);
    }

    if (error) {
      setError(error);
    }
  };

  const onClickTag = async (tag: {
    name: string;
    links: { books: string };
  }) => {
    appStore.setLoading(true);
    const { data, status } = await bookApi.getBookByTag(tag.links.books);
    appStore.setLoading(false);

    if (status === 500) {
      setError(true);
      return;
    }

    const books: BookEntity[] = data.books as BookEntity[];
    setBooks(books);
  };

  const goToBookDetail = (link: string) => () => {
    const bookId = link.split('books/')[1];
    navigation(`/book/${bookId}`);
  };

  const combineTags = async () => {
    console.log('combine');
    const token = userStorage.getToken();
    if (!token) {
      return;
    }
    const { data, error } = await bookApi.getTagByBook();
    setTags(data.tags);

    if (error) {
      setError(error);
    }
  };

  const onClickDelete = async (e: MouseEvent, link: string) => {
    e.stopPropagation();
    if (!window.confirm('삭제하시겠습니까?')) return;

    appStore.setLoading(true);
    const { data, error } = await bookApi.deleteBook(link);
    appStore.setLoading(false);

    if (error) {
      setError(error);
    }

    getAllBooks();
  };

  useEffect(() => {
    getAllBooks();
    combineTags();
  }, []);

  return (
    <>
      <div className='p-24'>
        {error && 'error!'}
        <article className='br-8 bg-white p-12 mb-8'>
          <div className='flex px-12 py-8 '>
            <h3 className='font-bold '>{clickedTag}</h3>
            {clickedTag !== '태그' && (
              <button
                className='unset cursor-pointer ml-4 tc-400'
                onClick={() => {
                  getAllBooks();
                  setClickedTag('태그');
                }}
              >
                <HiOutlineX />
              </button>
            )}
          </div>
          <ul
            id='hashtagList'
            className='px-12 py-8 flex'
            style={{ overflowY: 'hidden', overflowX: 'auto' }}
          >
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Hashtag
                  text={tag.name}
                  key={tag.links.books}
                  onClickTag={() => {
                    onClickTag(tag);
                    setClickedTag(tag.name);
                  }}
                />
              ))
            ) : (
              <p>태그가 없습니다.</p>
            )}
          </ul>
        </article>

        <div
          className='br-8 bg-white py-12 px-24'
          style={{ overflowY: 'auto' }}
        >
          <section>
            <h3 className='hidden'>글 목록</h3>
            <ul>
              {books?.length > 0 ? (
                books?.map((book, index) => (
                  <li
                    id={book.name}
                    className='pt-16'
                    style={{ position: 'relative' }}
                    key={index}
                    onClick={goToBookDetail(book.links.book)}
                  >
                    <div className='bookHeader'>
                      <h5 className='font-bold'>{book.name}</h5>
                      <span className='tc-500 fs-14'>
                        {new Date(book.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div
                      className='hashtagBox pt-8 pb-16 flex f-wrap'
                      style={{ borderBottom: '1px solid var(--gray--300)' }}
                    >
                      {book.tags &&
                        book.tags.map((tag) => (
                          <Hashtag text={tag.name} key={tag.name} />
                        ))}
                    </div>
                    <div
                      className='p-12 btn-book-delete'
                      style={{
                        position: 'absolute',
                        top: 'calc(50% - 20px)',
                        right: 0,
                        cursor: 'pointer',
                        borderRadius: '50%',
                        transition: '0.3s',
                      }}
                      onClick={(e: MouseEvent) =>
                        onClickDelete(e, book.links.delete)
                      }
                    >
                      <AiOutlineDelete />
                    </div>
                  </li>
                ))
              ) : (
                <li>글이 없습니다.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default ListPage;
