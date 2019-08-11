import React, { useContext } from 'react';
import classes from './button.module.css';
import { Context } from '../Context';

const Button = ({ isDisable }) => {
  const { state } = useContext(Context);
  const { nextTurn } = state;

  return (
    <div>
      <button disabled={isDisable} onClick={nextTurn} className={classes.btn}>
        Next Turn
      </button>
    </div>
  );
};

export default Button;
