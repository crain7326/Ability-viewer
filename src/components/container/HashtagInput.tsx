import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  KeyboardEvent,
} from 'react';
import Hashtag from '../common/Hashtag';

const HashtagInput = () => {
  const [inputHashtagVal, setInputHashtagVal] = useState<string>();
  const [hashtags, setHashtags] = useState<string[]>([]);

  const onChangeHashtag = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    const inputvalue = currentValue.replace(/ /g, '');

    setInputHashtagVal(inputvalue);
  };

  const deleteLastHashtag = () => {
    hashtags.pop();
    setHashtags([...hashtags]);
  };

  const addHashtag = (e: SyntheticEvent<HTMLInputElement>) => {
    setHashtags((hashtags): any => [...hashtags, inputHashtagVal]);
    e.currentTarget.value = '';
  };

  const keyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    const event: SyntheticEvent<HTMLInputElement> = e;
    const currentValue = e.currentTarget.value;

    //space
    if (e.code === 'Space' && currentValue !== '') {
      addHashtag(event);
    }

    // enter
    if (e.code === 'Enter' && currentValue !== '') {
      addHashtag(event);
    }

    //backspace
    if (e.code === 'Backspace' && currentValue == '') {
      deleteLastHashtag();
    }
  };

  return (
    <>
      <div className="hastagBox my-4 flex f-wrap">
        {hashtags &&
          hashtags.map((text, index) => <Hashtag key={index} text={text} />)}
      </div>
      <input
        className="unset py-8 mb-4"
        placeholder="해시태그를 입력하세요"
        onKeyUp={keyEvent}
        onChange={onChangeHashtag}
      />
    </>
  );
};

export default HashtagInput;
