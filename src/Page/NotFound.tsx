import { Link } from 'react-router-dom';
import Submit from '../components/Button/Submit';

const pageStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '60px',
  fontWeight: 'bold',
};

const textStyle = {
  fontSize: '20px',
  margin: '20px',
};

const NotFound = () => {
  return (
    <div style={pageStyle}>
      <div>
        <h1 style={titleStyle}>404</h1>
        <p style={textStyle}>존재하지 않는 페이지입니다.</p>
        <Link to="/">
          <Submit type="login" value="홈으로 이동" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
