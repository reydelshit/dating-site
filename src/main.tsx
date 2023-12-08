import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './root/Root.tsx';
import Login from './components/Login.tsx';
import RegisterAccount from './components/RegisterAccount.tsx';
import SettingUpAccount from './components/SettingUpAccount.tsx';
import Home from './components/Home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/settingup-account',
        element: <SettingUpAccount />,
      },

      {
        path: '/home',
        element: <Home />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <RegisterAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
