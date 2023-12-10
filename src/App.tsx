import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import ImageDating from '@/assets/62335.png';
function App() {
  return (
    <div className="flex justify-around items-center w-full p-4 h-[80%]">
      <div className="text-start ">
        <span className="text-4xl ">The best place for you</span>
        <h1 className="text-8xl font-bold text-red-500 my-4">
          TO MINGLE AND JINGLE
        </h1>
        <p className="text-2xl">
          Find someone who have the same interest with you
        </p>
        <Link to="/register">
          <Button className="mt-[4rem] w-[10rem]">Sign Up</Button>
        </Link>
      </div>
      <img className="w-[60%] z-[-20]" src={ImageDating} alt="image" />
    </div>
  );
}

export default App;
