import React, { useState } from "react";

// Dynamically import assets
import item1 from "../assets/item1.png";
import item2 from "../assets/item2.png";
import item3 from "../assets/item3.png";
import item4 from "../assets/item4.png";
import item5 from "../assets/item5.png";
import item6 from "../assets/item6.png";
import tableImage from "../assets/table.jpg";

const GameBoard = ({ updateScore, resetScore }) => {
  const initialCards = [
    { id: 1, name: "Item 1", image: item1 },
    { id: 2, name: "Item 2", image: item2 },
    { id: 3, name: "Item 3", image: item3 },
    { id: 4, name: "Item 4", image: item4 },
    { id: 5, name: "Item 5", image: item5 },
    { id: 6, name: "Item 6", image: item6 },
  ];

  const [cards, setCards] = useState(initialCards);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [allItemsClicked, setAllItemsClicked] = useState(false);

  const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setGameOver(true);
      updateScore(true);
    } else {
      updateScore();
      setClickedCards([...clickedCards, id]);
      setCards(shuffleCards(cards));
    }
    // Check if all items have been clicked once
    if (clickedCards.length + 1 === initialCards.length) {
      setAllItemsClicked(true);
    }
  };

  const resetGame = () => {
    setClickedCards([]);
    setGameOver(false);
    setAllItemsClicked(false);
    setCards(shuffleCards(initialCards));
    resetScore(); // Reset the score when starting a new game
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100vw",
      height: "80vh",
      padding: "1rem",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    gameBoard: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1rem",
      width: "100%",
      maxWidth: "600px",
      marginTop: "0.5rem",
      backgroundImage: `url(${tableImage})`,
      backgroundSize: "contain",
    },
    image: {
      width: "150px",
      height: "150px",
      objectFit: "contain",
      cursor: "pointer",
    },
    text: {
      marginTop: "1rem",
      fontSize: "1.5rem",
      color: "#fff",
      textAlign: "center",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      padding: "2rem",
      borderRadius: "10px",
      textAlign: "center",
      zIndex: "1000",
    },
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "1.2rem",
      borderRadius: "5px",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.text}>
        <p>
          You can eat each item once, if you click it twice you will fall into a
          food coma, and dinner is over!
        </p>
      </div>
      <div style={styles.gameBoard}>
        {cards.map((card) => (
          <img
            key={card.id}
            src={card.image}
            alt={card.name}
            style={styles.image}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {/* Modal for Game Over */}
      {gameOver && (
        <div style={styles.modal}>
          <h2>Game Over!</h2>
          <p>You've had a food coma!</p>
          <button style={styles.button} onClick={resetGame}>
            Start New Game
          </button>
        </div>
      )}

      {/* Modal for All Items Clicked */}
      {allItemsClicked && !gameOver && (
        <div style={styles.modal}>
          <h2>Congratulations!</h2>
          <p>You made it through dinner!</p>
          <button style={styles.button} onClick={resetGame}>
            Start New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
