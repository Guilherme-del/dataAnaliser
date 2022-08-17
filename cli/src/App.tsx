import React from 'react';
import AppProvider from './hook';
import Home from './pages/dashBoard/main';

const App: React.FC= () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;