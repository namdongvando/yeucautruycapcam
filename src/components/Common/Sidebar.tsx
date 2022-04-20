import { Dashboard, PeopleAlt } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from 'app/hooks';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div': {
      backgroundColor: 'whitesmoke',
    },
  },
}));

export function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/yeucau" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Yêu Cầu" />
          </ListItem>
        </NavLink>
        {/* <NavLink to="/" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Khách hàng" />
          </ListItem>
        </NavLink>

        <NavLink to="/profile" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Tài khoản" />
          </ListItem>
        </NavLink> */}
      </List>
    </div>
  );
}
