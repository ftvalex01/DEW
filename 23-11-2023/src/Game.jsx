

import React, { useState } from "react";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [valor, setValue] = useState(Array(9).fill(null));

  function handleClick(i) {
    const newValor = [...valor]
    newValor[i] = 'X'
    setValue(newValor);
  }

  return (
    <>
      <div className="board-row">
        <Square value={valor[0]} onClick={() => handleClick(0)}></Square>
        <Square value={valor[1]} onClick={() => handleClick(1)}></Square>
        <Square value={valor[2]} onClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={valor[3]} onClick={() => handleClick(3)}></Square>
        <Square value={valor[4]} onClick={() => handleClick(4)}></Square>
        <Square value={valor[5]} onClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={valor[6]} onClick={() => handleClick(6)}></Square>
        <Square value={valor[7]} onClick={() => handleClick(7)}></Square>
        <Square value={valor[8]} onClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
};

export default Board;
