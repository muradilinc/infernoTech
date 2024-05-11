import { ProductList } from '../../../../widgets/ProductList';
import { Banner } from '../../../../widgets/Banner';
import { BrandList } from '../../../../widgets/BrandList';

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <ProductList />
      <BrandList />
    </div>
  );
};
