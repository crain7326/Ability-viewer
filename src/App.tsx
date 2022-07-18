import { Route, Routes } from 'react-router-dom';
import Header from './components/base/Header';
import ListPage from './page/ListPage';
import LoginPage from './page/LoginPage';
import Mypage from './page/Mypage';
import SignupPage from './page/SignupPage';
import ViewerPage from './page/ViewerPage';
import ViewerAll from './page/ViewerAll';
import FindUserPage from './page/FindUserPage';
import ErrorBoundary from './components/error/ErrorBoundary';
import { useEffect, useState } from 'react';
import storage from './helper/localStorage';
import BookDetail from './page/BookDetail';

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
            <Route path="/book/:id" element={<BookDetail />} />
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
