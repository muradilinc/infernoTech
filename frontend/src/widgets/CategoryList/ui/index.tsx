import React from 'react';
import { Category } from '../../../features/categories/categoriesSlice';
import { Card } from 'flowbite-react';
import { API_LINK } from '../../../app/constants';
import { Link } from 'react-router-dom';

interface Props {
  categories: Category[];
  brand?: string;
}

export const CategoryList: React.FC<Props> = ({ categories, brand }) => {
  return (
    <div className="flex items-center gap-x-3 my-[25px]">
      {categories.map((category) => (
        <Card
          className="max-w-sm"
          imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
          imgSrc={API_LINK + '/' + category.image}
        >
          <Link
            to={brand ? `/products/${brand}` : `/products/${category.title}`}
          >
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {category.title}
            </h5>
          </Link>
        </Card>
      ))}
    </div>
  );
};
