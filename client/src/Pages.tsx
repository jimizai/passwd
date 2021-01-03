import React, { FC, useRef, useState } from 'react';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Container,
  Menu,
  MenuItem
} from '@material-ui/core';
import { useStyles } from './hooks';
import Home from './pages/Home/Home';
import { useSelector, useDispatch } from 'react-redux';
import { State } from './store';
import { setToken } from './store/actions';

const Pages: FC<RouteComponentProps> = props => {
  const { token, userName } = useSelector<State, State>(state => state);
  const dispatch = useDispatch();
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const classes = useStyles();
  if (window.location.hash.indexOf('login') === -1 && !token) {
    return <Redirect to='/login' />;
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setToken(''));
    props.history.push('/login');
  };

  return (
    <div className='application'>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu' />
            <Typography className={classes.title} variant='h6'>
              Passwd
            </Typography>
            <Avatar className='text-pointer' onClick={() => setOpen(true)}>
              N
            </Avatar>
            <Button
              ref={anchorRef}
              aria-controls='simple-menu'
              aria-haspopup='true'
              color='inherit'
              onClick={() => setOpen(true)}
            >
              {userName}
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorRef.current}
              keepMounted
              open={open}
              onClose={() => setOpen(false)}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth='md'>
        <Route path='/' component={Home} />
      </Container>
    </div>
  );
};

export default Pages;
