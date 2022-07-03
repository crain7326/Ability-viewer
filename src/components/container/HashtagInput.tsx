import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import Hashtag from '../common/Hashtag';

interface HashTagInpuType {
  tags: [];
  setTags: ([]) => void;
}

const HashtagInput = ({ setTags, tags }: HashTagInpuType) => {
  const [inputHashtagVal, setInputHashtagVal] = useState<string>();
  const onChangeHashtag = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    const inputvalue = currentValue.replace(/ /g, '');

    setInputHashtagVal(inputvalue);
  };

  const deleteLastHashtag = () => {
    tags.pop();
    setTags([...tags]);
  };

  const addHashtag = (e: SyntheticEvent<HTMLInputElement>) => {
    setTags((prev): any => [...prev, { name: inputHashtagVal }]);

    console.log(tags);
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
