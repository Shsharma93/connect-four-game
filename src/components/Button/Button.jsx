import React from 'react';
import classes from './button.module.css';

const Button = ({ isDisable, text, click }) => {
 

  return (
    <div>
      <button disabled={isDisable} onClick={click} className={classes.btn}>
        {text}
      </button>
    </div>
  );
};

export default Button;
