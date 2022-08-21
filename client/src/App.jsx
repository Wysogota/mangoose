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
import { useAuthorization, useSyncTheme } from './hooks';
import WithAuth from './HOCs/WithAuth';
import CONSTANTS from './constants';
import Notifications from './components/Notifications';
import WithRouteEnter from './HOCs/WithRouteEnter';
import Settings from './pages/Settings';
const { PAGES: {
  HOME: { path: HOME_PATH, name: HOME_NAME },
  SIGN_UP: { path: SIGN_UP_PATH, name: SIGN_UP_NAME },
  CATALOG: { path: CARALOG_PATH, name: CARALOG_NAME },
  TITLE: { path: TITLE_PATH, name: TITLE_NAME },
  CHAPTER_READER: { path: CHAPTER_PATH, name: CHAPTER_NAME },
  PROFILE: { path: PROFILE_PATH, name: PROFILE_NAME },
  SETTINGS: { path: SETTINGS_PATH, name: SETTINGS_NAME },
  PAGE_NOT_FOUNDED: { name: PAGE_NOT_FOUNDED_NAME },
} } = CONSTANTS;

const getOptions = (name) => ({ name });

const HomeRoute = WithRouteEnter(Home, getOptions(HOME_NAME));
const SignUpRoute = WithRouteEnter(SignUp, getOptions(SIGN_UP_NAME));
const ProfileRoute = WithRouteEnter(WithAuth(Profile), getOptions(PROFILE_NAME));
const SettingsRoute = WithRouteEnter(WithAuth(Settings), getOptions(SETTINGS_NAME));
const CatalogRoute = WithRouteEnter(Catalog, getOptions(CARALOG_NAME));
const TitleRoute = WithRouteEnter(Title, getOptions(TITLE_NAME));
const ChapterReaderRoute = WithRouteEnter(ChapterReader, getOptions(CHAPTER_NAME));
const PageNotFoundRoute = WithRouteEnter(PageNotFound, getOptions(PAGE_NOT_FOUNDED_NAME));

const App = () => {
  const { theme: { bgAccentTheme, mainTheme } } = useSelector(({ themes }) => themes);

  useEffect(() => {
    document.body.className = cx(bgAccentTheme, mainTheme);
  }, [mainTheme]);

  useSyncTheme();
  useAuthorization();

  return (
    <>
      <Header />
      <div id='content'>
        <Routes>
          <Route path={HOME_PATH} element={<HomeRoute />} />
          <Route path={SIGN_UP_PATH} element={<SignUpRoute />} />
          <Route path={PROFILE_PATH} element={<ProfileRoute />} />
          <Route path={SETTINGS_PATH} element={<SettingsRoute />} />
          <Route path={CARALOG_PATH} element={<CatalogRoute />} />
          <Route path={`${TITLE_PATH}/:mangaId`} element={<TitleRoute />} />
          <Route path={`${CHAPTER_PATH}/:chapterId`} element={<ChapterReaderRoute />} />
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
