import React, { useCallback, useState, FC } from 'react';
import {
  DialogActions,
  Dialog,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton
} from '@material-ui/core';
import { Refresh, Add } from '@material-ui/icons';
import { randomStr } from '../../utils';
import './Form.scss';

interface P {
  onSubmit: (params: { key: string; value: string }) => void;
}

const PasswordForm: FC<P> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState([
    { label: 'name', error: false, value: '', prop: 'key' },
    { label: 'password', error: false, value: '', prop: 'value' }
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = useCallback(() => {
    setForm(data => data.map(item => ({ ...item, value: '' })));
  }, []);

  const handleSubmit = useCallback(() => {
    let match = false;
    setForm(data =>
      data.map(item => {
        if (!item.value) {
          match = true;
          return { ...item, error: true };
        }
        return item;
      })
    );

    if (match) {
      return;
    }

    const params = form.reduce((prev, item) => ({ ...prev, [item.prop]: item.value }), {}) as {
      key: string;
      value: string;
    };
    props.onSubmit(params);
    setOpen(false);
    resetForm();
  }, [form]);

  return (
    <div className='password-form-wrapper'>
      <Button className='plus' variant='contained' color='primary' onClick={handleClickOpen}>
        <Add />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Edit Password Form</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {form.map((item, index) => (
              <TextField
                key={index}
                required
                value={item.value}
                onChange={e => {
                  setForm(data =>
                    data.map((item, indd) =>
                      indd === index ? { ...item, value: e.target.value } : item
                    )
                  );
                }}
                className='mb-4'
                error={item.error}
                label={item.label}
                variant='outlined'
                helperText={item.error ? `${item.label} is invalid` : ''}
              />
            ))}
            <IconButton
              className='refresh-btn'
              onClick={() => {
                setForm(data =>
                  data.map((item, indd) => {
                    if (indd === 1) {
                      return {
                        ...item,
                        value: randomStr()
                      };
                    }
                    return item;
                  })
                );
              }}
            >
              <Refresh />
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordForm;
