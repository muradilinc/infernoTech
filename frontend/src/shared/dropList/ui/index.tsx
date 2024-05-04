import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectCategories } from '../../../features/categories/categoriesSlice';
import { getAllCategory } from '../../../features/categories/categoriesThunk';
import { Dropdown } from 'flowbite-react';

// import { Category } from '../../../features/categories/categoriesSlice';

// interface Props<T> {
//   data: T[];
// }

export const DropList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  console.log(categories);
  return (
    <Dropdown label="Dropdown button">
      {categories.map((category) => (
        <Dropdown.Item key={category._id}>{category.title}</Dropdown.Item>
      ))}
    </Dropdown>
  );
};
