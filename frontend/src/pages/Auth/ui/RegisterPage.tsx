import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterMutation } from '../../../@types/auth';
import { useAppDispatch } from '../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../features/auth/authThunk';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    displayName: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      toast.success('Yes!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Bad!');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={sendFormHandler} className="flex flex-col">
        <div>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={changeField}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="displayName"
            value={state.displayName}
            onChange={changeField}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={changeField}
            required
          />
        </div>
        <button type="submit">sign up</button>
      </form>
    </div>
  );
};