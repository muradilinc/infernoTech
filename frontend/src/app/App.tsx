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
import { ProductFormPage } from '../pages/admin/ProductsAdminPage';
import { BrandFormPage, BrandsTable } from '../pages/admin/BrandsAdminPage';
import {
  CategoriesTable,
  CategoryFormPage,
} from '../pages/admin/CategoriesAdminPage';
import { CategoriesSinglePage } from '../pages/client/CategoriesSinglePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { StorePage } from '../pages/client/StorePage';
import { AuthPage, RegisterPage } from '../pages/Auth';
import { ToastContainer } from 'react-toastify';

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
            <Route path="/products-submit/:id" element={<ProductFormPage />} />
            <Route path="/brands" element={<BrandsTable />} />
            <Route path="/brands-submit" element={<BrandFormPage />} />
            <Route path="/brands-submit/:id" element={<BrandFormPage />} />
            <Route path="/categories" element={<CategoriesTable />} />
            <Route path="/categories-submit" element={<CategoryFormPage />} />
            <Route
              path="/categories-submit/:id"
              element={<CategoryFormPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AdminLayout>
      ),
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {pathname.includes('admin') ? (
        adminRoutes
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/brands/:id" element={<SingleBrandPage />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<CategoriesSinglePage />} />
            <Route path="/products/:brand" element={<ProductsPage />} />
            <Route path="/product/:id" element={<SingleProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
