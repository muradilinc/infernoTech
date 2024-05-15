import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectBrands } from '../../../features/brands/brandSlice';
import { useEffect } from 'react';
import { getBrandAll } from '../../../features/brands/brandThunk';
import { API_LINK } from '../../../app/constants';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export const BrandList = () => {
  const brands = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBrandAll());
  }, [dispatch]);

  function SampleNextArrow(props: {
    className?: string;
    onClick?: () => void;
  }) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: 'block',
          background: 'gray',
          borderRadius: '50px',
          width: '20px',
          height: '18px',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: {
    className?: string;
    onClick?: () => void;
  }) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: 'block',
          background: 'gray',
          borderRadius: '50px',
          width: '20px',
          height: '18px',
        }}
        onClick={onClick}
      >
        lol
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="flex flex-col gap-y-3 my-[25px]">
      <h4 className="text-4xl font-bold dark:text-white">Знаменитые бренды</h4>
      <div className="slider-container">
        <Slider {...settings}>
          {brands.map((brand) => (
            <Link key={brand._id} to={`/brands/${brand._id}`}>
              <img
                className="mx-[15px] max-h-[120px]"
                src={API_LINK + '/' + brand.logo}
                alt={brand.name}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};
