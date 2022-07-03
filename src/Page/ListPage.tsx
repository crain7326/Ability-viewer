import { useEffect, useState } from 'react';
import Hashtag from '../components/common/Hashtag';

// 임시
import api from '../api/api';
import userStorage from '../helper/localStorage';

interface ResponseBooks {
  name: string;
  updatedAt: string;
  createdAt: string;
  links: {
    book: string;
    delete: string;
  };
  tags: string[];
}

const ListPage = () => {
  const [books, setBooks] = useState<ResponseBooks[]>([]);
  const [tags, setTags] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllBooks = async () => {
    setLoading(true);
    const { data, error } = await api(
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userStorage.getToken()}`,
        },
      },
      `${process.env.REACT_APP_API_URL}/books`
    );
    setLoading(false);

    if (data) {
      setBooks(data.books);
      console.log(books);
    }

    if (error) {
      setError(true);
    }
  };

  const combineTags = async () => {
    const allTags: string[] = [];
    books.map((book: any) => [allTags, ...book.tags]);
    setTags(allTags);
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
                tags.map((tag) => <Hashtag text={tag} />)
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
                {books.length > 0 ? (
                  books.map((book) => (
                    <li id={book.name} className="pt-16">
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
                        {book.tags.map((tag) => (
                          <Hashtag text={tag} />
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
