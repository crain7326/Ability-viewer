import { useEffect, useState } from 'react';
import Hashtag from '../components/common/Hashtag';

import userStorage from '../helper/localStorage';
import bookApi from '../api/book';
import { useNavigate } from 'react-router-dom';
import { BookEntity } from '../api/book.dto';
import { AxiosError } from 'axios';
import indexStore from '../store/indexStore';

import { AiOutlineDelete } from 'react-icons/ai';

const ListPage = () => {
  const { appStore } = indexStore();

  const [books, setBooks] = useState<BookEntity[]>([]);
  const [tags, setTags] = useState<
    { name: string; links: { books: string } }[]
  >([]);
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

  const onClickTag = async (link: string) => {
    appStore.setLoading(true);
    const { data, status } = await bookApi.getBookByTag(link);
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
      <div className="p-24 h-full">
        <div className="w-full h-full">
          {error && 'error!'}
          <article className="br-8 bg-white p-12 mb-8">
            <h3 className="px-12 py-8 font-bold ">태그</h3>
            <ul
              id="hashtagList"
              className="px-12 py-8 flex"
              style={{ overflowY: 'hidden', overflowX: 'auto' }}
            >
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Hashtag
                    text={tag.name}
                    key={tag.name}
                    onClickTag={() => {
                      onClickTag(tag.links.books);
                    }}
                  />
                ))
              ) : (
                <p>태그가 없습니다.</p>
              )}
            </ul>
          </article>

          <div className="br-8 bg-white h-full py-12 px-24">
            <ul
              className="flex py-4 font-bold hidden"
              style={{ textAlign: 'center' }}
            >
              <li className='basis-full cursor-pointer'>글</li>
              <li className='basis-full cursor-pointer'>책장</li>
            </ul>
            <section>
              <h3 className="hidden">글 목록</h3>
              <ul>
                {books?.length > 0 ? (
                  books?.map((book, index) => (
                    <li
                      id={book.name}
                      className="pt-16"
                      style={{ position: 'relative' }}
                      key={index}
                      onClick={goToBookDetail(book.links.book)}
                    >
                      <div className="bookHeader flex f-ai-end">
                        <h5 className="font-bold">{book.name}</h5>
                        <span className="tc-500 ml-4 fs-14">
                          {new Date(book.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div
                        className="hashtagBox pt-8 pb-16 flex f-wrap"
                        style={{ borderBottom: '1px solid var(--gray--300)' }}
                      >
                        {book.tags &&
                          book.tags.map((tag) => (
                            <Hashtag text={tag.name} key={tag.name} />
                          ))}
                      </div>
                      <div
                        className="p-12 btn-book-delete"
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
      </div>
    </>
  );
};

export default ListPage;
