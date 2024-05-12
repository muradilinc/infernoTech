import React, { PropsWithChildren } from 'react';
import { AdminSideBar } from '../../widgets/SideBar';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="container mx-auto flex gap-x-3">
      <AdminSideBar />
      {children}
    </main>
  );
};

export default AdminLayout;
