import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './components/SignIn';
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
        <Route path='/signup' element={<SignUp />} />
      </Routes>

      <SignIn />
    </>
  );
};

export default App;
