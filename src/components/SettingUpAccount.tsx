import { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Default from '@/assets/photo_2023-06-30_21-14-04.jpg';

export default function SettingUpAccount() {
  const [profileDetails, setProfileDetails] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [warningSelections, setWarningSelections] = useState('');
  const [image, setImage] = useState('');
  const [lookingFor, setLookingFor] = useState('' as string);
  const navigate = useNavigate();
  const credential_id = localStorage.getItem('dating_site_id');

  useEffect(() => {
    checkIfAlreadySetupAccount();
  }, []);

  const checkIfAlreadySetupAccount = () => {
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        params: { credential_id },
      })
      .then((res) => {
        if (res.data.length > 0) {
          return navigate('/home');
        }
        console.log(res.data);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setProfileDetails((values) => ({ ...values, [name]: value }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.readAsDataURL(e.target.files![0]);

    data.onloadend = () => {
      const base64 = data.result;
      if (base64) {
        setImage(base64.toString());

        // console.log(base64.toString());
      }
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedInterestsString = selectedInterests.join(', ');
    axios
      .post(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        ...profileDetails,
        interest: selectedInterestsString,
        profile: image,
        looking_for: lookingFor,
        credential_id,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          navigate('/home');
        }
      });
  };

  const handleLookingFor = (value: string) => {
    console.log(value);

    if (value === 'casual') {
      setLookingFor('Something Casual');
    } else if (value === 'long') {
      setLookingFor('Long Term');
    } else if (value === 'short') {
      setLookingFor('Short Term');
    } else if (value === 'buddy') {
      setLookingFor('Study Buddy');
    }
  };

  const handleCheckboxChange = (interest: string) => {
    const isSelected = selectedInterests.includes(interest);
    const maxSelections = 3;

    if (isSelected) {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((item) => item !== interest),
      );
    } else {
      if (selectedInterests.length < maxSelections) {
        setSelectedInterests((prevInterests) => [...prevInterests, interest]);
      } else {
        console.log('Maximum selections reached');
        setWarningSelections(
          'Maximum selections reached . only selected the first 3',
        );
      }
    }

    console.log(selectedInterests);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen flex-col">
      <h1 className="text-2xl my-4 font-bold">Setting Up Account</h1>

      <div className="w-[50rem] border-2 p-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between ">
            <img
              className="w-[12rem] h-[12rem] object-cover rounded-md"
              src={image.length > 0 ? image : Default}
              alt="profile"
            />
            <Input
              required
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              name="image"
              className="my-2 w-[30rem]"
            />
          </div>

          <div className="flex justify-between gap-2">
            <div className="w-full">
              <Label>Fullname:</Label>
              <Input
                required
                onChange={handleChange}
                type="text"
                name="fullname"
              />
            </div>
            <div className="w-full">
              <Label>Gender:</Label>
              <Input
                required
                onChange={handleChange}
                type="text"
                name="gender"
              />
            </div>

            <div className="w-full">
              <Label>Age:</Label>
              <Input required onChange={handleChange} type="text" name="age" />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="w-full">
              <Label>Year:</Label>
              <Input required onChange={handleChange} type="text" name="year" />
            </div>

            <div className="w-full">
              <Label>Course:</Label>
              <Input
                required
                onChange={handleChange}
                type="text"
                name="course"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <Label>Municipality:</Label>
              <Input
                required
                onChange={handleChange}
                type="text"
                name="municipality"
              />
            </div>

            <div className="w-full">
              <Label>Province:</Label>
              <Input
                required
                onChange={handleChange}
                type="text"
                name="province"
              />
            </div>
          </div>

          <div>
            <Label>
              Interests (select only 3){' '}
              <span className="text-red-500">{warningSelections}</span>
            </Label>
            <div className="grid grid-cols-4">
              <div className="flex items-center gap-2">
                <Input
                  className="w-[1rem]"
                  name="Music"
                  type="checkbox"
                  onChange={() => handleCheckboxChange('Music')}
                />
                <Label>Music</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  className="w-[1rem]"
                  name="Sports"
                  type="checkbox"
                  onChange={() => handleCheckboxChange('Sports')}
                />
                <Label>Sports</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  className="w-[1rem]"
                  name="Singing"
                  type="checkbox"
                  onChange={() => handleCheckboxChange('Singing')}
                />
                <Label>Singing</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  className="w-[1rem]"
                  name="Dancing"
                  type="checkbox"
                  onChange={() => handleCheckboxChange('Dancing')}
                />
                <Label>Dancing</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  className="w-[1rem]"
                  name="Programming"
                  type="checkbox"
                  onChange={() => handleCheckboxChange('Programming')}
                />
                <Label>Programming</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  className="w-[1rem]"
                  name="Jed"
                  type="checkbox"
                  onChange={() => handleCheckboxChange('Jed')}
                />
                <Label>Jed</Label>
              </div>
            </div>

            <div className="my-4">
              <Select onValueChange={handleLookingFor}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Looking for.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Something Casual</SelectItem>
                  <SelectItem value="long">Long Term</SelectItem>
                  <SelectItem value="short">Short Term</SelectItem>

                  <SelectItem value="buddy">Study Buddy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button className="my-2" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
