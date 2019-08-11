import React, { useContext } from 'react';
import { Context } from '../Context';
import classes from './playerDisplay.module.css';

const PlayerDisplay = () => {
  const { state } = useContext(Context);
  const { players, activePlayer } = state;
  const activePlayerClass = [classes.playerBox, classes.active];

  return players.map(player => {
    return (
      <div
        className={
          activePlayer === player.name
            ? activePlayerClass.join(' ')
            : classes.playerBox
        }
        key={player.name}
      >
        {player.name}
      </div>
    );
  });
};

export default PlayerDisplay;
