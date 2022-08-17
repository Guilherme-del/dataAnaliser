import React from 'react';
import { PeopleProvider } from './people';

type Props = {
  children?: React.ReactNode
};

const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <PeopleProvider>
      {children}
    </PeopleProvider>
  );
};

export default AppProvider;