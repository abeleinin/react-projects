import "./App.css";
import { useState, useEffect } from "react";
import ColorCard from "./components/ColorCard";

function App() {
  const [isOn, setIsOn] = useState(false);

  const colorList = [
    "bg-green-400",
    "bg-red-400",
    "bg-blue-400",
    "bg-yellow-400",
  ];

  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initPlay);

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  return (
    <div className="h-full m-0 flex bg-slate-600 justify-center items-center">
      <div className="flex flex-wrap justify-center m-auto w-96">
        {colorList &&
          colorList.map((v, i) => <ColorCard color={v}></ColorCard>)}
      </div>
      {!isOn && !play.score && (
        <button
          onClick={startHandle}
          className="absolute bg-slate-700 h-32 w-32 rounded-full text-2xl"
        >
          START
        </button>
      )}
      {isOn && (play.isDisplay || play.userPlay) && (
        <button
          onClick={startHandle}
          className="absolute bg-slate-700 h-32 w-32 rounded-full text-2xl"
        >
          {play.score}
        </button>
      )}
    </div>
  );
}

export default App;
