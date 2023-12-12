import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterAccount() {
  const [credentials, setCredentials] = useState([]);

  const navigate = useNavigate();

  const credential_id = localStorage.getItem('dating_site_id');

  // if (credential_id !== null || ' ') {
  //   return navigate((window.location.href = '/home'));
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setCredentials((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_DATING_SITE}/account.php`, credentials)
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          navigate('/');
        }
      });
  };
  return (
    <div className="flex justify-center flex-col items-center w-full h-screen">
      <h1 className="font-bold text-2xl my-2">Register Account</h1>

      <div className="border-2 w-[40rem] p-4 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg ">
        <form className="w-full" onSubmit={handleSubmit}>
          {/* <div>
            <Label>Fullname:</Label>
            <Input
              required
              onChange={handleChange}
              type="text"
              name="fullname"
            />
          </div> */}

          <div>
            <Label>Username:</Label>
            <Input
              required
              onChange={handleChange}
              type="text"
              name="username"
            />
          </div>

          <div>
            <Label>Password:</Label>
            <Input
              required
              onChange={handleChange}
              type="password"
              name="password"
            />
          </div>

          <Button className="my-2" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
