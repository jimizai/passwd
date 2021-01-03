import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalMessage } from '../../store/actions';
import { Alert } from '@material-ui/lab';
import { defaultState } from 'store/reducers';

const Toast = () => {
  const [open, setOpen] = useState<boolean>(false);
  const message = useSelector<defaultState, string>(state => state.message);
  const dispatch = useDispatch();
  const timeout = useRef<any>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      dispatch(setGlobalMessage(''));
    }, 100);
  }, []);

  useEffect(() => {
    if (message) {
      if (timeout.current) {
        return;
      }
      setOpen(true);
      timeout.current = setTimeout(() => {
        timeout.current = null;
        handleClose();
      }, 3000);
    }
    return () => {
      clearTimeout(timeout.current);
      timeout.current = null;
    };
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='error'>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
