import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalMessage } from '../../store/actions';
import { Alert } from '@material-ui/lab';
import { defaultState } from 'store/reducers';
import { MessageType } from '../../enums';

const Toast = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { message, type } = useSelector<defaultState, { message: string; type: MessageType }>(
    state => ({
      message: state.message,
      type: state.type as MessageType
    })
  );
  const dispatch = useDispatch();
  const timeout = useRef<any>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      dispatch(setGlobalMessage({ type: MessageType.None, message: '' }));
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
      <Alert onClose={handleClose} severity={type as any}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
