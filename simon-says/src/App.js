import "./App.css";
import { useState, useEffect } from "react";
import ColorCard from "./components/ColorCard";
import timeout from "./utils/util";

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
  const [flashColor, setFlashColor] = useState("");
  const [maxScore, setMaxScore] = useState(0);

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

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function displayColors() {
    // Delay before first color is displayed
    await timeout(1000);
    for (let i = 0; i < play.colors.length; i++) {
      await timeout(500);
      setFlashColor(play.colors[i]);
      await timeout(500);
      setFlashColor("");

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function cardClickHandle(color) {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
            max: play.colors.length,
          });
        }
      } else {
        await timeout(500);
        setMaxScore(Math.max(play.colors.length, maxScore));
        console.log(maxScore);
        setPlay({
          ...initPlay,
          score: play.colors.length,
        });
      }
      await timeout(500);
      setFlashColor("");
    }
  }

  function closeHandle() {
    setIsOn(false);
  }

  return (
    <div className="h-full m-0 flex bg-slate-700 justify-center items-center">
      <div className="flex flex-col">
        {/* Highest Score */}
        <h1 className="text-center">Highest Score: {maxScore}</h1>
        {/* Color Tiles */}
        <div className="flex flex-wrap justify-center m-auto w-96">
          {colorList &&
            colorList.map((v, i) => (
              <ColorCard
                onClick={() => cardClickHandle(v)}
                flash={flashColor === v}
                color={v}
              ></ColorCard>
            ))}
        </div>
      </div>

      {/* Start button */}
      {!isOn && !play.score && (
        <button
          onClick={startHandle}
          className="absolute bg-slate-700 h-32 w-32 rounded-full text-2xl"
        >
          PLAY
        </button>
      )}

      {/* Game score */}
      {isOn && (play.isDisplay || play.userPlay) && (
        <button
          onClick={startHandle}
          className="absolute bg-slate-700 h-32 w-32 rounded-full text-2xl"
        >
          {play.score}
        </button>
      )}

      {/* Final Score and Play again button */}
      {isOn && !play.isDisplay && !play.userPlay && play.score && (
        <div className="absolute bg-slate-700 h-32 w-32 rounded-xl text-2xl text-center pt-2">
          <div>Score: {play.score}</div>
          <div className="bg-slate-50 text-black text-center mt-10 rounded-lg">
            <button onClick={closeHandle}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
