import React, { FC } from 'react';
import Password from '../../components/Password/Password';
import './Home.scss';

const Home: FC = () => {
  const password = {
    id: 12,
    title: '撒打算大撒打算的',
    value: '/src/components/Password/Password.tsx hot updated due to change i',
    createAt: '2020-12-20 12:20:20'
  };

  return (
    <div className='password-wrapper'>
      <div className='password-item'>
        <Password {...password} />
      </div>
      <div className='password-item'>
        <Password {...password} />
      </div>
      <div className='password-item'>
        <Password {...password} />
      </div>
    </div>
  );
};

export default Home;
