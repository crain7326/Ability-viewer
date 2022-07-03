import { Route, Routes } from 'react-router-dom';
import Header from './components/base/Header';
import ListPage from './Page/ListPage';
import LoginPage from './Page/LoginPage';
import Mypage from './Page/Mypage';
import SignupPage from './Page/SignupPage';
import ViewerPage from './Page/ViewerPage';
import ViewerAll from './Page/ViewerAll';
import FindUserPage from './Page/FindUserPage';
import ErrorBoundary from './components/error/ErrorBoundary';
import { useEffect, useState } from 'react';
import storage from './helper/localStorage';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    storage.getToken() ? setIsLogin(true) : setIsLogin(false);
  }, [isLogin]);

  return (
    <ErrorBoundary>
      <div className="App pretendard">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <main className="h-main bg-100">
          <Routes>
            <Route path="/" element={<ViewerPage />} />
            <Route path="/viewer_all" element={<ViewerAll />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route
              path="/login"
              element={<LoginPage setIsLogin={setIsLogin} />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/find_user" element={<FindUserPage />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
