import React, { useState, useCallback } from "react";

export interface ILabelInputProps {
  label: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
  disabled?: boolean;
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
  return (
    <>
      <label>{label}</label>
      <input
        className="unset border-box w-full bg-white br-8 px-16 py-12 b-400 my-8 active-b-800 pretendard fs-16"
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </>
  );
};

export default LabelInput;
