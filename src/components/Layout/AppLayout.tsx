
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header } from 'components/Common/Header';
import { Sidebar } from 'components/Common/Sidebar';
import * as React from 'react';
import { Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid whitesmoke`,
    backgroundColor: 'white',
  },
  main: {
    gridArea: 'main',
    backgroundColor: 'white',
    padding: '16px',
  },
}));

export function AppLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>

        </Switch>
      </Box>
    </Box>
  );
}
