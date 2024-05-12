import Layout from './layout/layout';
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import { HomePage } from '../pages/client/HomePage';
import { SingleBrandPage } from '../pages/client/SingleBrandPage';
import { CategoriesPage } from '../pages/client/CategoryPage';
import { ProductsPage } from '../pages/client/ProductsPage';
import { SingleProductPage } from '../pages/client/SingleProductpage';
import { AdminHomePage } from '../pages/admin/HomePage';
import AdminLayout from './layout/adminLayout';
import { ProductTable } from '../pages/admin/ProductsAdminPage';
import ProductFormPage from '../pages/admin/ProductsAdminPage/ui/ProductFormPage';

const App = () => {
  const { pathname } = useLocation() as { pathname: string };
  const adminRoutes = useRoutes([
    {
      path: '/admin/*',
      element: (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/products" element={<ProductTable />} />
            <Route path="/products-submit" element={<ProductFormPage />} />
          </Routes>
        </AdminLayout>
      ),
    },
  ]);

  return (
    <>
      {pathname.includes('admin') ? (
        adminRoutes
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands/:id" element={<SingleBrandPage />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/products/:brand" element={<ProductsPage />} />
            <Route path="/product/:id" element={<SingleProductPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
