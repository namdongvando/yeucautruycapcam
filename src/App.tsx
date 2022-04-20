import { CssBaseline } from '@mui/material';
import { PageNotFound, PrivateRoute } from 'components/Common';
import { AppLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // tslint:disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="">
            <AppLayout />
          </PrivateRoute>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </LocalizationProvider>
    </>
  );
}

export default App;
