import React, { useState, createContext, useContext } from 'react';

export const TicTacToeContext = createContext();

const TicTacToeProvider = ({ children }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');
  const [status, setStatus] = useState(`Next player: ${nextValue}`);
  const [winner, setWinner] = useState(null);

  const selectSquare = (square) => {
    if (squares[square] || winner) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[square] = nextValue;

    setSquares(nextSquares);
    setNextValue(calculateNextValue(nextSquares));
    const newWinner = calculateWinner(nextSquares);
    setWinner(newWinner);
    setStatus(
      calculateStatus(newWinner, nextSquares, calculateNextValue(nextSquares))
    );
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setWinner(null);
    setStatus(`Next player: X`);
  };

  const renderSquare = (i) => {
    return (
      <button
        className="square border border-[#302F30] w-20 h-20 bg-[#C5A2C6] hover:bg-[#A77CA8]  text-[#dff6ff] text-5xl font-bold focus:outline-none "
        //border border-blue-800 w-24 h-24 flex items-center justify-center text-2xl font-semibold
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  };

  const calculateStatus = (winner, squares, nextValue) => {
    return winner
      ? `Winner : ${winner}`
      : squares.every(Boolean)
      ? `Scratch : Cat's game`
      : `Next player : ${nextValue}`;
  };

  const calculateNextValue = (squares) => {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const states = {
    squares,
    setSquares,
    nextValue,
    setNextValue,
    status,
    setStatus,
    winner,
    setWinner
  };

  const functions = {
    selectSquare,
    restart,
    renderSquare,
    calculateStatus,
    calculateNextValue,
    calculateWinner
  };

  return (
    <TicTacToeContext.Provider value={{ states, functions }}>
      {children}
    </TicTacToeContext.Provider>
  );
};

const Board = () => {
  const { states, functions } = useContext(TicTacToeContext);
  const { status } = states;
  const { restart, renderSquare } = functions;

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="mb-8 font-bold text-xl text-[#EFE9EF]">{status}</div>
      <div className="grid grid-cols-3 gap-2">
      <div className="grid grid-cols gap-2">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid grid-cols gap-2">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid grid-cols gap-2">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button
        className="mt-8 px-4 py-2 bg-[#5D5EAA] border border-transparent rounded-md font-semibold text-white hover:bg-[#A77CA8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
};

const Game = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F1E3F0]">
      <div className="rounded-lg shadow-lg p-12 bg-[#302F30]">
        <Board />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TicTacToeProvider>
      <Game />
    </TicTacToeProvider>
  );
};

export default App;
