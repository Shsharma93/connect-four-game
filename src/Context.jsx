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
    occupiedCells: [],
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
      const { rows, markBox, activePlayer, cellY, occupiedCells } = this.state;

      const occupiedCell = [...occupiedCells];
      const currentColumn = occupiedCells.filter(el => {
        return el.x === x;
      });

      let newY = null;

      console.log('occupied cell : ', occupiedCell);
      console.log('Mark Cells : ', markBox);

      if (currentColumn.length > 0) {
        newY = currentColumn[currentColumn.length - 1].y - 1;
      }

      let selectedCell = {
        x: x,
        y: cellY - 1
      };

      if (newY !== null) {
        selectedCell = {
          x: x,
          y: newY
        };
      }

      occupiedCell.push({ x: selectedCell.x, y: selectedCell.y });
      const newMarkBox = {
        id: rows[selectedCell.y].props.children[selectedCell.x],
        player: activePlayer,
        key: `${selectedCell.y}-${selectedCell.x}`
      };
      markBox.push(newMarkBox);
      this.setState({
        markBox,
        gamePause: false,
        nextBtn: true,
        occupiedCells: occupiedCell
      });
    },
    setGameActive: () => {
      this.setState({ isGameActive: false });
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
