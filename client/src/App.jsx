import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import cx from 'classnames';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './components/SignIn';
import Profile from './pages/Profile';

const App = () => {
  const { theme: { bgAccentTheme, mainTheme } } = useSelector(({ themes }) => themes);

  useEffect(() => {
    document.body.className = cx(bgAccentTheme, mainTheme);
  }, [mainTheme]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

      <SignIn />
      <Sidebar />
    </>
  );
};

export default App;
