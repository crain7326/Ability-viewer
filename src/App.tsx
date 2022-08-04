import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Header from './components/base/Header';
import ErrorBoundary from './components/error/ErrorBoundary';
import Spinner from './components/common/Spinner';

import ListPage from './page/ListPage';
import LoginPage from './page/LoginPage';
import Mypage from './page/Mypage';
import SignupPage from './page/SignupPage';
import ViewerPage from './page/ViewerPage';
import ViewerAll from './page/ViewerAll';
import FindUserPage from './page/FindUserPage';
import NotFound from './page/NotFound';
import BookDetail from './page/BookDetail';

import storage from './helper/localStorage';
import indexStore from './store/indexStore';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const { appStore } = indexStore();

  useEffect(() => {
    storage.getToken() ? setIsLogin(true) : setIsLogin(false);
  }, [isLogin]);

  return (
    <ErrorBoundary>
      <div className='App pretendard' >
        <div className='m-auto' style={{ maxWidth: "480px", height:"100vh"}}>
          <Header isLogin={isLogin} setIsLogin={setIsLogin} />
          <Spinner loading={appStore.loading} />
          <main className='bg-100 h-main'>
            <Routes>
              <Route path='/' element={<ViewerPage />} />
              <Route path='/book/:id' element={<BookDetail />} />
              <Route path='/viewer_all' element={<ViewerAll />} />
              <Route path='/list' element={<ListPage />} />
              <Route path='/mypage' element={<Mypage />} />
              <Route
                path='/login'
                element={<LoginPage setIsLogin={setIsLogin} />}
              />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/find_user' element={<FindUserPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default observer(App);
