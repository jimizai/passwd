import React, { FC, useState, useCallback } from 'react';
import { Button, TextField } from '@material-ui/core';
import { matchEmail } from '../../utils/shared';
import './Login.scss';

interface Form {
  email: string;
  password: string;
}

type FormError = { [key in keyof Form]: boolean };

const Login: FC = props => {
  const [form, setForm] = useState<Form>({
    email: '',
    password: ''
  });

  const [formError, setFormError] = useState<FormError>({ email: false, password: false });

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

    console.log(form);
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
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
