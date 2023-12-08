import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

export default function Login() {
  const [loginDetails, setLoginDetails] = useState([]);

  if (localStorage.getItem('dating_site_id')) {
    window.location.href = '/home';
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setLoginDetails((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/login.php`, {
        params: loginDetails,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success');
          localStorage.setItem('dating_site_id', res.data[0].credential_id);

          window.location.href = '/settingup-account';
        }
      });
  };

  return (
    <div className="w-full h-screen border-2 flex justify-center items-center flex-col text-center">
      <div>
        {/* <img src={Logo} alt="logo" className="w-[20rem]" /> */}

        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center "
        >
          <Input
            type="text"
            placeholder="Email"
            className="mb-2"
            name="username"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-2"
            name="password"
            onChange={handleChange}
          />
          <Button className="w-[80%]" type="submit">
            Login
          </Button>
        </form>

        <span className="mt-5 block">
          Don't have an account?
          <Link to="/register" className="text-green-500 ml-2">
            click me
          </Link>
        </span>
      </div>
    </div>
  );
}
