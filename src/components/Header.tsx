import { Link } from 'react-router-dom';

import { Button } from './ui/button';

export default function Header() {
  const credential_id = localStorage.getItem('dating_site_id');

  const handleLogout = () => {
    localStorage.removeItem('dating_site_id');
    window.location.href = '/login';
  };
  return (
    <header className="h-[8rem] border-2 flex items-center p-4 justify-end w-full">
      <div className="flex gap-2 items-center">
        {/* <Button onClick={handleLogout} className="bg-[#618264]">
          Logout
        </Button> */}
        {credential_id ? (
          <div className="flex items-center gap-2">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
