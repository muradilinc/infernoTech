import React, { PropsWithChildren } from 'react';
import { Header } from '../../widgets/Header';
import { FooterComponent } from '../../widgets/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container mx-auto">{children}</main>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
};

export default Layout;
