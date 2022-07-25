import React from 'react';

export interface LabelInputProps {
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
  type,
  ...rest
}: LabelInputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        className="unset border-box w-full bg-white br-8 px-16 py-12 b-400 my-8 active-b-800 pretendard fs-16"
        name={name}
        onChange={onChange}
        value={value || ''}
        placeholder={placeholder}
        type={type}
        disabled={disabled || false}
        {...rest}
      />
    </>
  );
};

export default LabelInput;
