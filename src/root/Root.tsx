import { Outlet, useLocation } from 'react-router-dom';

import App from '@/App';
import Header from '@/components/Header';

export default function Root() {
  const location = useLocation();

  const isLogin = localStorage.getItem('isLogin');

  if (!isLogin) {
    return (window.location.href = '/login');
  }

  return (
    <div className="w-full border-2">
      <Header />
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="w-full">
          {location.pathname === '/' ? <App /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}
