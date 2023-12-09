import Default from '@/assets/photo_2023-06-30_21-14-04.jpg';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

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

type MessageType = {
  created_at: string;
  message_context: string;
  receiver_id: number;
  sender_id: number;
  profile: string;
  sender_username: string;
  profile_picture: string;
};

export default function Home() {
  const [showFindMatch, setShowFindMatch] = useState(false);
  const [interest, setInterest] = useState<ProfileMatched[]>([]);
  const [message, setMessage] = useState<MessageType[]>([]);

  const credential_id = localStorage.getItem('dating_site_id');

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null) as any;

  const [profileMatched, setProfileMatched] = useState<ProfileMatched[]>([]);
  const [recepientIDNumber, setRecepientIDNumber] = useState(0);
  const [recepientMessage, setRecepientMessage] = useState<MessageType[]>([]);
  const [messageSent, setMessageSent] = useState('');
  const [showMessageRecepient, setShowMessageRecepient] = useState(false);
  const [showChatNow, setShowChatNow] = useState(false);

  const handleShowMessage = (id: number) => {
    setRecepientIDNumber(id);
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/message-fetch.php`, {
        params: {
          sender_id: credential_id,
          receiver_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'get message recepient');
        setRecepientMessage(res.data);
        setShowMessageRecepient(true);
        // setShowChatNow(true);
      });
  };

  const fetchMessageRecepient = () => {
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/message-fetch.php`, {
        params: {
          sender_id: credential_id,
          receiver_id: recepientIDNumber,
        },
      })
      .then((res) => {
        console.log(res.data, 'get message recepient');
        setRecepientMessage(res.data);
      });
  };

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

  const getRecepientMessage = async () => {
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/message.php`, {
        params: { sender_id: credential_id },
      })
      .then((res) => {
        console.log(res.data, 'message');
        // setRecepientMessage(res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          setMessage(res.data);
        } else {
          setMessage([]);
        }
      });
  };

  // const getMessageRecepient = () => {
  //   axios
  //     .get(`${import.meta.env.VITE_DATING_SITE}/message-fetch.php`, {
  //       params: {
  //         sender_id: credential_id,
  //         receiver_id: 3,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data, 'get message recepient');
  //       setRecepientMessage(res.data);
  //     });
  // };

  useEffect(() => {
    fetchInterestFromProfile();
    getRecepientMessage();
    // getMessageRecepient();
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

  const handleChatNowReceipient = (id: number) => {
    console.log(id);
    axios
      .get(`${import.meta.env.VITE_DATING_SITE}/profile.php`, {
        params: {
          credential_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'chat');
        setProfileMatched(res.data);
        setRecepientIDNumber(id);
        setShowFindMatch(false);
        setShowChatNow(true);
      });
  };

  const handleMessageSent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_DATING_SITE}/message.php`, {
        sender_id: Number(credential_id),
        receiver_id: recepientIDNumber,
        message_context: messageSent,
      })
      .then((res) => {
        console.log(res.data, 'message sent');
        fetchMessageRecepient();
        setMessageSent('');
        setShowChatNow(false);
      });
  };

  const sortedMessages = recepientMessage.slice().sort((a, b) => {
    return Date.parse(a.created_at) - Date.parse(b.created_at);
  });

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

          <div>
            {message.length > 0 ? (
              message
                .filter(
                  (mes) => Number(mes.sender_id) !== Number(credential_id),
                )
                .map((mes, index) => {
                  return (
                    <div
                      className="border-2 p-2 mt-[1rem] rounded-sm bg-gray-200"
                      key={index}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="w-[5rem] h-[5rem] rounded-full object-cover"
                          src={mes.profile}
                        />
                        <div className="flex flex-col w-full">
                          <span className="flex justify-between w-full">
                            <h1
                              onClick={() => handleShowMessage(mes.sender_id)}
                              className="font-bold cursor-pointer"
                            >
                              {mes.sender_username}
                            </h1>
                            <p className="text-xs">
                              {moment(mes.created_at).format('LLL')}
                            </p>
                          </span>

                          <p>{mes.message_context}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p>No Message</p>
            )}
          </div>
        </div>
        <div className="w-full border-2 h-full px-4">
          <div className="flex flex-col">
            {showMessageRecepient && (
              <>
                <div className="flex items-center justify-between border-b-2 p-2">
                  {recepientMessage
                    .filter(
                      (mes) => Number(mes.sender_id) !== Number(credential_id),
                    )
                    .map((res, index) => {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <img
                            className="w-[6rem] h-[6rem] rounded-full object-cover"
                            src={res.profile_picture}
                            alt=""
                          />
                          <h1 className="font-bold">{res.sender_username}</h1>
                        </div>
                      );
                    })
                    .slice(0, 1)}
                </div>
                <div className="w-full flex flex-col h-[40rem] overflow-x-auto">
                  {sortedMessages.map((res, index) => {
                    return (
                      <div
                        key={index}
                        className={`w-full flex ${
                          Number(res.sender_id) === Number(credential_id)
                            ? 'justify-end'
                            : 'justify-start'
                        } my-2`}
                      >
                        <div
                          className={`w-fit  ${
                            Number(res.sender_id) === Number(credential_id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white'
                          } border-2 p-2 rounded-md`}
                        >
                          <p>{res.message_context}</p>
                          <p className="text-xs">
                            {moment(res.created_at).format('LLL')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="my-[2rem] flex gap-4 w-full">
                  <form
                    className="w-full flex gap-4 items-center"
                    onSubmit={handleMessageSent}
                  >
                    <Input
                      className="h-[4rem]"
                      value={messageSent}
                      onChange={(e) => setMessageSent(e.target.value)}
                      placeholder="Type your message here"
                    />

                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </>
            )}

            {!showMessageRecepient && profileMatched.length === 0 && (
              <div className="w-full flex justify-center items-center h-[80vh]">
                <h1 className="font-bold text-3xl">
                  FIND MATCH AND START CHATTING 🥰😍🥰
                </h1>
              </div>
            )}
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
                            {profileMatched.looking_for}
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
                            <Button
                              onClick={() =>
                                handleChatNowReceipient(
                                  profileMatched.credential_id,
                                )
                              }
                              className="h-[3rem] w-[8rem] z-50"
                            >
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
                <div className="absolute top-0 bg-white w-full p-2 h-[4rem] bg-opacity-70 flex justify-between items-center z-90">
                  <h1 className="text-2xl font-bold cursor-pointer text-red-500"></h1>

                  <Button
                    onClick={() => setShowFindMatch(false)}
                    className="cursor-pointer z-50"
                  >
                    Close
                  </Button>
                </div>

                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="absolute left-0 flex items-center p-2">
                    <Button onClick={handleSwipeLeft}>Swipe Left</Button>
                  </div>
                  <div className="absolute right-0 flex items-center p-2">
                    <Button onClick={handleSwipeRight}>Swipe Right</Button>
                  </div>
                </div>
                <div>
                  <h1 className="break-words w-[100%]">
                    No match or no more profiles available
                  </h1>
                </div>
              </div>
            )
          ) : (
            <div>no match found</div>
          )}
        </div>
      )}

      {showChatNow && (
        <div className="w-full top-0 absolute flex justify-center items-center h-screen bg-white bg-opacity-75">
          {profileMatched.length > 0 &&
            profileMatched.map((profile, index) => {
              return (
                <div
                  className="w-[40rem] mt-[-10rem] bg-white border-2 p-4 rounded-lg"
                  key={index}
                >
                  <div className="flex h-[7rem]  items-center gap-4 border-b-2">
                    <img
                      className="w-[5rem] h-[5rem] object-cover rounded-full "
                      src={profile.profile}
                      alt=""
                    />

                    <div>
                      <h1 className="font-bold">
                        {profile.fullname +
                          ', ' +
                          profile.age +
                          '. ' +
                          profile.gender +
                          ' - ' +
                          profile.course}
                      </h1>

                      <p>{profile.looking_for}</p>
                    </div>
                  </div>

                  <div>
                    <form
                      className="flex gap-4 mt-[2rem] items-center"
                      onSubmit={handleMessageSent}
                    >
                      <Input
                        onChange={(e) => setMessageSent(e.target.value)}
                        value={messageSent}
                        className="h-[4rem]"
                        placeholder="send message now!"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
