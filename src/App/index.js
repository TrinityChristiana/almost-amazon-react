import React, { useEffect, useState } from 'react';
import MainNavbar from '../components/MainNavbar';
import Routes from '../components/Routes';
import supabaseClient from '../helpers/clients/supabaseClient';
import { getAllUserInfo } from '../helpers/data/users';
import './App.scss';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleSession = (session) => {
    if (session) {
      getAllUserInfo(session).then(setUserInfo);
    } else {
      setUserInfo(false);
    }
  };

  useEffect(() => {
    handleSession(supabaseClient.auth.session());
    supabaseClient.auth.onAuthStateChange((_, session) => {
      handleSession(session);
    });
  }, []);

  return (
    <div className='App'>
      <MainNavbar userInfo={userInfo} />
      <Routes userInfo={userInfo} />
    </div>
  );
}

export default App;
