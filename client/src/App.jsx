import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import cx from 'classnames';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import SignUp from './pages/SignUp';
import SignIn from './components/SignIn';
import Profile from './pages/Profile';
import Title from './pages/Title';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const { theme: { bgAccentTheme, mainTheme } } = useSelector(({ themes }) => themes);

  useEffect(() => {
    document.body.className = cx(bgAccentTheme, mainTheme);
  }, [mainTheme]);

  return (
    <>
      <Header />
      <div id='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/title/:mangaId' element={<Title />} />
        </Routes>
      </div>
      <Footer />

      <SignIn />
      <Sidebar />
      <ScrollToTop showHeight={300} />
    </>
  );
};

export default App;
