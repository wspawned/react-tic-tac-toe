import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  //style={{backgroundColor:"red"}}       and there was no div below
  return (
    <div  className="square"  >
    <button className="square" onClick={props.onClick} >
      {props.value}
    </button>
    </div>
  );
}


class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const row = [];
    let key = 0;
    for (let i = 0; i < 3; i++) {
      const col = [];
      for (let j = 0; j < 3; j++) {
        col.push(this.renderSquare(i * 3 + j));
      }
      key++; // is not it better in first for loop?
      row.push(
        <div key={key} className="board-row">
          {col}
        </div>
      );
    }
    return <div>{row}</div>;
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        points: Array(9).fill(null),   //////////
      }],
      stepNumber: 0,
      xIsNext: true,
      descendingList: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O" ;
    this.setState({
      history: history.concat([{
        squares: squares,
        points: pointsRef[i],     //////
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) => {

      if (!this.state.descendingList)  move = (history.length-1) - move; 
      const desc = move ?
        "Go to move #" + move + " at point " + history[move].points :         ///////// 
        "Go to game start";
      return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{this.state.stepNumber===move? <b>{desc}</b> : desc}</button>    
          </li>
        );
    });

    let status;
    if(winner) {
      status = "Winner: " + winner;
    } else if(winner === null && this.state.stepNumber === 9) {
      status = "It is a draw: No winner"
    } else { 
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O" ) ;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = { (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <button className="toggle-list"
          onClick={()=> 
            this.setState({descendingList : !this.state.descendingList })}
          > {this.state.descendingList ? "descending" : "ascending" } </button>
       
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
  
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

  ;       ///////

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i= 0; i<lines.length; i++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          ///////
      return squares[a];
    }
  }
  return null;
}

const pointsRef = [
  [1,1],
  [1,2],
  [1,3],
  [2,1],
  [2,2],
  [2,3],
  [3,1],
  [3,2],
  [3,3]
]
