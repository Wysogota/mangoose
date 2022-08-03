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
import PageNotFound from './pages/PageNotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useAuthorization } from './hooks';
import WithAuth from './HOCs/WithAuth';
import CONSTANTS from './constants';
import Notifications from './components/Notifications';
import WithRouteEnter from './HOCs/WithRouteEnter';
const { PAGES: {
  HOME: { path: homePath, name: homeName },
  SIGN_UP: { path: signupPath, name: signupName },
  CATALOG: { path: catalogPath, name: catalogName },
  TITLE: { path: titlePath, name: titleName },
  CHAPTER_READER: { path: chapterPath, name: chapterName },
  PROFILE: { path: profilePath, name: profileName },
} } = CONSTANTS;

const getOptions = (name) => ({ name });

const HomeRoute = WithRouteEnter(Home, getOptions(homeName));
const SignUpRoute = WithRouteEnter(SignUp, getOptions(signupName));
const ProfileRoute = WithRouteEnter(WithAuth(Profile), getOptions(profileName));
const CatalogRoute = WithRouteEnter(Catalog, getOptions(catalogName));
const TitleRoute = WithRouteEnter(Title, getOptions(titleName));
const ChapterReaderRoute = WithRouteEnter(ChapterReader, getOptions(chapterName));
const PageNotFoundRoute = WithRouteEnter(PageNotFound, getOptions(profileName));

const App = () => {
  const { theme: { bgAccentTheme, mainTheme } } = useSelector(({ themes }) => themes);

  useEffect(() => {
    document.body.className = cx(bgAccentTheme, mainTheme);
  }, [mainTheme]);

  useAuthorization();

  return (
    <>
      <Header />
      <div id='content'>
        <Routes>
          <Route path={homePath} element={<HomeRoute />} />
          <Route path={signupPath} element={<SignUpRoute />} />
          <Route path={profilePath} element={<ProfileRoute />} />
          <Route path={catalogPath} element={<CatalogRoute />} />
          <Route path={`${titlePath}/:mangaId`} element={<TitleRoute />} />
          <Route path={`${chapterPath}/:chapterId`} element={<ChapterReaderRoute />} />
          <Route path='*' element={<PageNotFoundRoute />} />
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
