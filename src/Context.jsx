import React, { Component } from 'react';

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
    setRows: rows => {
      this.setState({ rows, isSetRow: false });
    },
    nextTurn: () => {
      const { players, activePlayer } = this.state;
      const nextPlayer = players.filter(player => player.name !== activePlayer);
      this.setState({
        activePlayer: nextPlayer[0].name,
        gamePause: true,
        nextBtn: false
      });
    },
    clickCellHandler: (y, x) => {
      const { rows, markBox, activePlayer, cellY } = this.state;

      const occupiedCell = [...markBox];
      const currentColumn = occupiedCell.filter(el => {
        return el.coordinates.x === x;
      });

      let gameStatus = this.winGame();
      console.log(`Winner ${gameStatus}`);
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
    },
    setGameActive: () => {
      this.setState({ isGameActive: false });
    }
  };

  winGame = () => {
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

    //check vertical

    for (let y = 3; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        if (board[y][x]) {
          if (
            board[y][x] === board[y - 1][x] &&
            board[y][x] === board[y - 2][x] &&
            board[y][x] === board[y - 3][x]
          ) {
            return board[y][x];
          }
        }
      }
    }

    //check vertically

    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 4; x++) {
        if (board[y][x]) {
          if (
            board[y][x] === board[y][x+1] &&
            board[y][x] === board[y][x+2] &&
            board[y][x] === board[y][x+3]
          ) {
            return board[y][x];
          }
        }
      }
    }


    

  };

  render() {
    return (
      <Context.Provider value={{ state: this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
