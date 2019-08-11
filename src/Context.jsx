import React, { Component } from 'react';
import checkWinner from './utils/checkWinner';

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    players: [{ name: 'Player 1' }, { name: 'Player 2' }],
    activePlayer: 'Player 1',
    cellX: 7,
    cellY: 6,
    rows: '',
    isSetRow: true,
    isGameActive: false,
    markBox: [],
    gamePause: false,
    nextBtn: false,
    winner: undefined,
    startNewGame: () => {
      this.setState({
        rows: '',
        isSetRow: true,
        isGameActive: false,
        markBox: [],
        gamePause: false,
        nextBtn: false,
        winner: undefined
      });
    },
    setRows: rows => {
      this.setState({ rows, isSetRow: false });
    },
    nextTurn: () => {
      const { players, activePlayer } = this.state;

      const result = this.checkWinGame();
      if (result) {
        this.setState({ gamePause: false, nextBtn: false });
        return;
      }

      const nextPlayer = players.filter(player => player.name !== activePlayer);
      this.setState({
        activePlayer: nextPlayer[0].name,
        gamePause: true,
        nextBtn: false
      });
    },
    setGameActive: () => {
      this.setState({ isGameActive: false });
    },
    clickCellHandler: (y, x) => {
      const { rows, markBox, activePlayer, cellY } = this.state;

      const occupiedCell = [...markBox];
      const currentColumn = occupiedCell.filter(el => {
        return el.coordinates.x === x;
      });

      let newY = null;

      if (currentColumn.length > 0) {
        newY = currentColumn[currentColumn.length - 1].coordinates.y - 1;
      }

      const selectedCell =
        newY !== null
          ? {
              x: x,
              y: newY
            }
          : {
              x: x,
              y: cellY - 1
            };

      const newMarkBox = {
        id: rows[selectedCell.y].props.children[selectedCell.x],
        player: activePlayer,
        key: `${selectedCell.y}-${selectedCell.x}`,
        coordinates: { x: selectedCell.x, y: selectedCell.y }
      };
      occupiedCell.push(newMarkBox);
      this.setState({
        markBox: occupiedCell,
        gamePause: false,
        nextBtn: true
      });
    }
  };

  checkWinGame = () => {
    const { markBox, cellX, cellY } = this.state;

    let board = [];

    for (let y = 0; y < cellY; y++) {
      let cells = [];
      for (let x = 0; x < cellX; x++) {
        cells.push(`${y}-${x}`);
      }
      board.push(cells);
    }

    for (let y = 0; y < cellY; y++) {
      for (let x = 0; x < cellX; x++) {
        markBox.forEach(el => {
          if (el.key === board[y][x]) {
            board[y][x] = el.player;
          }
        });
      }
    }

    const winner = checkWinner(board);
    this.setState({ board, winner });
    return winner;
  };

  render() {
    return (
      <Context.Provider value={{ state: this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
