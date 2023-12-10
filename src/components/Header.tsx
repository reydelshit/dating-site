import { Link, useLocation } from 'react-router-dom';

import { Button } from './ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Default from '@/assets/default.jpg';
export default function Header() {
  const credential_id = localStorage.getItem('dating_site_id');
  const [userImage, setUserImage] = useState('');
  const [fullname, setFullname] = useState('');
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('dating_site_id');
    window.location.href = '/login';
  };

  const fetchInterestFromProfile = () => {
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        params: { credential_id },
      })
      .then((res) => {
        console.log(res.data);
        setUserImage(res.data[0].profile);
        setFullname(res.data[0].fullname);
      });
  };

  useEffect(() => {
    fetchInterestFromProfile();
  }, []);

  return (
    <header className="h-[8rem] border-2 border-red-500 flex items-center p-4 justify-end w-full">
      <div className="flex gap-2 items-center w-full">
        {credential_id ? (
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              <img
                className="w-[5rem] rounded-full h-[5rem] object-cover"
                src={userImage ? userImage : Default}
                alt="image"
              />
              <h1 className="text-2xl">{fullname}</h1>

              {location.pathname !== '/settingup-account' && (
                <div className="ml-[2rem] flex gap-4">
                  <Link to="/profile">
                    <Button>Profile</Button>
                  </Link>

                  {location.pathname !== '/home' && (
                    <Link to="/home">
                      <Button>Find Match</Button>
                    </Link>
                  )}
                </div>
              )}
            </div>

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
