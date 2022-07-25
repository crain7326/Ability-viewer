import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  KeyboardEvent,
  SetStateAction,
  Dispatch,
} from 'react';

interface HashTagInputType {
  tags: { name: string }[];
  setTags: Dispatch<SetStateAction<{ name: string }[]>>;
}

const HashtagInput = ({ setTags, tags }: HashTagInputType) => {
  const [inputHashtagVal, setInputHashtagVal] = useState<string>('');

  const onChangeHashtag = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    const inputvalue = currentValue.replace(/ /g, '');

    setInputHashtagVal(inputvalue);
  };

  const deleteLastHashtag = () => {
    tags.pop();
    setTags([...tags]);
  };

  const makeUniqTags = (tagArr: { name: string }[]) => {
    const tagsCopy = [...tagArr];

    const uniqTags = tagsCopy.reduce(function (acc, current) {
      if (acc.findIndex(({ name }) => name === current.name) === -1) {
        acc.push(current);
      }
      return acc;
    }, []);

    return uniqTags;
  };

  const addHashtag = (e: SyntheticEvent<HTMLInputElement>) => {
    const newTags = [...tags, { name: inputHashtagVal }];
    const uniqTags = makeUniqTags(newTags);
    setTags(uniqTags);

    e.currentTarget.value = '';
    setInputHashtagVal('');
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
        className='unset py-8 mb-4'
        placeholder='해시태그를 입력하세요'
        onKeyUp={keyEvent}
        onChange={onChangeHashtag}
      />
    </>
  );
};

export default HashtagInput;
