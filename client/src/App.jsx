import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import themes from './common/styles/theme.module.scss';

const App = () => {

  const { theme: { bgAccentColor } } = useSelector(({ themes }) => themes);

  useEffect(() => {
    document.body.className = themes[bgAccentColor];
  }, [bgAccentColor]);

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
