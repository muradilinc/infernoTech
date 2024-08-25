import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { getSingleStore } from '../../../../features/store/storeThunk';
import { selectStore } from '../../../../features/store/storeSlice';

export const StorePage = () => {
  const store = useAppSelector(selectStore);
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleStore(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1>Name: {store?.displayName}</h1>
    </div>
  );
};