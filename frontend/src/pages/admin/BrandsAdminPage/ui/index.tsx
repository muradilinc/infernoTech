import { useEffect } from 'react';
import { Avatar, Button, Table } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectBrands } from '../../../../features/brands/brandSlice';
import {
  deleteBrand,
  getBrandAll,
} from '../../../../features/brands/brandThunk';
import { API_LINK } from '../../../../app/constants';

export const BrandsTable = () => {
  const navigate = useNavigate();
  const brands = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBrandAll());
  }, [dispatch]);

  const deleteBrandHandle = async (id: string) => {
    await dispatch(deleteBrand(id)).unwrap();
    await dispatch(getBrandAll());
  };

  return (
    <div className="flex flex-col w-full gap-y-3 my-[30px]">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate('/admin/brands-submit')}
          gradientDuoTone="purpleToPink"
        >
          Create
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Brand name</Table.HeadCell>
            <Table.HeadCell>Logo</Table.HeadCell>
            <Table.HeadCell>Items</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {brands.map((brand) => (
              <Table.Row
                key={brand._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {brand.name.toUpperCase()}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-start">
                    <Avatar img={API_LINK + '/' + brand.logo} size="md" />
                  </div>
                </Table.Cell>
                <Table.Cell>{brand.productLength}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/admin/brands-submit/${brand._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <button
                    type="button"
                    onClick={() => deleteBrandHandle(brand._id)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
