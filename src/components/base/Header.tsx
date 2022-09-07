import { Link } from 'react-router-dom';
import { LogoFull } from './Logo';
import userStore from '../../helper/localStorage';
import authApi from '../../api/auth';

const Header = (props: { isLogin: boolean; setIsLogin: Function }) => {
  const handleLogout = async () => {
    props.setIsLogin(false);
    userStore.clear();
    await authApi.logout();
  };

  return (
    <header className="h-50 flex f-ai-center f-jc-between bg-white px-24">
      <h1>
        <LogoFull />
      </h1>
      <nav id="nav" >
        {props.isLogin ? (
          <>
            <Link to="/list" className="mr-8">
              글목록
            </Link>
            <Link to="/" onClick={handleLogout}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="mr-8">
              회원가입
            </Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
