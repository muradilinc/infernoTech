import { useParams } from 'react-router-dom';
import { ProductList } from '../../../../widgets/ProductList';

export const CategoriesSinglePage = () => {
  const { id } = useParams() as { id: string };

  return (
    <div>
      <ProductList data={id} />
    </div>
  );
};
