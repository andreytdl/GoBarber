import React from 'react';

import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

import { AuthProvider } from '../src/context/AuthContext';

const App: React.FC = () => {

  return(

  <>
    <AuthProvider>
      <SignIn/>
    </AuthProvider>

    <GlobalStyle/>
  </>
  
  
  );

};

export default App;
