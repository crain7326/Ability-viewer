import axios from 'axios';
import { useEffect, useState } from 'react';
import Hashtag from '../components/common/Hashtag';

declare var process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

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

// 임시. 로그인 처리 작업 후 localStorage에 저장된 토큰 가져다 쓸 예정!
const devToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJjMmYxODE5NDUyMTFlZjMxNGQ0MjQiLCJpYXQiOjE2NTQ2MDY3OTIsImV4cCI6MTY1NzE5ODc5Mn0.lZWX2p7_TJVtsU_VjBpK1AZWlopefXIucegL5yIoXSs';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${devToken}`,
  },
};

const ListPage = () => {
  const [books, setBooks] = useState<ResponseBooks[]>([]);
  const [tags, setTags] = useState(['']);

  const fetchAllBooks = async () => {
    const allBooks = await axios.get(
      `${process.env.REACT_APP_API_URL}/books`,
      options
    );
    setBooks(allBooks.data.books);
  };

  const combineTags = async () => {
    const allTags: string[] = [];
    books.map((book: any) => [allTags, ...book.tags]);
    setTags(allTags);
  };

  useEffect(() => {
    fetchAllBooks();
    combineTags();
  }, []);

  return (
    <>
      <div className="p-24 h-full">
        <div className="w-full h-full">
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
