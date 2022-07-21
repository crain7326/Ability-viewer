import { MouseEvent } from 'react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookApi from '../api/book';
import { BookDetailEntity } from '../api/book.dto';
import indexStore from '../store/indexStore';
import { observer } from 'mobx-react';
import { OptionType, ViewType, FontFamily } from '../store/optionStore';

// components
import ViewerType from '../components/Button/ViewerType';
import Control from '../components/Button/Control';
import Toggle from '../components/Button/Toggle';
import ViewerFrom from '../components/container/ViewerFrom';

const BookDetail = () => {
  const { optionStore, appStore } = indexStore();
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState<BookDetailEntity>({
    links: { delete: '', update: '' },
    name: '',
    tags: [{ name: '' }],
    text: '',
  });
  const [error, setError] = useState<AxiosError>();
  const setFontFamily = (e: MouseEvent<HTMLParagraphElement>) => {
    optionStore.setFontFamily(e.currentTarget.textContent as FontFamily);
  };

  const fetchBookDetail = async () => {
    appStore.setLoading(true);
    const { data, error } = await bookApi.getBookById(id as string);
    appStore.setLoading(false);

    if (error) {
      setError(error);
    }

    if (data) {
      setBookDetail(data.book);
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, []);

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
      {bookDetail?.name && (
        <ViewerFrom
          name={bookDetail.name}
          tags={bookDetail.tags}
          text={bookDetail.text}
        />
      )}
    </div>
  );
};

export default observer(BookDetail);
