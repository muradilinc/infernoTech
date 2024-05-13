import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectCategories } from '../../../../features/categories/categoriesSlice';
import {
  deleteCategory,
  getAllCategory,
} from '../../../../features/categories/categoriesThunk';
import { Avatar, Button, Table } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { API_LINK } from '../../../../app/constants';

export const CategoriesTable = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const deleteCategoryHandle = async (id: string) => {
    await dispatch(deleteCategory(id)).unwrap();
    await dispatch(getAllCategory());
  };

  return (
    <div className="flex flex-col w-full gap-y-3 my-[30px]">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate('/admin/categories-submit')}
          gradientDuoTone="purpleToPink"
        >
          Create
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Items</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categories.map((category) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {category.title}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-start">
                    <Avatar img={API_LINK + '/' + category.image} size="lg" />
                  </div>
                </Table.Cell>
                <Table.Cell>{category.productLength}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <button
                    type="button"
                    onClick={() => deleteCategoryHandle(category._id)}
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
