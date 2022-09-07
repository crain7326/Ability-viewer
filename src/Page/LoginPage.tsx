import React, { useEffect, useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';

// api
import authApi from '../api/auth';

// storage
import storage from '../helper/localStorage';

// component
import LabelInput from '../components/common/LabelInput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const LoginPage = (props: { setIsLogin: Function }) => {
  let navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const notify = () => toast.error(errorMessage);

  useEffect(() => {
    if (errorMessage !== '') {
      notify();
    }
  }, [errorMessage]);

  const settingErrorMsg = function () {
    // 로그인 유효성 검사
    const vaildation = {
      id: (text: string) => {
        if (text.length === 0) {
          return '아이디 입력해주세요.';
        }
      },
      password: (text: string) => {
        if (text.length === 0) {
          return '비밀번호를 입력해주세요';
        }
        if (text.length < 8) {
          return '비밀번호를 8글자 이상 입력해주세요';
        }
      },
    };

    const errorMsg: string =
      vaildation.id(loginId) || vaildation.password(loginPw) || '';

    setErrorMessage(errorMsg);
  };

  const handleLogin = async function () {
    settingErrorMsg();

    if (loginId.length < 3) {
      return;
    }
    if (loginPw.length < 8) {
      return;
    }

    try {
      const data = await authApi.login({
        id: loginId,
        password: loginPw,
      });
      props.setIsLogin(true);
      storage.setToken(data.token);
      storage.setUserId(data.id);
      navigate('/', { replace: true });
    } catch (error) {
      setErrorMessage('아이디 또는 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <div id='loginPage'>
      <div className='px-24 pt-24 h-main'>
        <h2 className='fs-20 py-24 font-bold'>로그인</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <LabelInput
            label='아이디'
            name='username'
            placeholder='아이디를 입력하세요'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginId(e.target.value);
            }}
            value={loginId}
            disabled={false}
            required
          />

          <LabelInput
            label='비밀번호'
            name='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginPw(e.target.value);
            }}
            type='password'
            value={loginPw}
            disabled={false}
            placeholder='비밀번호 8글자 이상 입력하세요'
            required
          />

          <button
            className='unset border-box br-8 b-500 bg-500 tc-50 w-full px-16 py-12 my-8 cursor-pointer'
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={handleLogin}
          >
            로그인
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
