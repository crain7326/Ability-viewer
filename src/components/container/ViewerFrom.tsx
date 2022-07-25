import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HashtagInput from './HashtagInput';
import bookApi from '../../api/book';

import storage from '../..//helper/localStorage';
import indexStore from '../../store/indexStore';
import Hashtag from '../common/Hashtag';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface ViewerFromProps {
  name?: string;
  text?: string;
  tags?: { name: string }[];
}
const ViewerFrom = (bookDetail?: ViewerFromProps) => {
  const { appStore, optionStore } = indexStore();

  // 에러 라이브러리 셋팅
  const [notifyMessage, setNotifyMessage] = useState<string>();
  const notify = () => toast.error(notifyMessage);
  useEffect(() => {
    if (!notifyMessage) {
      return;
    }
    notify();
  }, [notifyMessage]);

  // 내부 해시태그 string list object로 반환
  const [bookName, setBookName] = useState<{ name: string }>({
    name: bookDetail?.name ?? '',
  });
  const [bookTags, setBookTags] = useState<{ name: string }[]>(
    bookDetail?.tags ?? []
  );
  const [bookText, setBookText] = useState<{ text: string }>({
    text: bookDetail?.text ?? '',
  });

  // 초기 셋팅
  useEffect(() => {
    optionStore.title && setBookName({ name: optionStore.title });
    optionStore.text && setBookText({ text: optionStore.text });
    optionStore.tags && setBookTags(optionStore.tags);
  }, [optionStore.text, optionStore.title, optionStore.tags]);

  const onChangeBookTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setBookName({ name: e.currentTarget.value });

  const onChangeBookText = (e: ChangeEvent<HTMLInputElement>) =>
    setBookText({ text: e.currentTarget.value });

  const onClickViewAllBtn = () => {
    optionStore.setTitle(bookName.name);
    optionStore.setTags(bookTags);
    optionStore.setText(bookText.text);
    optionStore.text && optionStore.setTextBundle(optionStore.text);
  };
  const onClickSaveBtn = () => {
    optionStore.setText(bookText?.text);
    handdleCreateBook();
  };

  const handdleCreateBook = async function () {
    if (bookName.name === '') {
      setNotifyMessage('제목을 입력해주세요.');
      return;
    }
    if (bookText.text === '') {
      setNotifyMessage('내용을 입력해주세요.');
      return;
    }
    const token = storage.getToken();
    if (!token) {
      setNotifyMessage('로그인이 필요합니다.');
      return;
    }

    appStore.setLoading(true);
    const inputData = {
      book: { ...bookName, ...bookText },
      tags: [...bookTags],
    };
    const { data, error } = await bookApi.createBook(inputData);
    appStore.setLoading(false);

    if (!data) {
      setNotifyMessage('토큰이 만료됐습니다. 다시 로그인 해주세요');
    }
    if (data.success === true) {
      toast.success('저장 완료');
    }
    if (error) {
      setNotifyMessage('error!');
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        className='ViewerBtn tc-500 mx-20 my-12'
        style={{ textAlign: 'right' }}
      >
        <Link to='/viewer_all' onClick={onClickViewAllBtn}>
          전체보기
        </Link>
        <Link to='/' className='ml-12' onClick={onClickSaveBtn}>
          저장하기
        </Link>
      </div>
      <div className='Viewer'>
        <div className='bg-white flex f-column br-12 py-12 px-24'>
          <input
            className='unset py-12'
            placeholder='제목을 입력하세요'
            onChange={onChangeBookTitle}
            value={bookName.name}
            style={{ borderBottom: '1px solid var(--gray--300)' }}
          />
          <div
            className='hashtagWrap flex f-column'
            style={{ borderBottom: '1px solid var(--gray--300)' }}
          >
            <div className='hastagBox my-4 flex f-wrap'>
              {bookTags &&
                bookTags.map((object, index) => (
                  <Hashtag key={index} text={object.name} />
                ))}
            </div>
            <HashtagInput tags={bookTags} setTags={setBookTags} />
          </div>
          <textarea
            onChange={onChangeBookText}
            className='unset border-box py-12 user_text'
            defaultValue={optionStore.text}
            style={{ height: 500 }}
            placeholder='내용을 입력하세요'
          />
        </div>
      </div>
    </>
  );
};

export default ViewerFrom;
