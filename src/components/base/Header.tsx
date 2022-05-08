import { Link } from 'react-router-dom'
import { LogoFull } from './Logo'

import indexStore from '../../store/indexStore'
import { observer } from 'mobx-react' 

const Header = () => {
	const {userStore} = indexStore();

	return (
		<header className='h-50 flex f-ai-center f-jc-between'>
			<h1>
				<LogoFull />
			</h1> 
			<nav id='nav' className='pr-24'>
				{userStore.online 
				?
				<>
				<Link to="/list" className='mr-8'>글목록</Link>
				<Link to="/" onClick={userStore.handleLogout}>로그아웃</Link>
				</>
				: 
				<>
				<Link to="/signup" className='mr-8'>회원가입</Link>
				<Link to="/login">로그인</Link>
				</>
				}
				
			</nav>
		</header>
	)
}

export default observer(Header)