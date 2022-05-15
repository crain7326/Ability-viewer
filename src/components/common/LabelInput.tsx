import React, { useState, useCallback } from "react";

export interface ILabelInputProps {
  label: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
  disabled?: any;
  required?: any;
  list?: string;
}

const LabelInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  disabled,
  ...rest
}: ILabelInputProps) => {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <>
      <label>{label}</label>
      <input
        className="unset border-box w-full bg-white br-8 px-16 py-12 b-400 my-8 active-b-800 pretendard fs-16"
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        disabled={disabled}
        {...rest}
      />
    </>
  );
};

export default LabelInput;
