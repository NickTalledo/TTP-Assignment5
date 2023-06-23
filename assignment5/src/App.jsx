import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Check if there is a winner or if the square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return; // Do nothing if the game is over or the square is already filled
    }
    const nextSquares = squares.slice(); // Create a copy of the squares array
    if (xIsNext) {
      nextSquares[i] = "X"; // Set the value of the square to "X" if it's X's turn
    } else {
      nextSquares[i] = "O"; // Set the value of the square to "O" if it's O's turn
    }
    onPlay(nextSquares); // Call the onPlay function with the updated squares array
  }

  const winner = calculateWinner(squares); // Calculate the winner using the `calculateWinner` function
  let status;
  if (winner) {
    status = "Winner: " + winner; // If there is a winner, set the status to display the winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); // If there is no winner, set the status to display the next player
  }

  return (
    <>
      <div className="status">{status}</div> {/* Display the status */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />{" "}
        {/* Render the first square */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />{" "}
        {/* Render the second square */}
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />{" "}
        {/* Render the third square */}
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />{" "}
        {/* Render the fourth square */}
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />{" "}
        {/* Render the fifth square */}
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />{" "}
        {/* Render the sixth square */}
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />{" "}
        {/* Render the seventh square */}
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />{" "}
        {/* Render the eighth square */}
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />{" "}
        {/* Render the ninth square */}
      </div>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // Initialize the history state with an array containing an initial array of 9 null values
  const [currentMove, setCurrentMove] = useState(0); // Initialize the currentMove state with 0
  const xIsNext = currentMove % 2 === 0; // Determine if X is the next player based on the currentMove
  const currentSquares = history[currentMove]; // Get the current squares based on the currentMove

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Create a new history array by appending the nextSquares to the existing history up to the currentMove
    setHistory(nextHistory); // Update the history state with the new history array
    setCurrentMove(nextHistory.length - 1); // Set the currentMove to the index of the last move in the new history array
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // Set the currentMove to the selected move
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move; // Set the description for moves greater than 0
    } else {
      description = "Go to game start"; // Set the description for the initial move (game start)
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>{" "}
        {/* Render a button for each move with the corresponding description */}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />{" "}
        {/* Render the game board component */}
      </div>
      <div className="game-info">
        <ol>{moves}</ol> {/* Render the list of moves */}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6], // Top-right to bottom-left diagonal
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // If there is a winning combination, return the value of the winning square (either "X" or "O")
    }
  }

  return null; // If there is no winner, return null
}
