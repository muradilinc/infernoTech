import { ProductList } from '../../../../widgets/ProductList';
import { useParams } from 'react-router-dom';

export const ProductsPage = () => {
  const { title } = useParams() as { title: string };
  const { brand } = useParams() as { brand: string };

  console.log(brand);

  return (
    <div>
      <ProductList data={title ? title : brand} />
    </div>
  );
};
