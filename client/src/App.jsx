import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import cx from 'classnames';
import Sidebar from './components/Sidebar';
import SearchBar from './components/Searchbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import SignUp from './pages/SignUp';
import SignIn from './components/SignIn';
import Profile from './pages/Profile';
import Title from './pages/Title';
import ChapterReader from './pages/ChapterReader';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useCheckAuth } from './hooks';
import CONSTANTS from './constants';
import Notifications from './components/Notifications';
const { PAGES: {
  HOME: { path: homePath },
  SIGN_UP: { path: signupPath },
  CATALOG: { path: catalogPath },
  TITLE: { path: titlePath },
  CHAPTER_READER: { path: chapterPath },
} } = CONSTANTS;

const App = () => {
  const { theme: { bgAccentTheme, mainTheme } } = useSelector(({ themes }) => themes);

  useCheckAuth();

  useEffect(() => {
    document.body.className = cx(bgAccentTheme, mainTheme);
  }, [mainTheme]);

  return (
    <>
      <Header />
      <div id='content'>
        <Routes>
          <Route path={homePath} element={<Home />} />
          <Route path={signupPath} element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path={catalogPath} element={<Catalog />} />
          <Route path={`${titlePath}/:mangaId`} element={<Title />} />
          <Route path={`${chapterPath}/:chapterId`} element={<ChapterReader />} />
        </Routes>
      </div>
      <Footer />

      <Notifications />
      <SignIn />
      <Sidebar />
      <SearchBar />
      <ScrollToTop showHeight={400} />
    </>
  );
};

export default App;
