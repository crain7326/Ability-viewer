import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  SyntheticEvent,
} from 'react';

import indexStore from '../store/indexStore';
import { observer } from 'mobx-react';

// components
import ViewerType from '../components/Button/ViewerType';
import Control from '../components/Button/Control';
import Toggle from '../components/Button/Toggle';
import ViewerFrom from '../components/container/ViewerFrom';
// option type 설정
const optionType = Object.freeze({
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  paragraphHeigth: 'paragraphHeigth',
  lineHeigth: 'lineHeigth',
});

const ViewerPage = () => {
  const { optionStore } = indexStore();

  return (
    <div className="ViewerPage pt-12">
      <div className="ViewerType mx-20 bg-white flex f-ai-center f-jc-between p-12 br-12">
        <p>뷰어 설정</p>
        <div className="btnWrap">
          <ViewerType
            type={optionStore.viewer.ridi}
            isSelected={optionStore.viewerType === '리디북스' && true}
          />
          <ViewerType
            type={optionStore.viewer.kakao}
            isSelected={optionStore.viewerType === '카카오' && true}
          />
        </div>
      </div>
      <div className="ViewerSetting mx-20 mt-12 bg-white p-12 br-12">
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">글꼴</p>
          <p
            className="flex mb-4"
            style={{ cursor: 'pointer' }}
            onClick={(e: MouseEvent<HTMLParagraphElement>) =>
              e.currentTarget.textContent?.includes('|') === false &&
              optionStore.setFontFamily(
                e.currentTarget.textContent?.split(' ')[1]
              )
            }
          >
            <span
              className={
                optionStore.fontFamily === '바탕' ? 'tc-900' : 'tc-300'
              }
            >
              KoPub 바탕
            </span>
            <span className="mx-4 tc-300"> | </span>
            <span
              className={
                optionStore.fontFamily === '돋움' ? 'tc-900' : 'tc-300'
              }
            >
              KoPub 돋움
            </span>
            <span className="mx-4 tc-300"> | </span>
            <span
              className={
                optionStore.fontFamily === '명조' ? 'tc-900' : 'tc-300'
              }
            >
              KoPub 명조
            </span>
          </p>
        </div>
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">
            글자 크기
            <span className="fs-14 ml-4">{optionStore.fontSizeNum}</span>
          </p>
          <Control type={optionType.fontSize} />
        </div>
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">
            문단 너비
            <span className="fs-14 ml-4">{optionStore.paragraphHeigthNum}</span>
          </p>
          <Control type={optionType.paragraphHeigth} />
        </div>
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">
            줄 간격
            <span className="fs-14 ml-4">{optionStore.lineHeigthNum}</span>
          </p>
          <Control type={optionType.lineHeigth} />
        </div>
        {optionStore.viewerType === optionStore.viewer.kakao && (
          <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
            <p className="flex f-ai-center">이미지 뷰어로 보기</p>
            <Toggle />
          </div>
        )}
      </div>
      <ViewerFrom />
    </div>
  );
};

export default observer(ViewerPage);
