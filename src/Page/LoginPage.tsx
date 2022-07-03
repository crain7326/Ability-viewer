import React, { useState } from 'react';

// router
import { Link, useNavigate } from 'react-router-dom';

// api
import authApi from '../api/auth';

// storage
import storage from '../helper/localStorage';

// component
import LabelInput from '../components/common/LabelInput';

interface ResponseLogin {
  id: string;
  links: {
    user: string;
  };
  token: string;
}

const LoginPage = () => {
  let navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { data, error } = await authApi.login({
      id: loginId,
      password: loginPw,
    });
    setLoading(false);

    if (data) {
      storage.setToken(data.token);
      storage.setUserId(data.id);
      navigate('/', { replace: true });
    }

    if (error) {
      setError(error);
    }
  }

  return (
    <div id="loginPage">
      <div className="px-24 py-24 w-full flex f-column f-ai-center">
        {/* spinner */}
        {loading ? 'loading!' : ''}
        {/* error 처리 */}
        {error && 'login error!'}
        <form onSubmit={(e) => e.preventDefault()}>
          <LabelInput
            label="아이디"
            name="username"
            placeholder="아이디를 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginId(e.target.value);
            }}
            value={loginId}
            disabled={false}
            required
          />

          <LabelInput
            label="비밀번호"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginPw(e.target.value);
            }}
            type="password"
            value={loginPw}
            disabled={false}
            placeholder="비밀번호 8글자 이상 입력하세요"
            required
          />

          <div className="errorBox" style={{ color: 'red' }}></div>
          <button
            className="unset border-box br-8 b-500 bg-500 tc-50 w-full px-16 py-12 my-8"
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={handleLogin}
          >
            로그인
          </button>
        </form>

        <Link to="/find_user">아이디 | 비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default LoginPage;
