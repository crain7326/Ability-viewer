import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from 'react';

interface HashTagInputType {
  tags: { name: string }[];
  setTags: ([]) => void;
}

const HashtagInput = ({ setTags, tags }: HashTagInputType) => {
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

    e.currentTarget.value = '';
  };

  const keyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    const event: SyntheticEvent<HTMLInputElement> = e;
    //space
    if (e.code === 'Space' && inputHashtagVal !== '') {
      addHashtag(event);
    }

    // enter
    if (e.code === 'Enter' && inputHashtagVal !== '') {
      addHashtag(event);
    }

    //backspace
    if (e.code === 'Backspace' && inputHashtagVal === '') {
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
