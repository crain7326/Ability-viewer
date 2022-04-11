import React, { useState } from 'react'

import { observer } from 'mobx-react';
import indexStore from '../store/indexStore';
import LabelInput from '../components/common/LabelInput';

const SignupPage = () => {
	const {userStore} = indexStore();

	const [signupEmail,setSignupEmail] = useState('')
	const [emailList,setEmailList] = useState()
	const [signupId, setSignupId ] = useState('')
	const [signupPw, setSignupPw ] = useState('')
	
	const frequencyEmails = ['@naver.com','@gmail.com','@daum.net','@hanmail.net', '@yahoo.com', '@outlook.com','@nate.com','@kakao.com']
	
	const onChangeEmail = (e) => {
		const userEmails = frequencyEmails.map((email)=>(
			e.target.value.includes("@") ?
				e.target.value.split("@")[0] + email : 
				e.target.value + email
		))
		setEmailList(userEmails)
		userEmails.map((email)=> (
			e.target.value == email && setSignupEmail(e.target.value) 
		))
	}
	

	return (
		<div>
			<div className='px-24 py-24 w-full flex f-column f-ai-center'>
			<form onSubmit={e => e.preventDefault()}>
				<fieldset>
					<LabelInput 
						label='이메일'
						name='email'
						list='email' 
						placeholder='이메일을 입력하세요'
						onChange={onChangeEmail} 
						required
						/>
					<datalist id="email">
						{emailList && emailList.map((email, idx)=> (
							<option value={email} key={idx}/>
						))}
					</datalist>
					
					<LabelInput 
						label='아이디'
						name='username'
						placeholder='이메일을 입력하세요'
						onChange={(e)=>{setSignupId(e.target.value)}} 
						required
						/>

					<LabelInput 
						label='비밀번호'
						name='pasword'
						placeholder='비밀번호 8글자 이상 입력하세요'
						onChange={(e)=>{setSignupPw(e.target.value)}} 
						minLength={8}
						required
					/>
					
					<LabelInput 
						label='비밀번호 재입력'
						name='pasword2'
						placeholder='비밀번호 8글자 이상 입력하세요'
						minLength={8}
						required
					/>
				</fieldset>
				
				
				<fieldset>
					<label className='flex f-ai-center py-8'>
						<input type='checkbox' required />
						<span className='ml-8'>이용약관 동의</span>
						<a className='ml-8' style={{borderBottom:"1px solid black"}}>보기</a>
					</label>
					<label className='flex f-ai-space py-8'>
						<input type='checkbox' required />
						<span className='ml-8'>개인정보수집 및 이용 동의</span>
						<a className='ml-8' style={{borderBottom:"1px solid black"}}>보기</a>
					</label>
					<label className='flex f-ai-space py-8'>
						<input type='checkbox' required />
						<span className='ml-8'>만 14세 이상입니다.</span>
					</label>
				</fieldset>
				<button 
				className='unset border-box br-8 b-500 bg-500 tc-50 w-full px-16 py-12 my-8' 
				type='submit'
				style={{textAlign: 'center', cursor: 'pointer'}}
				onClick={()=>{userStore.handleSignup(signupId, signupEmail, signupPw)}}
				>회원가입</button>
			</form>
			</div>
		</div>
	)
}

export default observer(SignupPage);