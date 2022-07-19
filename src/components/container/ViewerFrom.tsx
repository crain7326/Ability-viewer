import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import HashtagInput from './HashtagInput';
import bookApi from '../../api/book';

import storage from '../..//helper/localStorage';
import optionStore from '../../store/optionStore';
import Hashtag from '../common/Hashtag';
import Notification from '../common/Notification';

const ViewerFrom = (props: {
  name?: { name: string };
  tags?: { name: string }[];
  text?: { text: string };
}) => {
  console.log(props);
  // 내부 해시태그 string list object로 반환
  const [loading, setLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [bookName, setBookName] = useState<{ name: string }>(
    props.name ? props.name : { name: '' }
  );
  const [bookTags, setBookTags] = useState<{ name: string }[]>(
    props.tags ? props.tags : []
  );
  const [bookText, setBookText] = useState<{ text: string }>(
    props.text ? props.text : { text: '' }
  );

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
    handdleCreateBook();
  };

  const handdleCreateBook = async function () {
    const token = storage.getToken();
    if (!token) {
      setErrorMessage('로그인 해주세요');
      return;
    }
    setLoading(true);
    const inputData = {
      book: { ...bookName, ...bookText },
      tags: [...bookTags],
    };
    const { data, error } = await bookApi.createBook(inputData, token);
    setLoading(false);
    console.log(data);

    if (!data) {
      setErrorMessage('토큰이 만료됐습니다. 다시 로그인 해주세요');
    }
    // 나중에 알림 컴포넌트로 넣기
    if (data.success === true) {
      console.log('저장완료');
    }

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
            value={bookName.name}
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
