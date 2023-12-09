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
import Default from '@/assets/default.jpg';

export default function Profile() {
  const [profileDetails, setProfileDetails] = useState({
    fullname: '',
    age: '',
    gender: '',
    year: '',
    course: '',
    municipality: '',
    province: '',
    interest: '',
    preferences: '',

    looking_for: '',
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [warningSelections, setWarningSelections] = useState('');
  const [image, setImage] = useState('');
  const [lookingFor, setLookingFor] = useState('' as string);
  const navigate = useNavigate();
  const credential_id = localStorage.getItem('dating_site_id');

  const fetchInterestFromProfile = () => {
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        params: { credential_id },
      })
      .then((res) => {
        console.log(res.data);
        setProfileDetails(res.data[0]);
        setImage(res.data[0].profile);
      });
  };

  useEffect(() => {
    fetchInterestFromProfile();
  }, []);

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
      .put(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        ...profileDetails,
        interest:
          selectedInterestsString.length > 0
            ? selectedInterestsString
            : profileDetails.interest,
        profile: image,
        looking_for:
          lookingFor.length > 0 ? lookingFor : profileDetails.looking_for,
        credential_id,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          // navigate('/home');
          // window.location.reload();
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
    <div className="w-full flex  items-center h-screen flex-col">
      <h1 className="text-2xl my-4 font-bold">Profile</h1>

      <div className="w-[50rem] border-2 p-4 rounded-md bg-white">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between ">
            <img
              className="w-[12rem] h-[12rem] object-cover rounded-md"
              src={image.length > 0 ? image : Default}
              alt="profile"
            />
            <Input
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
                defaultValue={profileDetails.fullname}
                onChange={handleChange}
                type="text"
                name="fullname"
              />
            </div>
            <div className="w-full">
              <Label>Gender:</Label>
              <Input
                defaultValue={profileDetails.gender}
                onChange={handleChange}
                type="text"
                name="gender"
              />
            </div>

            <div className="w-full">
              <Label>Age:</Label>
              <Input
                defaultValue={profileDetails.age}
                onChange={handleChange}
                type="text"
                name="age"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="w-full">
              <Label>Year:</Label>
              <Input
                defaultValue={profileDetails.year}
                onChange={handleChange}
                type="text"
                name="year"
              />
            </div>

            <div className="w-full">
              <Label>Course:</Label>
              <Input
                defaultValue={profileDetails.course}
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
                defaultValue={profileDetails.municipality}
                onChange={handleChange}
                type="text"
                name="municipality"
              />
            </div>

            <div className="w-full">
              <Label>Province:</Label>
              <Input
                defaultValue={profileDetails.province}
                onChange={handleChange}
                type="text"
                name="province"
              />
            </div>
          </div>

          <div>
            <Label className="block my-2">
              Current Interests: {profileDetails.interest}
            </Label>
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

            <div className="my-4 flex flex-col gap-4">
              <Label>Current: {profileDetails.looking_for}</Label>
              <Select onValueChange={handleLookingFor}>
                <SelectTrigger>
                  <SelectValue placeholder="Looking for.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Something Casual</SelectItem>
                  <SelectItem value="long">Long Term</SelectItem>
                  <SelectItem value="short">Short Term</SelectItem>

                  <SelectItem value="buddy">Study Buddy</SelectItem>
                </SelectContent>
              </Select>

              <div className="w-full">
                <Label>Preferences: (Male, Female, Gay, Lesbian etc.)</Label>
                <Input
                  defaultValue={profileDetails.preferences}
                  onChange={handleChange}
                  type="text"
                  name="preferences"
                />
              </div>
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
