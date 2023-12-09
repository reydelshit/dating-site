import Default from '@/assets/photo_2023-06-30_21-14-04.jpg';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import axios from 'axios';

type ProfileMatched = {
  age: string;
  course: string;
  credential_id: number;
  fullname: string;
  gender: string;
  interest: string;
  looking_for: string;
  profile: string;
  profile_id: number;
  year: string;
};
export default function Home() {
  const [showFindMatch, setShowFindMatch] = useState(false);
  const [interest, setInterest] = useState<ProfileMatched[]>([]);

  const credential_id = localStorage.getItem('dating_site_id');

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null) as any;

  const fetchInterestFromProfile = () => {
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        params: { credential_id },
      })
      .then((res) => {
        console.log(res.data[0].interest, 'interest');
        setInterest(res.data[0].interest);

        if (res.data[0].interest.length > 0) {
          axios
            .get(`${import.meta.env.VITE_DATING_SITE}/findmatch.php`, {
              params: {
                interest: res.data[0].interest,
                credential_id,
              },
            })
            .then((res) => {
              if (res.data.length > 0) {
                setInterest(res.data);
              }
              console.log(res.data, 'match');
            });
        }
      });
  };

  useEffect(() => {
    fetchInterestFromProfile();
  }, []);

  const handleSwipeLeft = () => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex(currentProfileIndex - 1);
      setSwipeDirection('left');
    }
  };

  const handleSwipeRight = () => {
    if (currentProfileIndex < interest.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
      setSwipeDirection('right');
    }
  };

  return (
    <div className="h-screen w-full relative">
      <div className="h-fit flex relative">
        <div className="w-[24rem] border-2 h-full bg-red-50 p-2">
          <div className="w-full my-4">
            <Button
              onClick={() => setShowFindMatch(!showFindMatch)}
              className="w-full h-[4rem]"
            >
              Find Match
            </Button>
          </div>

          <div className="flex items-center gap-4 bg-white border-2 p-2 rounded-md my-2">
            <img
              src={Default}
              alt="default"
              className="w-[6rem] h-[6rem] object-cover rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold cursor-pointer">Reydel Ocon</h1>
              <p>broo i miss you ..</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border-2 p-2 rounded-md my-2">
            <img
              src={Default}
              alt="default"
              className="w-[6rem] h-[6rem] object-cover rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold cursor-pointer">Reydel Ocon</h1>
              <p>broo i miss you ..</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border-2 p-2 rounded-md my-2">
            <img
              src={Default}
              alt="default"
              className="w-[6rem] h-[6rem] object-cover rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold cursor-pointer">Reydel Ocon</h1>
              <p>broo i miss you ..</p>
            </div>
          </div>
        </div>
        <div className="w-full border-2 h-full px-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 bg-white border-2 p-2 rounded-md my-2">
              <img
                src={Default}
                alt="default"
                className="w-[6rem] h-[6rem] object-cover rounded-full"
              />

              <div>
                <h1 className="text-2xl font-bold cursor-pointer">
                  Reydel Ocon, 17 Male / BSIT
                </h1>
                <p>Long Term</p>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex justify-start my-2">
                <div className="w-fit bg-white border-2 p-2 rounded-md">
                  <p>HWAHHAWHWAHAWHAWHHWAHWAHWAHAWHHWAHAW</p>
                  <span>January, 31 2023 1:00 pm</span>
                </div>
              </div>

              <div className="w-full flex justify-end my-2">
                <div className="w-fit bg-red-500 text-white border-2 p-2 rounded-md">
                  <p>HWAHHAWHWAHAWHAWHHWAHWAHWAHAWHHWAHAW</p>
                  <span>January, 31 2023 1:00 pm</span>
                </div>
              </div>

              <div className="w-full flex justify-end my-2">
                <div className="w-fit bg-red-500 text-white border-2 p-2 rounded-md">
                  <p>HWAHHAWHWAHAWHAWHHWAHWAHWAHAWHHWAHAW</p>
                  <span>January, 31 2023 1:00 pm</span>
                </div>
              </div>

              <div className="w-full flex justify-start my-2">
                <div className="w-fit bg-white border-2 p-2 rounded-md">
                  <p>HWAHHAWHWAHAWHAWHHWAHWAHWAHAWHHWAHAW</p>
                  <span>January, 31 2023 1:00 pm</span>
                </div>
              </div>
            </div>

            <div className="my-[2rem] flex gap-4">
              <Input placeholder="Type your message here" />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>

      {showFindMatch && (
        <div className="w-full top-0 absolute flex justify-center h-[90vh] bg-white bg-opacity-75">
          {interest.length > 0 ? (
            currentProfileIndex <
            interest.filter(
              (profileMatched) =>
                Number(profileMatched.credential_id) !== Number(credential_id),
            ).length ? (
              interest.length > 0 &&
              interest
                .filter(
                  (profileMatched) =>
                    Number(profileMatched.credential_id) !==
                    Number(credential_id),
                )
                .map((profileMatched, index) => {
                  if (index === currentProfileIndex) {
                    return (
                      <div
                        key={index}
                        className="w-[40rem] bg-white border-2 h-[45rem] object-cover mt-[5rem] relative rounded-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 flex justify-center items-center z-50">
                          <div className="absolute left-0 flex items-center p-2">
                            <Button onClick={handleSwipeLeft}>
                              Swipe Left
                            </Button>
                          </div>
                          <div className="absolute right-0 flex items-center p-2">
                            <Button onClick={handleSwipeRight}>
                              Swipe Right
                            </Button>
                          </div>
                        </div>

                        <div className="absolute top-0 bg-white w-full p-2 h-[4rem] bg-opacity-70 flex justify-between items-center z-90">
                          <h1 className="text-2xl font-bold cursor-pointer text-red-500">
                            Something Casual
                          </h1>

                          <Button
                            onClick={() => setShowFindMatch(false)}
                            className="cursor-pointer z-50"
                          >
                            Close
                          </Button>
                        </div>

                        <img
                          className="h-full block w-full z-[-10] bg-red-500 object-cover"
                          src={
                            profileMatched.profile.length > 0
                              ? profileMatched.profile
                              : Default
                          }
                          alt="image"
                        />

                        <div className="absolute bottom-0 bg-white w-full p-2 h-[8rem] bg-opacity-70">
                          <h1 className="text-2xl font-bold cursor-pointer text-red-500">
                            {profileMatched.fullname +
                              ', ' +
                              profileMatched.age +
                              ' ' +
                              profileMatched.gender}
                          </h1>
                          <div className="mt-[1rem] flex justify-center">
                            <Button className="h-[3rem] w-[8rem] z-50">
                              Chat now
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
            ) : (
              <div className="flex justify-center items-center w-[40rem] bg-white border-2 h-[45rem] object-cover mt-[5rem] relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center z-50">
                  <div className="absolute left-0 flex items-center p-2">
                    <Button onClick={handleSwipeLeft}>Swipe Left</Button>
                  </div>
                  <div className="absolute right-0 flex items-center p-2">
                    <Button onClick={handleSwipeRight}>Swipe Right</Button>
                  </div>
                </div>
                <h1 className="text-center"> No more profiles available</h1>
              </div>
            )
          ) : (
            <div>no match found</div>
          )}
        </div>
      )}
    </div>
  );
}
