import { useEffect, useState } from 'react';
import Hashtag from '../components/common/Hashtag';

import userStorage from '../helper/localStorage';
import bookApi from '../api/book';
import { useNavigate } from 'react-router-dom';
import { BookEntity } from '../api/book.dto';
import { AxiosError } from 'axios';

const ListPage = () => {
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [tags, setTags] = useState<{ name: string; link: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const navigation = useNavigate();

  const getAllBooks = async () => {
    setLoading(true);
    const { data, error } = await bookApi.getAllBooks();
    setLoading(false);

    if (data) {
      const books: BookEntity[] = data.books as BookEntity[];
      setBooks(books);
    }

    if (error) {
      setError(error);
    }
  };

  const onClickTag = async () => {};

  const goToBookDetail = (link: string) => () => {
    const bookId = link.split('books/')[1];
    navigation(`/book/${bookId}`);
  };

  const combineTags = async () => {
    const token = userStorage.getToken();
    const { data, error } = await bookApi.getBookByTag(token);
    setTags(data.tags);

    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getAllBooks();
    combineTags();
  }, []);

  return (
    <>
      <div className="p-24 h-full">
        <div className="w-full h-full">
          {loading && 'loading...'}
          {error && 'error!'}
          <article className="br-8 bg-white p-12 mb-8">
            <h3 className="px-4 py-8 font-bold hidden">태그</h3>
            <ul
              id="hashtagList"
              className="pl-4 py-8 flex"
              style={{ overflowY: 'hidden', overflowX: 'auto' }}
            >
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Hashtag
                    text={tag.name}
                    key={tag.name}
                    onClick={onClickTag()}
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
              <li style={{ flexBasis: '100%', cursor: 'pointer' }}>글</li>
              <li style={{ flexBasis: '100%', cursor: 'pointer' }}>책장</li>
            </ul>
            <section>
              <h3 className="hidden">글 목록</h3>
              <ul>
                {books?.length > 0 ? (
                  books?.map((book, index) => (
                    <li
                      id={book.name}
                      className="pt-16"
                      key={index}
                      onClick={goToBookDetail(book.links.book)}
                    >
                      <div className="bookHeader flex f-ai-end">
                        <h5 className="font-bold">{book.name}</h5>
                        <span className="tc-500 ml-4 fs-14">
                          {book.createdAt}
                        </span>
                      </div>
                      <div
                        className="hashtagBox pt-8 pb-16 flex f-wrap"
                        style={{ borderBottom: '1px solid var(--gray--300)' }}
                      >
                        {book.tags &&
                          book.tags.map((tag) => (
                            <Hashtag
                              text={tag.name}
                              key={tag.name}
                              onClick={onClickTag()}
                            />
                          ))}
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
