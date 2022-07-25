import React, {
  MouseEvent,
} from 'react';

import indexStore from '../store/indexStore';
import { observer } from 'mobx-react';

// components
import ViewerType from '../components/Button/ViewerType';
import Control from '../components/Button/Control';
import Toggle from '../components/Button/Toggle';
import ViewerFrom from '../components/container/ViewerFrom';

import { OptionType, ViewType, FontFamily } from '../store/optionStore';

const ViewerPage = () => {
  const { optionStore } = indexStore();
  const setFontFamily = (e: MouseEvent<HTMLParagraphElement>) => {
    optionStore.setFontFamily(e.currentTarget.textContent as FontFamily);
  };

  return (
    <div className="ViewerPage pt-12">
      <div className="ViewerType mx-20 bg-white flex f-ai-center f-jc-between p-12 br-12">
        <p>뷰어 설정</p>
        <div className="btnWrap">
          <ViewerType
            type={ViewType.ridi}
            isSelected={optionStore.viewerType === '리디북스' && true}
          />
          <ViewerType
            type={ViewType.kakao}
            isSelected={optionStore.viewerType === '카카오' && true}
          />
        </div>
      </div>
      <div className="ViewerSetting mx-20 mt-12 bg-white p-12 br-12">
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">글꼴</p>
          <p className="flex mb-4" style={{ cursor: 'pointer' }}>
            <span
              className={
                optionStore.fontFamily === 'KoPub 바탕' ? 'tc-900' : 'tc-300'
              }
              onClick={setFontFamily}
            >
              KoPub 바탕
            </span>
            <span className="mx-4 tc-300"> | </span>
            <span
              className={
                optionStore.fontFamily === 'KoPub 돋움' ? 'tc-900' : 'tc-300'
              }
              onClick={setFontFamily}
            >
              KoPub 돋움
            </span>
            <span className="mx-4 tc-300"> | </span>
            <span
              className={
                optionStore.fontFamily === 'KoPub 명조' ? 'tc-900' : 'tc-300'
              }
              onClick={setFontFamily}
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
          <Control type={OptionType.fontSize} />
        </div>
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">
            문단 너비
            <span className="fs-14 ml-4">{optionStore.paragraphHeigthNum}</span>
          </p>
          <Control type={OptionType.paragraphHeigth} />
        </div>
        <div className="ViewerSettingDetail flex f-ai-center f-jc-between my-8">
          <p className="flex f-ai-center">
            줄 간격
            <span className="fs-14 ml-4">{optionStore.lineHeigthNum}</span>
          </p>
          <Control type={OptionType.lineHeigth} />
        </div>
        {optionStore.viewerType === ViewType.kakao && (
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
