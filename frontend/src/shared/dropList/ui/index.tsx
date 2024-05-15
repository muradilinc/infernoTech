import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectCategories } from '../../../features/categories/categoriesSlice';
import { getAllCategory } from '../../../features/categories/categoriesThunk';
import { Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';

export const DropList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <Dropdown label="Catalog" inline>
      {categories.map((category) => (
        <Dropdown.Item key={category._id}>
          <Link to={`/category/${category._id}`}>{category.title}</Link>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
