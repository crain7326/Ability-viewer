import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { observer } from 'mobx-react';
import indexStore from '../store/indexStore';
import { setCookie } from '../api/cookie';
import LabelInput from '../components/LabelInput';

const LoginPage = () => {
	const {userStore} = indexStore();

	let navigate = useNavigate();

	const [loginId, setLoginId] = useState("")
	const [loginPw, setLoginPw] = useState("")

	
	async function handleLogin() {
		const response = await userStore.handleLogin(loginId,loginPw);
		if(response) navigate('/');
		setCookie('TOKEN', response.data.token);
		return;
	};

	return (
		<div id='loginPage'>
			<div className='px-24 py-24 w-full flex f-column f-ai-center'>
				<form onSubmit={e => e.preventDefault()}>

					<LabelInput 
						label='아이디'
						name='username'
						placeholder="아이디를 입력하세요" 
						onChange={(e)=>{setLoginId(e.target.value)}}
						required
					/>

					<LabelInput 
						label='비밀번호'
						name='password'
						onChange={(e)=>{setLoginPw(e.target.value)}}
						minLength={8}
						placeholder="비밀번호 8글자 이상 입력하세요" 
						required
					/>
					
					<div className='errorBox' style={{color:"red"}}></div>
					<button 
					className='unset border-box br-8 b-500 bg-500 tc-50 w-full px-16 py-12 my-8'
					style={{textAlign: 'center', cursor: 'pointer'}}
					onClick={handleLogin}>로그인</button>
				</form>

				<Link to="/find_user">아이디 | 비밀번호 찾기</Link>
			</div>
		</div>
	)
}

export default observer(LoginPage)