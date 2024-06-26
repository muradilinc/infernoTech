import { Avatar, Button, Table } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectProducts } from '../../../../features/products/productsSlice';
import { useEffect } from 'react';
import {
  deleteProduct,
  getProductAll,
} from '../../../../features/products/productsThunk';
import { API_LINK } from '../../../../app/constants';
import { Link, useNavigate } from 'react-router-dom';

export const ProductTable = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductAll());
  }, [dispatch]);

  const deleteProductHandle = async (id: string) => {
    await dispatch(deleteProduct(id)).unwrap();
    await dispatch(getProductAll());
  };

  return (
    <div className="flex flex-col w-full gap-y-3 my-[30px]">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate('/admin/products-submit')}
          gradientDuoTone="purpleToPink"
        >
          Create
        </Button>
      </div>
      <div className="overflow-x-auto w-full">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Brand</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product) => (
              <Table.Row
                key={product._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </Table.Cell>
                <Table.Cell className="flex gap-x-3 items-center">
                  {product.brand ? (
                    <>
                      <Avatar img={API_LINK + '/' + product.brand.logo} />
                      {product.brand.name}
                    </>
                  ) : (
                    <p>no brand!</p>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {product.category ? product.category.title : 'no category!'}
                </Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/admin/products-submit/${product._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <button
                    type="button"
                    onClick={() => deleteProductHandle(product._id)}
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
