import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  createCategory,
  getCategorySingle,
  updateCategory,
} from '../../../../features/categories/categoriesThunk';
import { selectCategory } from '../../../../features/categories/categoriesSlice';

export const CategoryFormPage = () => {
  const [category, setCategory] = useState<CategoryMutation>({
    title: '',
    image: null,
  });
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [imageData, setImageData] = useState('');
  const { id } = useParams() as { id: string };
  const categoryApi = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getCategorySingle(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && categoryApi) {
      setCategory((prevState) => ({
        ...prevState,
        ...categoryApi,
      }));
      setFilename(categoryApi.image);
      setImageData('http://localhost:3000/' + categoryApi.image);
    }
  }, [categoryApi, id]);

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const changeImageFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      setFilename(files[0].name);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageData(imageUrl);
      setCategory((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setCategory((prevState) => ({
      ...prevState,
      logo: null,
    }));
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  const createCategoryHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (id) {
      await dispatch(updateCategory({ id, category })).unwrap();
    } else {
      await dispatch(createCategory(category)).unwrap();
    }
    setCategory({
      title: '',
      image: null,
    });
    setFilename('');
    setImageData('');
    navigate(-1);
  };

  return (
    <form
      onSubmit={createCategoryHandle}
      className="w-full flex flex-col gap-y-3 my-16"
    >
      <h2 className="text-4xl font-bold dark:text-white">
        Form for create brand
      </h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" color="success" value="Title" />
        </div>
        <TextInput
          id="title"
          placeholder="GPU"
          name="title"
          value={category.title}
          onChange={changeField}
          required
          // color="success"
          // helperText={
          //   <>
          //     <span className="font-medium">Alright!</span> Username available!
          //   </>
          // }
        />
      </div>
      {filename.length !== 0 ? (
        <div className="w-full relative bg-gray-100 rounded">
          <button
            className="absolute top-[5px] right-[10px] bg-red-600 text-white"
            onClick={clearImageField}
          >
            clear
          </button>
          <img
            className="h-auto max-w-lg rounded-lg mx-auto"
            src={imageData}
            alt="image"
          />
        </div>
      ) : (
        <Label
          onClick={selectImage}
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            name="image"
            onChange={changeImageFiled}
            id="dropzone-file"
            className="hidden"
          />
        </Label>
      )}
      <Button
        type="submit"
        className="uppercase"
        gradientDuoTone="purpleToBlue"
      >
        {id ? 'update' : 'create'}
      </Button>
    </form>
  );
};
