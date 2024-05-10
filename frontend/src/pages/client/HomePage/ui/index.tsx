import { DropList } from '../../../../shared/dropList';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useEffect } from 'react';
import { getProductAll } from '../../../../features/products/productsThunk';
import { selectProducts } from '../../../../features/products/productsSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductAll());
  }, [dispatch]);

  console.log(products);

  return (
    <div>
      Home page <DropList />
    </div>
  );
};
