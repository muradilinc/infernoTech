import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useEffect } from 'react';
import { getBrandSingle } from '../../../../features/brands/brandThunk';
import { selectBrand } from '../../../../features/brands/brandSlice';
import { CategoryList } from '../../../../widgets/CategoryList';
import { API_LINK } from '../../../../app/constants';

export const SingleBrandPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const brand = useAppSelector(selectBrand);

  useEffect(() => {
    dispatch(getBrandSingle(id));
  }, [dispatch, id]);

  if (!brand) {
    return 'Loadin!';
  }

  return (
    <div className="my-[20px]">
      <div className="flex items-center gap-x-3 bg-purple-400/[.4] backdrop-blur-lg border border-black">
        <img
          className="rounded-[50%] w-[140px] h-[120px]"
          src={API_LINK + '/' + brand.logo}
          alt={brand.name}
        />
        <h2 className="text-2xl font-bold">
          Shop All{' '}
          <span className="text-transparent capitalize bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {brand.name}
          </span>{' '}
          Products At InfernoTech
        </h2>
      </div>
      <CategoryList
        key={brand._id}
        categories={brand.categories}
        brand={brand._id}
      />
    </div>
  );
};
