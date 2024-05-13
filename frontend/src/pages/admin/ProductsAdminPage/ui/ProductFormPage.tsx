import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
  Button,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from 'flowbite-react';
import { CharacteristicDetail, ProductMutation } from '../model/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectCategories } from '../../../../features/categories/categoriesSlice';
import { selectBrands } from '../../../../features/brands/brandSlice';
import { getBrandAll } from '../../../../features/brands/brandThunk';
import { getAllCategory } from '../../../../features/categories/categoriesThunk';
import { createProduct } from '../../../../features/products/productsThunk';

export const ProductFormPage = () => {
  const [product, setProduct] = useState<ProductMutation>({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    characteristics: [],
    image: null,
  });
  const [characteristic, setCharacteristic] = useState('');
  const [characteristics, setCharacteristics] = useState<
    CharacteristicDetail[]
  >([]);
  const [characteristicsValue, setCharacteristicsValue] =
    useState<CharacteristicDetail>({
      name: '',
      value: '',
    });
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [imageData, setImageData] = useState('');
  const categories = useAppSelector(selectCategories);
  const brands = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBrandAll());
    dispatch(getAllCategory());
  }, [dispatch]);

  const changeField = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addChar = () => {
    setCharacteristics((prevState) => [...prevState, characteristicsValue]);
    setCharacteristicsValue({
      name: '',
      value: '',
    });
  };

  const addCharToProduct = () => {
    setProduct((prevState) => ({
      ...prevState,
      characteristics: [
        ...prevState.characteristics,
        { title: characteristic, characteristic: characteristics },
      ],
    }));
    setCharacteristic('');
    setCharacteristics([]);
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
      setProduct((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setProduct((prevState) => ({
      ...prevState,
      image: null,
    }));
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  const createProductHandle = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createProduct(product)).unwrap();
    setProduct({
      name: '',
      description: '',
      price: '',
      image: null,
      category: '',
      brand: '',
      characteristics: [],
    });
    setFilename('');
    setImageData('');
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  return (
    <form
      onSubmit={createProductHandle}
      className="w-full flex flex-col gap-y-3 my-16"
    >
      <h2 className="text-4xl font-bold dark:text-white">
        Form for create product
      </h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color="success" value="Name product" />
        </div>
        <TextInput
          id="username"
          placeholder="Nvidia RTX 4090..."
          name="name"
          value={product.name}
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
      <div className="flex gap-x-3">
        <div className="w-[50%]">
          <div className="mb-2 block">
            <Label htmlFor="categories" value="Select category" />
          </div>
          <Select
            name="category"
            value={product.category}
            onChange={changeField}
            id="categories"
            required
          >
            <option></option>
            {categories.map((category) => (
              <option value={category._id}>{category.title}</option>
            ))}
          </Select>
        </div>
        <div className="w-[50%]">
          <div className="mb-2 block">
            <Label htmlFor="brand" value="Select brand" />
          </div>
          <Select
            name="brand"
            value={product.brand}
            onChange={changeField}
            id="brand"
            required
          >
            <option></option>
            {brands.map((brand) => (
              <option value={brand._id} className="uppercase">
                {brand.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color="success" value="Price" />
        </div>
        <TextInput
          id="username"
          placeholder="Nvidia RTX 4090..."
          name="price"
          value={product.price}
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
      <div className="flex flex-col gap-y-3">
        {product.characteristics.map((char) => (
          <>
            <h4>{char.title}</h4>
            {char.characteristic.map((item) => (
              <p>
                {item.name} - {item.value}
              </p>
            ))}
          </>
        ))}
        <div className="mb-2 block">
          <Label htmlFor="username3" color="success" value="Char" />
        </div>
        <TextInput
          id="username"
          placeholder="Nvidia RTX 4090..."
          value={characteristic}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCharacteristic(event.target.value)
          }
          // color="success"
          // helperText={
          //   <>
          //     <span className="font-medium">Alright!</span> Username available!
          //   </>
          // }
        />
        <div className="flex w-full gap-x-3 flex-col">
          {characteristics.map((char) => (
            <p>
              {char.name} - {char.value}
            </p>
          ))}
          <div className="w-full flex gap-x-3">
            <div className="w-[50%]">
              <TextInput
                id="username"
                placeholder="Socket"
                name="title"
                value={characteristicsValue.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCharacteristicsValue((prevState) => ({
                    ...prevState,
                    name: event.target.value,
                  }))
                }
                // color="success"
                // helperText={
                //   <>
                //     <span className="font-medium">Alright!</span> Username available!
                //   </>
                // }
              />
            </div>
            <div className="w-[50%]">
              <TextInput
                placeholder="123"
                name="value"
                value={characteristicsValue.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCharacteristicsValue((prevState) => ({
                    ...prevState,
                    value: event.target.value,
                  }))
                }
                // color="success"
                // helperText={
                //   <>
                //     <span className="font-medium">Alright!</span> Username available!
                //   </>
                // }
              />
            </div>
            <button type="button" onClick={addChar}>
              add
            </button>
          </div>
        </div>
        <button type="button" onClick={addCharToProduct}>
          add
        </button>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Description" />
        </div>
        <Textarea
          id="comment"
          name="description"
          onChange={changeField}
          placeholder="Leave a comment..."
          required
          rows={4}
        />
      </div>
      <div className="flex w-full items-center justify-center">
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
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
      </div>
      <Button
        type="submit"
        className="uppercase"
        gradientDuoTone="purpleToBlue"
      >
        create
      </Button>
    </form>
  );
};
