import Default from '@/assets/photo_2023-06-30_21-14-04.jpg';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-fit flex relative">
        <div className="w-[24rem] border-2 h-full bg-red-50 p-2">
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
    </div>
  );
}
