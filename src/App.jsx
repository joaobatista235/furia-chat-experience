import React from 'react';
import { globalStyles } from './presentation/styles/global.styles';
import Chat from './presentation/components/Chat';

function App() {
  globalStyles();
  return <Chat />;
}

export default App;
