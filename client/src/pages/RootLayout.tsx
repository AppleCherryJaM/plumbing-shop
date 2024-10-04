import { Outlet } from 'react-router-dom';
import React from 'react';

const RootLayout: React.FC = () => {
  return (
    <>
      {/*<Header />*/}
      <Outlet />
      {/*<Footer />*/}
    </>
  );
};

export { RootLayout };
