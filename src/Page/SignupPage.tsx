import { useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';
import LabelInput from '../components/common/LabelInput';
import EmailInput from '../components/container/EmailInput';
import PrivacyForm from '../components/container/PrivacyForm';

// api
import authApi from '../api/auth';
import indexStore from '../store/indexStore';

const SignupPage = () => {
  const { appStore } = indexStore();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    email: '',
    pw: '',
    pwValid: '',
  });
  const [error, setError] = useState(null) as any;

  const changeInput = (type: string, value: string) => {
    setUser((prevState) => {
      return { ...prevState, [type]: value };
    });
  };

  async function handleRegister() {
    appStore.setLoading(true);
    const { data, error } = await authApi.register({
      id: user.id,
      email: user.email,
      password: user.pw,
    });
    appStore.setLoading(false);

    if (data) {
      navigate('/login', { replace: true });
    }

    if (error) {
      setError(error);
    }
  }

  return (
    <div>
      <div className="px-24 py-24 w-full flex f-column f-ai-center">
        {/* error 처리 */}
        {error && 'register error!'}
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <EmailInput value={user.email} setValue={changeInput} />

            <LabelInput
              label="아이디"
              type="text"
              name="id"
              value={user.id}
              placeholder="3~16자의 알파벳,숫자,혹은 특수기호(- _) "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeInput('id', e.target.value);
              }}
            />

            <LabelInput
              label="비밀번호"
              type="password"
              name="pasword"
              value={user.pw}
              placeholder="8~16자 알파벳,특수기호,숫자"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeInput('pw', e.target.value);
              }}
            />

            <LabelInput
              label="비밀번호 재입력"
              type="password"
              name="pasword2"
              value={user.pwValid}
              placeholder="위에 입력한 비밀번호를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeInput('pwValid', e.target.value);
              }}
            />
          </fieldset>
          <PrivacyForm user={user} handleRegister={handleRegister} />
        </form>
      </div>
    </div>
  );
};

export default observer(SignupPage);
