import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import LabelInput from "../common/LabelInput";

export interface EmailInpurProps {
  setValue: any;
}

const EmailInput = ({ setValue }: EmailInpurProps) => {
  const [emailList, setEmailList] = useState<string[]>([]);

  const frequencyEmails = [
    "@naver.com",
    "@gmail.com",
    "@daum.net",
    "@hanmail.net",
    "@yahoo.com",
    "@outlook.com",
    "@nate.com",
    "@kakao.com",
  ];

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const userEmails = frequencyEmails.map((email) =>
      e.target.value.includes("@")
        ? e.target.value.split("@")[0] + email
        : e.target.value + email
    );
    setEmailList(userEmails);
    setValue("email", e.target.value);
  };

  return (
    <>
      <LabelInput
        label="이메일"
        type="email"
        name="email"
        list="email"
        placeholder="이메일을 입력하세요"
        onChange={onChangeEmail}
      />
      <datalist id="email">
        {emailList &&
          emailList.map((email, idx) => <option value={email} key={idx} />)}
      </datalist>
    </>
  );
};

export default EmailInput;
