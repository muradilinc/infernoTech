import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginMutation } from '../../../@types/auth';
import { useAppDispatch } from '../../../app/store/hooks';
import { login } from '../../../features/auth/authThunk';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthPage = () => {
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendFromHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (error) {
      toast.error('Логин или пароль не верны!');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <form onSubmit={sendFromHandler} className="flex flex-col">
        <div>
          <input
            type="text"
            name="email"
            value={state.email}
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
        <button type="submit">sign in</button>
      </form>
      <Link to={'/register'}>sign up</Link>
    </div>
  );
};