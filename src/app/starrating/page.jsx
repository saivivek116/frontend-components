"use client";
import {useState} from "react";
import "./styles.css"
const StarRating = ()=>{
    const [hover, setHover] = useState(-1);
    const [selected, setSelected] = useState(-1);
    function handleClick(idx){
        console.log("clicked", idx)
        setSelected(idx);
    }
    const handleMouseEnter = (idx)=>{
       setHover(idx)
    }
    const handleMouseLeave = (idx)=>{
        console.log("mouse leave")
        setHover(-1);
    }
    return (

        <div className="container">
            <div>
            {
            new Array(5).fill(0).map((i,idx)=>{
                return (
                    <i key={idx+1} className={`fa ${hover>=idx || selected>=idx?"fa-star":"fa-star-o"}`}
                     onClick={()=>handleClick(idx)}
                    onMouseEnter={()=>handleMouseEnter(idx)}
                    onMouseLeave={()=>handleMouseLeave(idx)}></i>
                )
            })
            }
            </div>
            <p>{selected>-1 && selected+1}</p>
        </div>
    )
}

export default StarRating;