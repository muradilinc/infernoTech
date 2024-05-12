import Layout from './layout/layout';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/client/HomePage';
import { SingleBrandPage } from '../pages/client/SingleBrandPage';
import { CategoriesPage } from '../pages/client/CategoryPage';
import { ProductsPage } from '../pages/client/ProductsPage';
import { SingleProductPage } from '../pages/client/SingleProductpage';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<SingleBrandPage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/products/:brand" element={<ProductsPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
