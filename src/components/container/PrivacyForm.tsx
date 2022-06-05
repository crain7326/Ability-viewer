import React, { useState } from "react";
import Notification from "../../components/common/Notification";

import { observer } from "mobx-react";
import indexStore from "../../store/indexStore";

export interface PrivacyFormProps {
  user: {
    id: string;
    pw: string;
    email: string;
  };
}

const PrivacyForm = ({ user }: PrivacyFormProps) => {
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const { userStore } = indexStore();

  const onSubmit = async () => {
    setError(" ");
    // validate
    const validation = {
      email: (text: string) => {
        if (text === "") {
          return "이메일을 입력해주세요";
        }
      },
      id: (text: string) => {
        if (!/^[a-z0-9-_]{3,16}$/.test(text)) {
          return "아이디는 3~16자의 알파벳,숫자,혹은 - _ 으로 이루어져야 합니다.";
        }
      },
      password: (text: string) => {
        if (
          !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,16}/.test(text)
        ) {
          return "비밀번호는 8~16자 알파벳,특수기호,숫자로 이루어져야 합니다.";
        }
      },
    };

    const error =
      validation.email(user.email) ||
      validation.id(user.id) ||
      validation.password(user.pw) ||
      null;

    if (error) {
      setError(error);
      return;
    }
  };

  return (
    <fieldset>
      <div className="flex f-ai-center">
        <input type="checkbox" id="privacyCheck" required />
        <label htmlFor="privacyCheck" className="flex f-ai-space pl-8">
          개인정보수집 및 이용 동의
        </label>
        <a
          className="ml-8"
          style={{ borderBottom: "1px solid black", cursor: "pointer" }}
          onClick={() => {
            setActive(!active);
          }}
        >
          보기
        </a>
      </div>
      <ul className={active ? "" : "hidden"}>
        <li>수집 목적 회원제 서비스 제공 및 유지 • 관리</li>
        <li>
          수집 항목 이메일 비밀번호, 로그인ID, 이름, 서비스 이용 기록, 접속
          로그, 쿠키, 접속 IP 정보, 방문 일시
        </li>
        <li>보유 / 이용기간 회원탈퇴시</li>
      </ul>

      <label className="flex f-ai-space py-8">
        <input type="checkbox" required />
        <span className="ml-8">만 14세 이상입니다.</span>
      </label>
      <Notification message={error}></Notification>
      <button
        id="signupBtn"
        className="unset border-box br-8 b-500 bg-500 tc-50 w-full px-16 py-12 my-8"
        type="submit"
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={() => {
          userStore.handleSignup(user.id, user.email, user.pw);
          onSubmit();
        }}
      >
        회원가입
      </button>
    </fieldset>
  );
};

export default observer(PrivacyForm);
