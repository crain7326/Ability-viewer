import { useNavigate } from 'react-router-dom';
import { BookEntity } from '../../api/book.dto';
import { AiOutlineDelete } from 'react-icons/ai';

import Hashtag from '../common/Hashtag';
import bookApi from '../../api/book';
import { useEffect, useState } from 'react';
import PaginationButton from '../Button/Pagination';

export default function BookItem(props: {
  books: BookEntity[];
  getAllBooks: Function;
  setError: Function;
}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [pageView] = useState(10);
  const navigation = useNavigate();

  const goToBookDetail = (link: string) => () => {
    const bookId = link.split('books/')[1];
    navigation(`/book/${bookId}`);
  };
  const onClickDelete = async (e: MouseEvent, link: string) => {
    e.stopPropagation();
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      await bookApi.deleteBook(link);
      props.getAllBooks();
    } catch (error) {
      props.setError(error)
    }
  };

  function isStartIndex(index: number) {
    if (index <= 0) return true;
    return false;
  }

  function isEndIndex(list: BookEntity[], index: number) {
    if (list.length <= index) return true;
    return false;
  }

  function onClickPrev() {
    if (isStartIndex(start)) {
      return '첫번째 페이지 입니다.';
    }
    setStart((cur) => cur - pageView);
    setEnd((cur) => cur - pageView);
  }
  function onClickNext() {
    if (isEndIndex(props.books, end)) {
      return '마지막 페이지 입니다.';
    }
    setStart((cur) => cur + pageView);
    setEnd((cur) => cur + pageView);
  }

  function setStartEndIndex(start: number, end: number) {
    setStart((cur) => cur = start);
    setEnd((cur) => cur = end);
  }

  useEffect(() => {
    setStart(0);
    setEnd(pageView);
  }, [pageView]);

  const bookList = props.books.slice(start, end);
  return (
    <div>
      <ul>
        {bookList.map((book, index) => (
          <li
            id={book.name}
            className="pt-16"
            style={{ position: 'relative' }}
            key={index}
            onClick={goToBookDetail(book.links.book)}
          >
            <div className="bookHeader">
              <h5 className="font-bold">{book.name}</h5>
              <span className="tc-500 fs-14">
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
              onClick={(e: MouseEvent) => onClickDelete(e, book.links.delete)}
            >
              <AiOutlineDelete />
            </div>
          </li>
        ))}
      </ul>
      <PaginationButton onClickPrev={onClickPrev} onClickNext={onClickNext} onClickIndex={setStartEndIndex} buttonListLength={props.books.length} pageView={pageView} />
    </div>
  );
}
