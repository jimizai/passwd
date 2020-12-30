import React, { FC } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import './Password.scss';

interface P {
  id: number;
  title: string;
  value: string;
  createAt: string;
}

const Password: FC<P> = props => {
  return (
    <div className='password-container'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1'>
                {props.title}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {props.value}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                ID: {props.id}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                CreateAt: {props.createAt}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' style={{ cursor: 'pointer' }}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    console.log('edit');
                  }}
                >
                  Edit
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              <Button>Remove</Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Password;
