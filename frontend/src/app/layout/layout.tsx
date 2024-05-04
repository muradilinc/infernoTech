import React, { PropsWithChildren } from 'react';
import { Header } from '../../widgets/Header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default Layout;
