import React, { FC, useCallback } from 'react';
import Password from '../../components/Password/Password';
import PasswordForm from '../../components/Password/Form';
import { TypographyProps, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { getPasswords, createPassword, delPassword } from '../../api';
import { useQuery, useMutation } from '../../hooks';
import { setGlobalMessage } from '../../store/actions';
import { MessageType } from '../../enums';
import { useDispatch } from 'react-redux';
import './Home.scss';

const variants = ['h1', 'h3', 'body1', 'caption'] as TypographyProps['variant'][];

const Home: FC = () => {
  const { loading, data, refetch } = useQuery(getPasswords, {
    variables: {
      current: 1,
      page_size: 10
    }
  });
  const [create] = useMutation(createPassword);
  const [del] = useMutation(delPassword);
  const dispatch = useDispatch();

  const handleDelete = useCallback((id: number) => {
    del({
      variables: { id },
      update(result) {
        if (result!.code === 200) {
          dispatch(setGlobalMessage({ type: MessageType.Success, message: 'success!' }));
          refetch();
        }
      }
    });
  }, []);

  if (loading) {
    return (
      <div>
        {Array.from({ length: 4 }).map((_, index) =>
          variants.map(variant => (
            <Typography component='div' key={`${index} ${variant}`} variant={variant}>
              <Skeleton />
            </Typography>
          ))
        )}
      </div>
    );
  }

  return (
    <div className='password-wrapper'>
      <PasswordForm
        onSubmit={params => {
          create({
            variables: params,
            update(result) {
              if (result!.code === 200) {
                dispatch(setGlobalMessage({ type: MessageType.Success, message: 'success!' }));
                refetch();
              }
            }
          });
        }}
      />
      {data?.data
        .map((item: any) => ({ ...item, title: item.key, createdAt: item.created_at }))
        .map((password: any, key: number) => (
          <div className='password-item' key={key}>
            <Password {...password} onDelete={handleDelete} />
          </div>
        ))}
    </div>
  );
};

export default Home;
