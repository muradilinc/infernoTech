import React, { useEffect } from 'react';
import { ProductCard } from '../../../entities/Card';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectProducts } from '../../../features/products/productsSlice';
import { getProductAll } from '../../../features/products/productsThunk';

interface Props {
  data?: string;
}

export const ProductList: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductAll(data));
  }, [data, dispatch]);

  if (products.length === 0) {
    return 'No items';
  }

  return (
    <div className="flex gap-y-3 flex-col my-[25px]">
      <h4 className="text-4xl font-bold dark:text-white">В наличии</h4>
      <div className="flex flex-wrap gap-3">
        {products.map((products) => (
          <ProductCard key={products._id} product={products} />
        ))}
      </div>
    </div>
  );
};
