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
  link?: { delete: '', update: '' }
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
    const isBookDetailPage = bookDetail.hasOwnProperty('name')
    
    handdleCreateBook(isBookDetailPage);
  };

  const validationBook = function () {
    const validation = {
      name: (text: string) => {
          if (text === '') {
            return '제목을 입력해주세요'
          }
      },
      description: (text: string) => {
        if (text === '') {
          return '내용을 입력해주세요'
        }
      },
      token: (token: string| false) => {
        if (!token) {
          return '로그인이 필요합니다.'
        } 
      }
    }
    
    const token = storage.getToken();
    const errorMsg = validation.token(token) || validation.name(bookName.name) || validation.description(bookText.text) || undefined
    setNotifyMessage(errorMsg)
    return errorMsg
  }

  const handdleCreateBook = async function (isCreated: boolean) {
    // 유효성 검사
    const errorMsg = validationBook();
    if (errorMsg) {
      return;
    }

    appStore.setLoading(true);
    const inputData = {
      book: { ...bookName, ...bookText },
      tags: [...bookTags],
    };

    if (isCreated) {
      const { data, error } = await bookApi.createBook(inputData);
      appStore.setLoading(false);
      if (data.success === true) {
        toast.success('저장 완료');
      }
      if (error) {
        setNotifyMessage('error!');
      }
    }

    if(!isCreated){
      const updateUrl = bookDetail.link.update
      const { data, error } = await bookApi.updateBook(inputData, updateUrl);
      appStore.setLoading(false);
      if (data.success === true) {
        toast.success('저장 완료');
      }
      if (error) {
        setNotifyMessage('error!');
      }
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
        <button className='ml-12' onClick={onClickSaveBtn}>
          저장
        </button>
      </div>
      <div className='TextViewer'>
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
            value={bookText.text}
            style={{ height: 500 }}
            placeholder='내용을 입력하세요'
          />
        </div>
      </div>
    </>
  );
};

export default ViewerFrom;
