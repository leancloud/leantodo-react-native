import React, {useState} from 'react';

import {ThemeProvider} from 'react-native-elements';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Login from './Login';
import Todo from './Todo';

const theme = {
  colors: {
    primary: '#2c97e8',
  },
};

export default function App() {
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState('');

  function handleLogin({username, password}) {
    console.log('login', username, password);
    setUser({username, password});
  }

  function handleSignUp({username, password}) {
    console.log('signUp', username, password);
    setUser({username, password});
  }

  function handleLogout() {
    setUser(null);
  }

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
