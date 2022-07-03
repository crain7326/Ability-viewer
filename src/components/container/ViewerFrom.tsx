import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HashtagInput from './HashtagInput';

import optionStore from '../../store/optionStore';
import Hashtag from '../common/Hashtag';

const ViewerFrom = () => {
  // 내부 해시태그 string list object로 반환

  const [bookName, setBookName] = useState<string>();
  const [Tags, setTags] = useState<[]>([]);
  const [bookText, setBookText] = useState<string>();

  return (
    <>
      <div
        className="ViewerBtn tc-500 mx-20 my-12"
        style={{ textAlign: 'right' }}
      >
        <Link
          to="/viewer_all"
          onClick={() => {
            optionStore.setText(
              document.querySelector('.user_text')?.innerHTML
            );
            optionStore.setTextBundle(optionStore.text);
          }}
        >
          전체보기
        </Link>
        <Link to="/" className="ml-12">
          저장하기
        </Link>
      </div>
      <div className="Viewer">
        <div className="bg-white flex f-column br-12 py-12 px-24">
          <input
            className="unset py-12"
            placeholder="제목을 입력하세요"
            style={{ borderBottom: '1px solid var(--gray--300)' }}
          />
          <div
            className="hashtagWrap flex f-column"
            style={{ borderBottom: '1px solid var(--gray--300)' }}
          >
            <div className="hastagBox my-4 flex f-wrap">
              {Tags &&
                Tags.map((object, index) => (
                  <Hashtag key={index} text={object.name} />
                ))}
            </div>
            <HashtagInput setTags={setTags} />
          </div>
          <textarea
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
