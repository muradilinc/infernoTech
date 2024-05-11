import { useEffect } from 'react';
import { ProductCard } from '../../../entities/Card';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectProducts } from '../../../features/products/productsSlice';
import { getProductAll } from '../../../features/products/productsThunk';

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductAll());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-5 gap-x-5">
      {products.map((products) => (
        <ProductCard key={products._id} product={products} />
      ))}
    </div>
  );
};
