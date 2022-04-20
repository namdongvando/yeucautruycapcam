// import HomePage from 'app/pages/HomePage';

import MainLayout from 'components/Layout/MainLayout';
import LoginPage from 'features/auth/pages/LoginPage';
import PasswordPage from 'features/auth/pages/PasswordPage';
import { DashboardPage } from 'features/dashboard/pages/DashboardPage';
import ProfilePage from 'features/profile/pages/ProfilePage';
import YeucauPage from 'features/yeucau/pages/YeucauPage';

const routes = [
  {
    path: '/',
    key: 'DashboardPage',
    component: DashboardPage,
    layout: MainLayout,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'ProfilePage',
    path: '/profile',
    component: ProfilePage,
    layout: MainLayout,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'YEUCAU',
    path: '/yeucau',
    component: YeucauPage,
    layout: MainLayout,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'LoginPage',
    path: '/login',
    component: LoginPage,
    layout: null,
    isPrivate: false,
    exact: true,
  },
  {
    key: 'PASSWORD',
    path: '/password',
    component: PasswordPage,
    layout: MainLayout,
    isPrivate: true,
    exact: true,
  },
];

export default routes;
