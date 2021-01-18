import React, { FC, useState, useCallback } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { matchEmail } from '../../utils/shared';
import { login, signup } from '../../api';
import { useMutation } from '../../hooks';
import { setUserInfo } from '../../store/actions';
import './Login.scss';

interface Form {
  email: string;
  username: string;
  password: string;
}

enum FormTypeEnum {
  Login = 'login',
  Signup = 'signup'
}

type FormError = { [key in keyof Form]: boolean };

const Login: FC<RouteChildrenProps> = props => {
  const [doLogin] = useMutation(login);
  const [doSignup] = useMutation(signup);
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>({
    email: '',
    username: '',
    password: ''
  });

  const [type, setType] = useState<FormTypeEnum>(FormTypeEnum.Login);

  const [formError, setFormError] = useState<FormError>({
    email: false,
    password: false,
    username: false
  });

  const handleForm = useCallback(
    (key: keyof Form) => (e: any) => setForm(form => ({ ...form, [key]: e.target.value })),
    []
  );

  const handleFormError = useCallback((form: Partial<FormError>) => {
    setFormError(oldForm => ({ ...oldForm, ...form }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!matchEmail(form.email)) {
      handleFormError({ email: true });
      return;
    } else {
      handleFormError({ email: false });
    }
    if (!form.password) {
      handleFormError({ password: true });
      return;
    } else {
      handleFormError({ password: false });
    }
    if (!form.username && FormTypeEnum.Signup === type) {
      handleFormError({ username: true });
      return;
    } else {
      handleFormError({ username: false });
    }
    const request = FormTypeEnum.Signup === type ? doSignup : doLogin;

    request({
      variables: form,
      update(result) {
        if (result!.code === 200) {
          dispatch(setUserInfo(result!.data));
          props.history.push('/');
        }
      }
    });
  }, [form]);

  return (
    <div className='login-wrapper'>
      <div className='container'>
        <div className='login-container bg-white'>
          <div className='login-header'>PASSWD</div>
          <div className='login-body'>
            <TextField
              error={formError.email}
              required
              fullWidth
              label='Email'
              value={form.email}
              onChange={handleForm('email')}
            />
            {FormTypeEnum.Signup === type && (
              <TextField
                className='mt-12'
                error={formError.username}
                required
                fullWidth
                label='Username'
                value={form.username}
                onChange={handleForm('username')}
              />
            )}
            <TextField
              error={formError.password}
              className='mt-12'
              value={form.password}
              required
              fullWidth
              label='Password'
              type='password'
              onChange={handleForm('password')}
              autoComplete='current-password'
            />
            <Button
              className='mt-20'
              color='primary'
              fullWidth
              variant='contained'
              onClick={handleSubmit}
            >
              Sign {FormTypeEnum.Login === type ? 'in' : 'up'}
            </Button>
            <Button
              size='small'
              className='mt-10 float-right'
              onClick={() => {
                setType(FormTypeEnum.Login === type ? FormTypeEnum.Signup : FormTypeEnum.Login);
              }}
            >
              {FormTypeEnum.Login === type ? 'Sign up' : 'Log in'}
            </Button>
            <div className='clearfix' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
