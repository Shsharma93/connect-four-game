import React, { useContext } from 'react';
import './App.css';
import PlayerDisplay from './components/PlayerDisplay';
import Button from './components/Button';

import Board from './components/Board';
import { Context } from './Context';

const App = () => {
  const { state } = useContext(Context);
  const { nextBtn } = state;

  return (
    <div className='App'>
      <h1>Hello</h1>
      <PlayerDisplay />
      <Board />
      <Button isDisable={nextBtn ? false : true} />
    </div>
  );
};

export default App;
