import React, { useState, useEffect } from 'react';
import './App.css';
import ButtonsNum from "./Components/ButtonsNum";
import DisplayStars from "./Components/DisplayStars";
import PlayAgain from "./Components/PlayAgain";
import utils from "./math";

const useGame = timeLimit => {
  
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailablesNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timeId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timeId);
    }
  });
  const setGameState = (newCandidateNumber) =>{
    if (utils.sum(newCandidateNumber) !== stars) {
    setCandidateNums(newCandidateNumber);
  } else {
    const newAvailebleNums = availableNums.filter(n => !newCandidateNumber.includes(n));
    setStars(utils.randomSumIn(newAvailebleNums, 9))
    setAvailablesNums(newAvailebleNums);
    setCandidateNums([]);
  }
}
  return {stars, availableNums, candidateNums, secondsLeft, setGameState}
}
const Game = (props) => {

  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
   } = useGame();
  const wrongCandidate = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? "won" :
    secondsLeft === 0 ? "lost" : "active";
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return wrongCandidate ? "wrong" : "candidate";
    }
    return "available";
  };
  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === "used" || gameStatus !== "active") {
      return;
    }
    const newCandidateNumber =
      currentStatus === "available" ? candidateNums.concat(number) :
        candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNumber);
  }
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame}
              gameStatus={gameStatus}
            />
          ) : <DisplayStars countStar={stars} />}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <ButtonsNum key={number}
              onClick={onNumberClick}
              status={numberStatus(number)}
              number={number} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};
const App = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
}

export default App;
