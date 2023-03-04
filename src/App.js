import { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import salad from "./components/salad.png";
import softDrink from "./components/soft-drink.png";
import dish from "./components/dish.png";
import fastFood from "./components/fastFood.png";
import eat from "./components/eat.jpg";
import application from "./components/application.png";
import Timer from "./components/Timer";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
  const [fixedarr, setFixedArr] = useState([
    dish,
    salad,
    fastFood,
    softDrink,
    salad,
    eat,
    dish,
    application,
    softDrink,
    application,
    fastFood,
    eat,
  ]);

  const [numbers, setNumbers] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  //Shuffle Algorithm
  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.round(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    setFixedArr(arr);
  };

  const { width, height } = useWindowSize();

  const [testArr, setTestArr] = useState([]);
  const [score, setScore] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [timer, setTimer] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);

  const [win, setWin] = useState(false);
  const [showVal, setShowVal] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  numbers[testArr[0]] = fixedarr[testArr[0]];
  numbers[testArr[1]] = fixedarr[testArr[1]];

  const audio = new Audio(
    "https://www.chosic.com/wp-content/uploads/2022/10/Wallpaper.mp3"
  );

  function playAudio() {
    audio.play();
  }
  function pauseAudio() {
    audio.pause();
  }
  const initialNew = () => {
    shuffle(fixedarr);
    setScore(0);
    setStopTimer(false);
    setTimer(100);
    setGameOver(false);
    setNumbers([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    setWin(false);
    setWin(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (score === 6) {
      setWin(true);
      setStopTimer(true);
    }
    if (testArr.length === 2) {
      let buff1 = fixedarr[testArr[0]];
      let buff2 = fixedarr[testArr[1]];
      numbers[testArr[0]] = fixedarr[testArr[0]];
      numbers[testArr[1]] = fixedarr[testArr[1]];

      if (
        buff1 === buff2 &&
        testArr[0] !== testArr[1] &&
        numbers[numbers.indexOf(testArr[0])] !== null &&
        numbers[numbers.indexOf(testArr[1])] !== null
      ) {
        numbers[testArr[0]] = buff1;
        numbers[testArr[1]] = buff2;
        setScore(score + 1);
      } else {
        setTimeout(() => {
          numbers[testArr[0]] = null;
          numbers[testArr[1]] = null;
          setNumbers([...numbers]);
          setShowVal(false);
          setTestArr(new Array());
        }, 100);
      }
      setTestArr(new Array());
    }
  }, [testArr, showVal]);

  useEffect(() => {
    if (gameStarted === true) {
      playAudio();
      audio.volume = 0.8;
    }
  }, [gameStarted, gameOver]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-200 to-gray-300  to-h-screen flex flex-col justify-center items-center">
      {gameStarted ? (
        <div />
      ) : (
        <div className="absolute w-screen h-screen bg-gradient-to-br from-gray-200 to-gray-300  z-50 top-0 bg-white flex flex-col justify-center  items-center">
          <h1 className="text-[2rem] mb-10 font-bold w-[50%] text-center ">
            MY MATCHING GAME
          </h1>
          <button
            onClick={initialNew}
            className="bg-purple-700 text-white shadow-xl shadow-purple-200 w-28 p-3 rounded-xl mx-10"
          >
            Start
          </button>
        </div>
      )}
      {gameOver ? (
        <div className="absolute w-screen h-screen z-50 top-0 bg-white flex flex-col justify-center  items-center">
          <h1 className="text-red-500  font-bold">Game Over</h1>
          <p>Score: {score}</p>
          <button onClick={initialNew} className="bg-green-400 p-2 mx-10">
            Try Again
          </button>
        </div>
      ) : (
        <div />
      )}
      {win ? (
        <div className="absolute w-screen h-screen z-50 top-0 bg-white flex flex-col justify-center  items-center">
          <Confetti width={width} height={height} />
          <h1 className="text-green-500  font-bold">WINNER</h1>
          <button onClick={initialNew}>Play Again</button>
        </div>
      ) : (
        <div />
      )}
      <h1 className="text-purple-500 font-bold">MATCH IMAGES!!</h1>
      <p>
        Just some fun React js Game by{" "}
        <a
          target={"_blank"}
          className=" underline text-blue-500"
          href="https://github.com/deji-py"
        >
          @deji_py
        </a>
      </p>
      <p>Have fun!</p>
      <Timer
        setGameOver={setGameOver}
        setStopTimer={setStopTimer}
        stopTimer={stopTimer}
        setTimer={setTimer}
        timer={timer}
        startGame={gameStarted}
      />
      <div className="text-[2rem]">{score}</div>
      <div className=" grid grid-cols-3 w-fit gap-3">
        {numbers.map((num, key) => (
          <Card
            value={num}
            key={key}
            ondoubleClick={() => setNumbers(numbers)}
            onClick={() => {
              if (numbers[key] === null) {
                setTestArr([...testArr, key]);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
