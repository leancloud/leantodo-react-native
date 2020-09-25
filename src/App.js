import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'react-native-elements';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import Login from './Login';
import Todo from './Todo';

import {User} from 'open-leancloud-storage';

const theme = {
  colors: {
    primary: '#2c97e8',
  },
};

export default function App() {
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState('');

  function handleLogin({username, password}) {
    User.logIn(username, password)
      .then((userObj) => {
        setUser(userObj);
        setErrMsg('');
      })
      .catch((error) => setErrMsg(error.message));
  }

  function handleSignUp({username, password}) {
    User.signUp({username, password})
      .then((userObj) => {
        setUser(userObj);
        setErrMsg('');
      })
      .catch((error) => setErrMsg(error.message));
  }

  function handleLogout() {
    User.logOutAsync().then(() => setUser(null));
  }

  useEffect(() => {
    User.currentAsync().then((currentUser) => {
      currentUser.isAuthenticated().then((authenticated) => {
        if (authenticated) {
          setUser(currentUser);
        }
      });
    });
  }, [setUser]);

  return (
    <ThemeProvider theme={theme}>
      <ActionSheetProvider>
        {!user ? (
          <Login
            onLogin={handleLogin}
            onSignUp={handleSignUp}
            errorMessage={errMsg}
          />
        ) : (
          <Todo onLogout={handleLogout} />
        )}
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
