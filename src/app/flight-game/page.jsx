//requirements
/*
6*6 grid which represents the airport
user starts at one point 
he needs to reach to flight in time ( there will be timer)
but before going to flight, he needs to go to security check
from security check he needs to go to the flight
flight will be on the right most column
we can only move to horizontal or vertical by one step at a time
and we cannot go to adjacent cells sometimes because there is no way even if it is adjacent to it
once user reaches security check show status as security check done
once user reaches flight game ends, flight flys away


draw grid 6*6 board - use 2d array
need to maintain a datastructure which holds all the possible movements and where the security check and flight is there
timer with circular progress bar 
[
    [{left:false, up:false, down:true, right:false},{left:false, up:false, down:true, right:false},{},{},{},{} ],
    [],
    [],
    [],
    [],
    [],
]
*/
"use client";
import {useState, useEffect, useRef} from "react";
import Timer from "../timer/page";
import "./style.css"
const grid = [
  // row 0
  [
    { left: false, up: false, right: false, down: true,  isSecurity: false, isFlight: false }, // (0,0) start
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
  ],
  // row 1
  [
    { left: false, up: true,  right: false, down: true,  isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
  ],
  // row 2
  [
    { left: false, up: true,  right: true,  down: false, isSecurity: false, isFlight: false },
    { left: true,  up: false, right: true,  down: false, isSecurity: true,  isFlight: false }, // security
    { left: true,  up: false, right: false, down: true,  isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
  ],
  // row 3
  [
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: true,  right: false, down: true,  isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
  ],
  // row 4
  [
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: true,  right: true,  down: false, isSecurity: false, isFlight: false },
    { left: true,  up: false, right: true,  down: false, isSecurity: false, isFlight: false },
    { left: true,  up: false, right: true,  down: false, isSecurity: false, isFlight: false },
    { left: true,  up: false, right: false, down: false, isSecurity: false, isFlight: true  }, // flight
  ],
  // row 5
  [
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
    { left: false, up: false, right: false, down: false, isSecurity: false, isFlight: false },
  ],
];

const Maze = ({ board, handleClick, position, userTrack, blocked }) => {
    // const cellsRef = 

    const isUserPresent = (i, j)=>{
        return (i==position[0] && j==position[1])?"user":""
    }
    const isSecurityCheck = (i, j)=>{
        return board[i][j]["isSecurity"]?"security":""
    }
    const isFlight = (i, j)=>{
        return board[i][j]["isFlight"]?"flight":""
    }

    const isFollowed =(i,j)=>{
        let found = userTrack.find(t=>t[0]==i && t[1]==j);
        return found?"followed":""
    }

    const blockedClass = (i, j)=>{
        let c = "";
        if (
            blocked &&
            blocked.cell[0] === i &&
            blocked.cell[1] === j
        ) {
            c = `blocked-${blocked.side}`;
        }
        return c
    }

  return (
    <div className="maze">
      {
        board.map((row, i) => {
          return (
            row.map((c, j) => {
              return <div key={`${i}#${j}`} onClick={(e) => handleClick(i, j, e)} className={`${isUserPresent(i, j)} ${isSecurityCheck(i,j)} ${isFlight(i,j)} ${isFollowed(i,j)} ${blockedClass(i, j)}`}></div>
            })
          )
        })
      }

    </div>
  )
}

const directions = {
    "0": { "1": "right", "-1": "left" },
    "1": { "0": "down" },
    "-1": { "0": "up" }
}

function oppositeSide(dir) {
        switch(dir) {
            case "left": return "right";
            case "right": return "left";
            case "up": return "down";
            case "down": return "up";
            default: return "";
        }
    }

const MazeGame = ()=>{

    const [userPosition, setUserPoisition] = useState([0,0]);
    const [track, setTrack] = useState([]);
    const [status, setStatus] = useState("");
    const [disableBoard, setDisable] = useState();
    const boardref = useRef();
    const [timerKey, setTimerKey] = useState(0);
    const [blocked, setBlocked] = useState(null);
    const [started, setStarted] = useState(false);

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

  const handleTimeUp = ()=>{
        setStatus("loose");
        setDisable(true);
    }
  
    const handleStart = () => {
        setStarted(true);
        setUserPoisition([0,0]);
        setTrack([]);
        setStatus("");
        setDisable(false);
        setTimerKey(prev => prev + 1); // reset timer
    };

    useEffect(()=>{
        function handleKeyDown(e){
            if(e.keyCode=='40'){
                handleClick(userPosition[0]+1, userPosition[1])
            }else if(e.keyCode=='38'){
                handleClick(userPosition[0]-1, userPosition[1])
            }else if(e.keyCode == '37'){
                handleClick(userPosition[0], userPosition[1]-1)
            }else if(e.keyCode == "39"){
                handleClick(userPosition[0], userPosition[1]+1)
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return ()=>window.removeEventListener("keydown", handleKeyDown)
    }, [userPosition]);


    const handleClick = (i, j)=>{
        if(status!=="")return
        const m = grid[userPosition[0]][userPosition[1]]
        console.log(m);
        let dist_x = i-userPosition[0]
        let dist_y = j-userPosition[1];
        if(Math.abs(dist_x)>1 || Math.abs(dist_y)>1 || (Math.abs(dist_x)>0 && Math.abs(dist_y)>0)
        || (dist_x==0 && dist_y==0)){
            return
        }
         const dir = directions[dist_x]?.[dist_y];
        if(m[directions[dist_x][dist_y]]){
            setTrack([...track, [...userPosition]])
            setUserPoisition([i, j]);
            if(grid[i][j]['isFlight']){
                setStatus("win");
                setDisable(true);
            }
        }else{
            console.log("no")
             if(dir) {
                setBlocked({ cell: [i, j], side: oppositeSide(dir) });
                setTimeout(() => {setBlocked(null); setTrack([]);setUserPoisition([0,0])}, 1000);
                
            }
        }
    }
    return (
        <div className="container">
            <div className="rules">
                    <p>Move one step at a time either horizontally or vertically and reach the flight within time </p>
                {!started?<button onClick={handleStart}>Start</button>:<Timer
                key={timerKey}
                minutes={1}
                onTimeUp={handleTimeUp}
                running={status === ""}
            />}
            </div>
            
            <div className="board-container" ref={boardref}>
                
            <Maze board={grid} handleClick={handleClick} position={userPosition} userTrack={track} blocked={blocked} />
            </div>
            {status=="win" && <button onClick={handleStart}>Reset</button>}
            {status=="loose" && <button onClick={handleStart}>Try Again</button>}
        </div>
    )
}

export default MazeGame
