import { Product } from '../../../features/products/productsSlice';
import React from 'react';
import { API_LINK } from '../../../app/constants';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div
      className="max-w-sm flex flex-col border border-gray-400 rounded-[8px]"
    >
      <Link to={`/product/${product._id}`}>
        <img className="max-h-[250px] w-[350px] rounded-tr-[8px] rounded-tl-[8px]" src={API_LINK + '/' + product.image} alt={product.image} />
        <div className="p-5">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <p className="font-normal flex-grow text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
          <p>store: {product.store.displayName}</p>
        </div>
      </Link>
    </div>
  );
};
