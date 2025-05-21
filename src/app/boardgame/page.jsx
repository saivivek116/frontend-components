"use client";
import { useState, useEffect, useRef } from "react";
import "./styles.css";

const BOARD_SIZE = 12;
const getBoard = () => {
  let board = new Array(BOARD_SIZE);
  for (let i = 0; i < 12; i++) {
    board[i] = new Array(BOARD_SIZE).fill('');
  }
  return board
}

const Board = ({ board, handleClick }) => {
  return (
    <div className="board">
      {
        board.map((row, i) => {
          return (
            row.map((c, j) => {
              return <div key={`${i}#${j}`} onClick={() => handleClick(i, j)} className={`${c} circle`}></div>
            })
          )
        })
      }

    </div>
  )
}

const InformationPanel = ({ history = [], turn, winner, handlePreview }) => {
  const [selected, setSelected] = useState();
  const [reverse, setReverse] = useState(false);
    return (
    <div className="information-panel">
      <div className="player-details">
        <p>{winner ? "Winner" : "Next player:"}</p><div className={`circle ${winner ? winner : turn}`}></div>
      </div>
      <button onClick={()=>setReverse(!reverse)}>Reverse</button>
      <div className={`records ${reverse?"reverse":""}`} onClick={(e) => {handlePreview(e.target.dataset.record)
        setSelected(e.target.dataset.record);
      }}>
        {
          history.map((move, i) => {
            return (<div key={i} data-record={i} className={`${selected==i?"selected":""} record`}>Go to move {i + 1}</div>)
          })
        }
      </div>

    </div>
  )
}

function checkWin(board) {

  function countInDirection(i, j, di, dj) {
    const color = board[i][j];
    let cnt = 1;
    for (let k = 1; k < 5; k++) {
      const ni = i + di * k;
      const nj = j + dj * k;
      // bounds-check
      if (
        ni < 0 ||
        nj < 0 ||
        ni >= BOARD_SIZE ||
        nj >= BOARD_SIZE ||
        board[ni][nj] !== color
      ) {
        break;
      }
      cnt++;
    }
    return cnt;
  }

  // for every cell, if it’s occupied, check each direction
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const color = board[i][j];
      if (!color) continue;

      // check horizontal
      if (j <= BOARD_SIZE - 5 && countInDirection(i, j, 0, 1) === 5) {
        return color;
      }
      // check vertical
      if (i <= BOARD_SIZE - 5 && countInDirection(i, j, 1, 0) === 5) {
        return color;
      }
      // check diagonal down-right
      if (
        i <= BOARD_SIZE - 5 &&
        j <= BOARD_SIZE - 5 &&
        countInDirection(i, j, 1, 1) === 5
      ) {
        return color;
      }
      // check diagonal down-left
      if (
        i <= BOARD_SIZE - 5 &&
        j >= 4 &&
        countInDirection(i, j, 1, -1) === 5
      ) {
        return color;
      }
    }
  }

  return "";
}

const Game = () => {

  const [board, setBoard] = useState(getBoard());
  const [turn, setTurn] = useState("red");
  const [winner, setWinner] = useState("");
  const [disableBoard, setDisableBoard] = useState(false);
  const [history, setHistory] = useState([]);
  const [preview, setPreview] = useState(false);
  const boardref = useRef();


  const handleClick = (trow, tcol) => {
    if (board[trow][tcol] !== "") return
    console.log("handle circle click", trow, tcol)
    const newboard = board.map(row => ([...row]));
    newboard[trow][tcol] = turn;
    const value = checkWin(newboard);
    setHistory([...history, newboard]);
    if (value !== "") {
      setWinner(value);
      setDisableBoard(true);
    }
    setTurn(prev => prev === 'red' ? "green" : "red");
    setBoard(newboard);
  }

  const handlePreview = (i) => {
    setPreview(i);
    setDisableBoard(true);
  }


  useEffect(() => {
    const b = boardref.current;
    function handleboardClick(e) {
      if (disableBoard) {
        e.stopPropagation();
      }
    }
    b.addEventListener('click', handleboardClick, { capture: true });
    return () => b.removeEventListener('click', handleboardClick, { capture: true })
  }, [disableBoard]);

  const handleResume = () => {
    setPreview(null);
    if (!winner)
      setDisableBoard(false);
  }

  return (
    <div className="container">
      <div ref={boardref}>
        <Board board={preview ? history[preview] : board} handleClick={handleClick} />
      </div>
      {
        preview && <div><p>preview mode</p><button onClick={handleResume}>resume game</button></div>
      }
      <InformationPanel history={history} handlePreview={handlePreview} turn={turn} winner={winner} />
    </div>
  )
};


export default Game;


/*
creating a board of size 12 * 12 2d array
have to handle click on each circle
change the color according to the user
storing each and every state change in a seperate data structure most probably array
showing a history of moves
when selected have to show the game state at that point and also provide way to come back to the original state
if the game is completed show the winner
winning criteria is consecutive 5 circles in vertical horizontal or diagonal


*/