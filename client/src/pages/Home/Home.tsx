import React, { FC } from 'react';
import Password from '../../components/Password/Password';
import { Button } from '@material-ui/core';
import { getPasswords } from '../../api';
import { useQuery } from '../../hooks';
import './Home.scss';

const Home: FC = () => {
  const { loading, data, refetch } = useQuery(getPasswords, {
    variables: {
      current: 1,
      page_size: 10
    }
  });

  // const password = {
  //   id: 12,
  //   title: '撒打算大撒打算的',
  //   value: '/src/components/Password/Password.tsx hot updated due to change i',
  //   createAt: '2020-12-20 12:20:20'
  // };

  return (
    <div className='password-wrapper'>
      <Button onClick={refetch}>Refresh</Button>
      {data?.data
        .map((item: any) => ({ ...item, title: item.key }))
        .map((password: any, key: number) => (
          <div className='password-item' key={key}>
            <Password {...password} />
          </div>
        ))}
    </div>
  );
};

export default Home;
