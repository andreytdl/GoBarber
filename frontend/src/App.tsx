import React from 'react';
import AppProvider from './hooks';

import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {

  return(

  <BrowserRouter>
    <AppProvider>
      <Routes/>
    </AppProvider>
    
    <GlobalStyle/>
  </BrowserRouter>
  
  
  );

};

export default App;
