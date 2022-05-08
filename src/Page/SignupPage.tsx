import { useState, ChangeEvent } from 'react';

import { observer } from 'mobx-react';
import indexStore from '../store/indexStore';
import LabelInput from '../components/common/LabelInput';
import Notification from '../components/common/Notification';

const SignupPage = () => {
  const { userStore } = indexStore();

  const [error, setError] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [signupId, setSignupId] = useState('');
  const [signupPw, setSignupPw] = useState('');

  const frequencyEmails = [
    '@naver.com',
    '@gmail.com',
    '@daum.net',
    '@hanmail.net',
    '@yahoo.com',
    '@outlook.com',
    '@nate.com',
    '@kakao.com',
  ];

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const userEmails = frequencyEmails.map((email) =>
      e.target.value.includes('@')
        ? e.target.value.split('@')[0] + email
        : e.target.value + email
    );
    setEmailList(userEmails);
    userEmails.map(
      (email) => e.target.value == email && setSignupEmail(e.target.value)
    );
  };

  const onSubmit = async () => {
    setError(' ');
    // validate
    const validation = {
      email: (text: string) => {
        if (text === '') {
          return '이메일을 입력해주세요';
        }
      },
      id: (text: string) => {
        if (!/^[a-z0-9-_]{3,16}$/.test(text)) {
          return '아이디는 3~16자의 알파벳,숫자,혹은 - _ 으로 이루어져야 합니다.';
        }
      },
      password: (text: string) => {
        if (
          !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,16}/.test(text)
        ) {
          return '비밀번호는 8~16자 알파벳,특수기호,숫자로 이루어져야 합니다.';
        }
      },
    };

    const error =
      validation.email(signupEmail) ||
      validation.id(signupId) ||
      validation.password(signupPw) ||
      null;

    if (error) {
      setError(error);
      return;
    }
  };

  // 2022.05.02(월) LabelInput migration 후 가능
  return (
    <div>
      <div className="px-24 py-24 w-full flex f-column f-ai-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <LabelInput
              label="이메일"
              type="email"
              name="email"
              list="email"
              placeholder="이메일을 입력하세요"
              onChange={onChangeEmail}
              disabled="false"
            />
            {/* label, name, value, placeholder, onChange, disabled, ...rest */}
            <datalist id="email">
              {emailList &&
                emailList.map((email, idx) => (
                  <option value={email} key={idx} />
                ))}
            </datalist>

            <LabelInput
              label="아이디"
              type="text"
              name="id"
              placeholder="3~16자의 알파벳,숫자,혹은 특수기호(- _) "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSignupId(e.target.value);
              }}
            />

            <LabelInput
              label="비밀번호"
              type="password"
              name="pasword"
              placeholder="8~16자 알파벳,특수기호,숫자"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSignupPw(e.target.value);
              }}
            />

            <LabelInput
              label="비밀번호 재입력"
              type="password"
              name="pasword2"
              placeholder="8~16자 알파벳,특수기호,숫자"
            />
          </fieldset>
          <fieldset>
            <label className="flex f-ai-center py-8">
              <input type="checkbox" required />
              <span className="ml-8">이용약관 동의</span>
              <a className="ml-8" style={{ borderBottom: '1px solid black' }}>
                보기
              </a>
            </label>
            <label className="flex f-ai-space py-8">
              <input type="checkbox" required />
              <span className="ml-8">개인정보수집 및 이용 동의</span>
              <a className="ml-8" style={{ borderBottom: '1px solid black' }}>
                보기
              </a>
            </label>
            <label className="flex f-ai-space py-8">
              <input type="checkbox" required />
              <span className="ml-8">만 14세 이상입니다.</span>
            </label>
          </fieldset>
          <button
            id="signupBtn"
            className="unset border-box br-8 b-500 bg-500 tc-50 w-full px-16 py-12 my-8"
            type="submit"
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => {
              userStore.handleSignup(signupId, signupEmail, signupPw);
              onSubmit();
            }}
          >
            회원가입
          </button>
        </form>

        <Notification message={error}></Notification>
      </div>
    </div>
  );
};

export default observer(SignupPage);
