import React, { useContext } from 'react';
import './App.css';
import PlayerDisplay from './components/PlayerDisplay/PlayerDisplay';
import Button from './components/Button/Button';
import Board from './components/Board/Board';
import { Context } from './Context';

const App = () => {
  const { state } = useContext(Context);
  const { nextBtn, nextTurn } = state;

  return (
    <div className='App'>
      <h1>Hello</h1>
      <PlayerDisplay />
      <Board />
      <Button isDisable={nextBtn ? false : true} text='Next Turn' click={nextTurn} />
    </div>
  );
};

export default App;
