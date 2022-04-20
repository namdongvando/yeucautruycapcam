import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { Header } from 'components/Common/Header';
import { Sidebar } from 'components/Common/Sidebar';
import { Children, useState } from 'react';
// import ProfilePage from 'features/profile/pages/ProfilePage';

// import * as React from 'react';
// import { Switch, Route } from 'react-router-dom';
// import AppRouter from 'routes/AppRouter';
// import styled from '@emotion/styled';

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

const MainLayout = (props: { children: any }) => {
  const classes = useStyles();
  const [showResults, setShowResults] = useState(true);
  const { children } = props;
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      {showResults ? (
        <Box className={classes.sidebar}>
          <Sidebar />
        </Box>
      ) : null}

      <Box className={classes.main}>
        {/* <AppRouter /> */}
        {children}
        {/* <Switch>
          <Route path="/profile">
            <ProfilePage />
          </Route>
        </Switch> */}
      </Box>
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
