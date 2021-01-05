import React, { FC, useState, useRef } from 'react';
import { Grid, Typography, Button, Popover } from '@material-ui/core';
import copy from 'copy-to-clipboard';
import './Password.scss';

interface P {
  id: number;
  title: string;
  value: string;
  createdAt: string;
  onDelete: (id: number) => void;
}

const Password: FC<P> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorEl = useRef<any>(null);

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
                <Button
                  color='primary'
                  size='small'
                  onClick={() => {
                    copy(props.value);
                  }}
                >
                  Copy
                </Button>
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                ID: {props.id}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                CreatedAt: {props.createdAt}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              <Popover
                open={open}
                anchorEl={anchorEl.current}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
              >
                <div className='password-content'>
                  <div>Are you sure to delete this task?</div>
                  <div className='password-bottom'>
                    <Button
                      size='small'
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      No
                    </Button>
                    <Button
                      color='primary'
                      size='small'
                      onClick={() => {
                        props.onDelete(props.id);
                        setOpen(false);
                      }}
                    >
                      Yes
                    </Button>
                    <div className='clearfix' />
                  </div>
                </div>
              </Popover>
              <Button
                ref={anchorEl}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Remove
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Password;
