import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../../Context';
import classes from './board.module.css';

const Board = () => {
  const { state } = useContext(Context);
  const {
    cellX,
    cellY,
    clickCellHandler,
    setRows,
    isSetRow,
    markBox,
    gamePause
  } = state;

  const boxRef = useRef();

  const player1Class = [classes.cell, classes.player1];
  const player2Class = [classes.cell, classes.player2];

  const remainingCells = gamePause
    ? classes.cell
    : [classes.cell, classes.gameStop].join(' ');

  const rows = [];

  const checkColor = (y, x) => {
    if (markBox.length > 0) {
      const abc = markBox.filter(el => el.key === `${y}-${x}`);
      if (abc.length > 0 && abc[0].player === 'Player 1') {
        return player1Class.join(' ');
      } else if (abc.length > 0 && abc[0].player === 'Player 2') {
        return player2Class.join(' ');
      } else {
        return remainingCells;
      }
    }
    return classes.cell;
  };

  useEffect(() => {
    if (isSetRow) setRows(rows);
  });

  const getCells = () => {
    for (let y = 0; y < cellY; y++) {
      const cells = [];

      for (let x = 0; x < cellX; x++) {
        cells.push(
          <div
            ref={boxRef}
            onClick={() => clickCellHandler(y, x)}
            className={checkColor(y, x)}
            key={`${y}-${x}`}
          />
        );
      }

      rows.push(
        <div className='Row' key={y}>
          {cells}
        </div>
      );
    }
    return rows;
  };

  return <div className={classes.board}>{getCells()}</div>;
};

export default Board;
