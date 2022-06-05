import { useState, ChangeEvent } from "react";

import { observer } from "mobx-react";
import indexStore from "../store/indexStore";
import LabelInput from "../components/common/LabelInput";
import EmailInput from "../components/container/EmailInput";
import PrivacyForm from "../components/container/PrivacyForm";

const SignupPage = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    pw: "",
  });

  const makeObject = (type: string, value: any) => {
    setUser((prevState) => {
      return { ...prevState, [type]: value };
    });
  };
  console.log(user);

  return (
    <div>
      <div className="px-24 py-24 w-full flex f-column f-ai-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <EmailInput setValue={makeObject} />

            <LabelInput
              label="아이디"
              type="text"
              name="id"
              placeholder="3~16자의 알파벳,숫자,혹은 특수기호(- _) "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                makeObject("id", e.target.value);
              }}
            />

            <LabelInput
              label="비밀번호"
              type="password"
              name="pasword"
              placeholder="8~16자 알파벳,특수기호,숫자"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                makeObject("pw", e.target.value);
              }}
            />

            <LabelInput
              label="비밀번호 재입력"
              type="password"
              name="pasword2"
              placeholder="8~16자 알파벳,특수기호,숫자"
            />
          </fieldset>
          <PrivacyForm user={user} />
        </form>
      </div>
    </div>
  );
};

export default observer(SignupPage);
