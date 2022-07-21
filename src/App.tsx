import { Route, Routes } from 'react-router-dom';
import Header from './components/base/Header';
import ListPage from './page/ListPage';
import LoginPage from './page/LoginPage';
import Mypage from './page/Mypage';
import SignupPage from './page/SignupPage';
import ViewerPage from './page/ViewerPage';
import ViewerAll from './page/ViewerAll';
import FindUserPage from './page/FindUserPage';
import NotFound from './page/NotFound';
import ErrorBoundary from './components/error/ErrorBoundary';
import { useEffect, useState } from 'react';
import storage from './helper/localStorage';
import BookDetail from './page/BookDetail';
import Spinner from './components/common/Spinner';
import indexStore from './store/indexStore';
import { observer } from 'mobx-react-lite';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const { appStore } = indexStore();

  useEffect(() => {
    storage.getToken() ? setIsLogin(true) : setIsLogin(false);
  }, [isLogin]);

  return (
    <ErrorBoundary>
      <div className="App pretendard">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Spinner loading={appStore.loading} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default observer(App);
