import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import Hashtag from '../components/common/Hashtag';

import bookApi from '../api/book';
import { BookEntity } from '../api/book.dto';
import userStorage from '../helper/localStorage';

import { HiOutlineX } from 'react-icons/hi';
import BookItem from '../components/listPage/BookList';

const ListPage = () => {
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [tags, setTags] = useState<
    { name: string; links: { books: string } }[]
  >([]);
  const [clickedTag, setClickedTag] = useState<string>('태그');
  const [error, setError] = useState<AxiosError | boolean>();

  const getAllBooks = async () => {
    try {
      const data = await bookApi.getAllBooks();
      const books: BookEntity[] = data.books;
      setBooks(books);
    } catch (error) {
      setError(error);
    }
  };

  const onClickTag = async (tag: {
    name: string;
    links: { books: string };
  }) => {
    const data = await bookApi.getBookByTag(tag.links.books);
    console.log(data);

    const books: BookEntity[] = data.books as BookEntity[];
    setBooks(books);
  };

  const combineTags = async () => {
    const token = userStorage.getToken();
    if (!token) {
      return;
    }
    try {
      const data = await bookApi.getTagByBook();
      setTags(data.tags);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getAllBooks();
    combineTags();
  }, []);

  return (
    <>
      <div className="p-24">
        {error && 'error!'}
        <article className="br-8 bg-white p-12 mb-8">
          <div className="flex px-12 py-8 ">
            <h3 className="font-bold ">{clickedTag}</h3>
            {clickedTag !== '태그' && (
              <button
                className="unset cursor-pointer ml-4 tc-400"
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
            id="hashtagList"
            className="px-12 py-8 flex"
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
          className="br-8 bg-white py-12 px-24"
          style={{ overflowY: 'auto' }}
        >
          <section style={{ height: '100%' }}>
            <h3 className="hidden">글 목록</h3>
            {books?.length > 0 && (
              <BookItem
                books={books}
                getAllBooks={getAllBooks}
                setError={setError}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ListPage;
