import { Card } from 'flowbite-react';
import { Product } from '../../../features/products/productsSlice';
import React from 'react';
import { API_LINK } from '../../../app/constants';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={API_LINK + '/' + product.image}
    >
      <Link to={`/product/${product._id}`}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
      </Link>
    </Card>
  );
};
