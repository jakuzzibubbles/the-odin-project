import React, { useState } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [numCards, setNumCards] = useState(6);

  const updateScore = (reset = false) => {
    if (reset) {
      setScore(0);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
    }
  };

  const handleCardCountChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumCards(value > 0 ? value : 6); // Ensure a minimum of 6 cards
    setScore(0); // Reset score when changing card count
  };

  return (
    <div>
      <Header score={score} highScore={highScore} />
      <div style={settingsStyle}>
        <label htmlFor="cardCount">Number of Cards: </label>
        <input
          id="cardCount"
          type="number"
          value={numCards}
          onChange={handleCardCountChange}
          min="6"
        />
      </div>
      <GameBoard updateScore={updateScore} numCards={numCards} />
    </div>
  );
};

const settingsStyle = {
  margin: "1rem",
  textAlign: "center",
};

export default App;