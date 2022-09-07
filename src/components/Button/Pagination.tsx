import { useState, MouseEvent, useEffect } from "react";

interface ButtonList {
  isShow: boolean;
  index: number;
  start: number;
  end: number;
}

export default function PaginationButton(props: { onClickPrev: Function, onClickNext: Function, onClickIndex: Function, buttonListLength: number, pageView: number }) {
  const { onClickPrev, onClickNext, onClickIndex, buttonListLength, pageView } = props;
  const [ currentIndex, setCurrentIndex ] = useState(1);
  const [ buttonList, setButtonList ] = useState<ButtonList[]>([]);

  useEffect(() => {
    const buttons: ButtonList[] = [];
    for (let i = 0; i < Math.ceil(buttonListLength / pageView); i++) {
      buttons.push({
        isShow: i < 5,
        index: i + 1,
        start: i * pageView, 
        end: (i * pageView) + 2
      });
    }
    setButtonList((prev) => prev = buttons);
  }, []);

  useEffect(() => {
    if (currentIndex === 1 || currentIndex === 2 || currentIndex === 3) {
      // 1~5페이지 보여주기
      setButtonList((prevState) => {
        prevState.forEach((button) => {
          button.isShow = button.index <= 5;
          return button;
        });
        return prevState;
      })
      return;
    }

    if (currentIndex === buttonList.length || currentIndex === buttonList.length - 1 || currentIndex === buttonList.length - 2) {
      // 마지막~마지막-5
      setButtonList((prevState) => {
        prevState.forEach((button) => {
          button.isShow = button.index > buttonList.length - 5;
          return button;
        });
        return prevState;
      })
      return;
    }

    // 가운데를 기준으로 양옆에 두개씩 보여주기
    setButtonList((prevState) => {
      prevState.forEach((button) => {
        button.isShow = currentIndex - 2 <= button.index && currentIndex + 2 >= button.index;
        return button;
      });
      return prevState;
    });
  }, [currentIndex, buttonList.length]);

  const onClickIndexButton = (e: MouseEvent<HTMLButtonElement>, button: ButtonList) => {
    const currentIndex = parseInt(e.currentTarget.dataset.index as string);
    setCurrentIndex((prevState) => prevState = currentIndex);
    onClickIndex(button.start, button.end);
  };

  const onClickPrevButton = () => {
    onClickPaginationButton(onClickPrev, 'prev');
  };

  const onClickNextButton = () => {
    onClickPaginationButton(onClickNext, 'next');
  };

  const onClickPaginationButton = (callback: Function, type: 'prev' | 'next') => {
    if (callback()) {
      return;
    }
    setCurrentIndex((prevState) => prevState = type === 'prev' ? prevState - 1 : prevState + 1);
  };

  return (
    <div className="btn_pagination_wrap">
      <button onClick={onClickPrevButton}> { '<' } </button>
      {
        buttonList
          .filter((button) => button.isShow)
          .map(
            (button, index) => 
            <button 
              onClick={(e) => onClickIndexButton(e, button)} 
              key={`btn_pagination_index${index + 1}`}
              data-index={button.index} 
              className={`${currentIndex === button.index ? 'btn_pagination_active' : ''} btn_pagination`}
            >
              {button.index}
            </button>
          )
      }
      <button onClick={onClickNextButton}> { '>' } </button>
    </div>
  )
}