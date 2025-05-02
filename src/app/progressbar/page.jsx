"use client";
import {useState, useEffect, useRef} from "react";
import "./styles.css"
const ProgessBar = ()=>{
    const [progress, setProgress] = useState(0);

    useEffect(()=>{

    let intervalIdRef = setInterval(()=>{
        setProgress(progress=>{
            if(progress<10){
                return progress+1;
            }
            clearInterval(intervalIdRef);
            return progress
        });
    },500)

        return ()=>{
            clearInterval(intervalIdRef);
        }
    },[])
    return (
        <div className="container">
            <h1>Progress Bar</h1>
            <div className="progressbar-container">
                <div className="progress" style={{backgroundColor:"green", color:`${progress==0?"black":"white"}`, width:`${progress}%`, marginLeft:`${progress>0?"0px":"5px"}`}}>
                    {`${progress}%`}
                </div>
            </div>
        </div>
    )
}

export default ProgessBar;