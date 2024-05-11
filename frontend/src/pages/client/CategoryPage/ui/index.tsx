import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectCategories } from '../../../../features/categories/categoriesSlice';
import { getAllCategory } from '../../../../features/categories/categoriesThunk';
import { CategoryList } from '../../../../widgets/CategoryList';

export const CategoriesPage = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div>
      <CategoryList categories={categories} />
    </div>
  );
};
