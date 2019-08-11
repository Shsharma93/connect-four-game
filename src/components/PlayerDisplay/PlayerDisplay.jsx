import React, { useContext, Fragment } from 'react';
import { Context } from '../../Context';
import classes from './playerDisplay.module.css';
import Button from '../Button/Button';

const PlayerDisplay = () => {
  const { state } = useContext(Context);
  const { players, activePlayer, winner, startNewGame } = state;
  const activePlayerClass = [classes.playerBox, classes.active];

  let getStyle = player => {
    return activePlayer === player.name
      ? activePlayerClass.join(' ')
      : classes.playerBox;
  };

  let playerBox = players.map(player => {
    return (
      <div className={getStyle(player)} key={player.name}>
        {player.name}
      </div>
    );
  });

  if (winner) {
    const style =
      winner === 'Player 1'
        ? [classes.win, classes.p1].join(' ')
        : [classes.win, classes.p2].join(' ');
    playerBox = (
      <Fragment>
        <div className={style}>{winner} Wins!</div>
        <Button text='Start New Game' click={startNewGame} />
      </Fragment>
    );
  }

  return playerBox;
};

export default PlayerDisplay;
