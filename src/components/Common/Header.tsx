import {
  AppBar,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { push } from 'connected-react-router';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { put } from 'redux-saga/effects';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { PeopleAlt } from '@mui/icons-material';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div': {
      backgroundColor: '#fff',
    },
  },
}));

export function Header() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleLogoutClick = () => {
    if (window.confirm('Bạn muốn đăng xuất?') == true) {
      dispatch(authActions.logout());
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HT-CM
            <Button>
              <ListItemIcon>
                <DehazeOutlinedIcon />
              </ListItemIcon>
            </Button>
          </Typography>
          <Button
            id="basic-button"
            color="inherit"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            Tài Khoản
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <NavLink to="/profile" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Thông tin tài khoản" />
              </ListItem>
            </NavLink>
            <NavLink to="/password" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Bảo Mật" />
              </ListItem>
            </NavLink>
            <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
