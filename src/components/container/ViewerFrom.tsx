import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import HashtagInput from './HashtagInput';
import bookApi from '../../api/book';

import storage from '../..//helper/localStorage';
import optionStore from '../../store/optionStore';
import Hashtag from '../common/Hashtag';
import Notification from '../common/Notification';

const ViewerFrom = () => {
  // 내부 해시태그 string list object로 반환
  const [loading, setLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [bookName, setBookName] = useState<{ name: string }>({ name: '' });
  const [bookTags, setBookTags] = useState<{ name: string }[]>([]);
  const [bookText, setBookText] = useState<{ text: string }>({ text: '' });

  const onChangeBookTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setBookName({ name: e.currentTarget.value });

  const onChangeBookText = (e: ChangeEvent<HTMLInputElement>) =>
    setBookText({ text: e.currentTarget.value });

  const onClickViewAllBtn = () => {
    optionStore.setText(bookText.text);
    optionStore.setTextBundle(optionStore.text);
  };

  const onClickSaveBtn = () => {
    optionStore.setText(bookText?.text);
    const book = { book: { ...bookName, ...bookText } };
    const tags = { tags: [...bookTags] };
    const requestObj = { ...book, ...tags };
    handdleCreateBook();
  };

  const handdleCreateBook = async function () {
    const token = storage.getToken();
    if (!token) {
      setErrorMessage('로그인 해주세요');
      return;
    }

    setLoading(true);
    console.log({
      book: { ...bookName, ...bookText },
      tags: [...bookTags],
    });
    const { data, error } = await bookApi.createBook(
      {
        book: { ...bookName, ...bookText },
        tags: [...bookTags],
      },
      token
    );
    setLoading(false);

    console.log(data);

    if (error) {
      setErrorMessage('error!');
    }
  };
  return (
    <>
      {loading && 'loading...'}
      {errorMessage && <Notification message={errorMessage} />}
      <div
        className="ViewerBtn tc-500 mx-20 my-12"
        style={{ textAlign: 'right' }}
      >
        <Link to="/viewer_all" onClick={onClickViewAllBtn}>
          전체보기
        </Link>
        <Link to="/" className="ml-12" onClick={onClickSaveBtn}>
          저장하기
        </Link>
      </div>
      <div className="Viewer">
        <div className="bg-white flex f-column br-12 py-12 px-24">
          <input
            className="unset py-12"
            placeholder="제목을 입력하세요"
            onChange={onChangeBookTitle}
            style={{ borderBottom: '1px solid var(--gray--300)' }}
          />
          <div
            className="hashtagWrap flex f-column"
            style={{ borderBottom: '1px solid var(--gray--300)' }}
          >
            <div className="hastagBox my-4 flex f-wrap">
              {bookTags &&
                bookTags.map((object, index) => (
                  <Hashtag key={index} text={object.name} />
                ))}
            </div>
            <HashtagInput setTags={setBookTags} tags={bookTags} />
          </div>
          <textarea
            onChange={onChangeBookText}
            className="unset border-box py-12 user_text"
            defaultValue={optionStore.text}
            style={{ height: 500 }}
            placeholder="내용을 입력하세요"
          />
        </div>
      </div>
    </>
  );
};

export default ViewerFrom;
