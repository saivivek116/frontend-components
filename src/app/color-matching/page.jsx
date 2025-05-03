"use client";
import {useEffect, useState} from "react";
import "./styles.css"
import { getRandomColors, shuffle } from "../lib/utils"

const GRIDSIZE = 16 // always should be multiple of 4
const getShuffledBoxes = ()=>{
    const randomColors = getRandomColors(GRIDSIZE/2);
    const doubleRandomColors = [...randomColors, ...randomColors]
    return shuffle(doubleRandomColors)
}

const ColorMatchingGame = ()=>{
    const [boxes, setBoxes]= useState(getShuffledBoxes());
    const [opened, setOpened] = useState([-1, -1]);
    const [selected, setSelected] = useState(new Set());
    const [count, setCount] = useState(0); 
    const [complete, setComplete] = useState(false);
   
    useEffect(()=>{
        if(selected.size===boxes.length){
            setComplete(true);
        }
    },[selected])

    const restart = ()=>{
        setBoxes(getShuffledBoxes());
        setOpened([-1, -1]);
        setCount(0);
        setComplete(false)
        setSelected(new Set());
    }

    // console.log(boxes);
    const handleBoxClick = (id)=>{
        if(opened[0]!=-1 && id===opened[0]){
            return
        }
        setOpened((prev) => {
            if (prev[0] !== -1 && prev[1] !== -1) {
            // Reset opened boxes if both are already set
            return [id, -1];
            }

            if (prev[0] !== -1) {
            // Second box clicked
                if (id !== prev[0] && boxes[id] === boxes[prev[0]]) {
                    // Match found
                    setSelected((prevSelected) => new Set([...prevSelected, prev[0], id]));
                } else {
                    // No match, reset after delay
                    setTimeout(() => {
                    setOpened([-1, -1]);
                    }, 400);
                }
                setCount(count=>count+1)
                return [prev[0], id];
            }

            // First box clicked
            return [id, -1];
        });
    }
    return (
        <div className="container">
            <h1>Color Matching Game</h1>
            <div className="grid">
                {
                    boxes.map((box, id)=>{
                        return (
                            <div key={id} 
                            style={{"backgroundColor":selected.has(id) || opened.includes(id)?box:"white"}}
                             onClick={()=>handleBoxClick(id)} className="box"></div>
                        )
                    })
                }
            </div>
            {
                complete && <div>Game completed in {count} moves</div>
            }
            <button disabled={!complete} onClick={restart}>Restart Game</button>
            
        </div>
    )
}

export default ColorMatchingGame;

//tasks
// select input with 4, 8, 16, 24 for number ofboxes 
// grid with boxed each row must contain 4 columns

//colors = noOfBoxes/2
//each color should be assigned to 2 boxes

//if the boxed do no match reset to orginal position after 400ms
//match should remain revealed

//each selection is counted as 1
//At the end of the game, the user should be informed of the total number of rounds taken to complete the game
//reset(restart the game) should there and be enabled after the game ends to reset to the start of the game


// first i will build for 12 size grid then i will scale it

// create an array with colors of size 12 with 6 unique colors randomised 