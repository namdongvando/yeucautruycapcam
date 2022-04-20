
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

export function Header() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HCM Datahub
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Đăng xuất
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}