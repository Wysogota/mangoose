import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import styles from './App.module.scss';

const App = () => {

  const { isDarkTheme } = useSelector(({ themes }) => themes);

  useEffect(() => {
    document.body.className = isDarkTheme ? styles.dark_theme : styles.light_theme;
  }, [isDarkTheme]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
