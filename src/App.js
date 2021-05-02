import React from "react";
import "./style.css";
import img from "./images";
import Block from "./block";
import Header from "./header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      col: 10,
      mines: 10,
      matrix: [],
      autoCount: 10,
      score: 0,
    };
  }

  start = () => {
    if (this.state.mines > this.state.rows * this.state.col) {
      alert(
        "Number of mines is more than number of blocks please reduce number of mines. Maximum mines that can be put is " +
          this.state.rows * this.state.col
      );
      return;
    }
    const matrix = Array(this.state.rows)
      .fill(Array(this.state.col).fill({ clicked: false, mine: false }))
      .map((i, row) => i.map((j, col) => ({ ...j, row, col })));
    this.addMines(matrix);
  };

  addMines = matrix => {
    const allSpots = Array.from(
      { length: this.state.rows * this.state.col },
      (_, index) => index
    ).sort(() => 0.5 - Math.random());
    const mineSpots = allSpots.slice(0, this.state.mines);
    const otherSpots = allSpots.slice(this.state.mines, allSpots.length);
    mineSpots.map(i => {
      const row = Math.floor(i / this.state.col);
      const col = i % this.state.col;
      matrix[row][col].mine = true;
    });

    otherSpots.map(i => {
      const row = Math.floor(i / this.state.col);
      const col = i % this.state.col;
      matrix[row][col].count = this.getCount(matrix, row, col);
    });
    this.setState({
      matrix,
      autoCount: this.state.col,
      score: 0
    });
  };

  getCount = (grid, row, col) => {
    let count = 0;
    if (grid[row - 1] && grid[row - 1][col] && grid[row - 1][col].mine) {
      count++;
    }
    if (grid[row + 1] && grid[row + 1][col] && grid[row + 1][col].mine) {
      count++;
    }
    if (grid[row][col - 1] && grid[row][col - 1].mine) {
      count++;
    }
    if (grid[row][col + 1] && grid[row][col + 1].mine) {
      count++;
    }
    if (
      grid[row + 1] &&
      grid[row + 1][col + 1] &&
      grid[row + 1][col + 1].mine
    ) {
      count++;
    }
    if (
      grid[row - 1] &&
      grid[row - 1][col + 1] &&
      grid[row - 1][col + 1].mine
    ) {
      count++;
    }
    if (
      grid[row + 1] &&
      grid[row + 1][col - 1] &&
      grid[row + 1][col - 1].mine
    ) {
      count++;
    }
    if (
      grid[row - 1] &&
      grid[row - 1][col - 1] &&
      grid[row - 1][col - 1].mine
    ) {
      count++;
    }
    return count;
  };

  handleRow = e => {
    let val = parseInt(e.target.value);

    if (val < 1 || isNaN(val)) {
      val = 1;
    }
    if (val > 30) {
      val = 30;
    }
    this.setState({ rows: val });
  };

  handleCol = e => {
    let val = parseInt(e.target.value);
    if (val < 1 || isNaN(val)) {
      val = 1;
    }
    if (val > 30) {
      val = 30;
    }
    this.setState({ col: val });
  };

  handleMine = e => {
    let val = parseInt(e.target.value);
    if (val < 1 || isNaN(val)) {
      val = 1;
    }
    if (val > this.state.rows * this.state.col) {
      val = this.state.rows * this.state.col;
    }
    this.setState({ mines: val });
  };

  handleClick = ({ row, col }) => {
    const matrix = JSON.parse(JSON.stringify(this.state.matrix));
    if (matrix[row][col].clicked) return;
    
    matrix[row][col].clicked = true;
    this.setState({ matrix, score: matrix[row][col].mine ? this.state.score : this.state.score+1 }, () => {
      if(matrix[row][col].mine) {
        console.log(1000);
        setTimeout(() => {
          var r = confirm("Game Over, You have scored "+ this.state.score + " points.");
          this.start();
        })
        
      }else {

      }
    });
    
  };

  render() {
    return (
      <div>
        <Header 
          rows={this.state.rows}
          col={this.state.col}
          mines={this.state.mines}
          score={this.state.score}
          handleCol={this.handleCol}
          handleMine={this.handleMine}
          handleRow={this.handleRow}
        />
        <div class="flex align-center header">
          <button id="start" class="button unclicked" onClick={this.start}>
            New Game
          </button>
        </div>
        <div
          class="container"
          style={{
            gridTemplateColumns: Array(this.state.autoCount)
              .fill("auto")
              .join(" ")
          }}
        >
          {this.state.matrix
            .reduce((acc, items) => [...acc, ...items], [])
            .map(i => {
              return (
                <Block
                  key={i.row + "_" + i.col}
                  clicked={i.clicked}
                  mine={i.mine}
                  count={i.count}
                  row={i.row}
                  col={i.col}
                  handleClick={this.handleClick}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
