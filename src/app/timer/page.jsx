"use client"

import { useEffect, useState, useRef } from "react";

const Timer = ({hours=0, minutes=0, seconds=0, onTimeUp,  running=true})=>{

    const [time, setTime] = useState(hours*60*60+minutes*60+seconds);
    const timerRef = useRef();

    useEffect(()=>{
        if(!running){
            clearInterval(timerRef)
            return;
        }
        timerRef.current = setInterval(() => {
            setTime(prev=>{
                if(prev>1){
                    return prev-1;
                }else{
                    clearInterval(timerRef.current);
                    return 0;
                }
            })
        }, 1000);
        return ()=>clearInterval(timerRef.current);
    },[running]);

    useEffect(() => {
        if (time === 0 && onTimeUp) {
            onTimeUp();
        }
    }, [time, onTimeUp]);


    const displayHours = Math.floor(time / 3600);
    const displayMinutes = Math.floor((time % 3600) / 60);
    const displaySeconds = time % 60;

    return (
        <div>
            {hours > 0 && (
                <span>{String(displayHours).padStart(2, '0')}:</span>
            )}
            {(minutes > 0 || hours > 0) && (
                <span>{String(displayMinutes).padStart(2, '0')}:</span>
            )}
            <span>{String(displaySeconds).padStart(2, '0')}</span>
        </div>
    )
}

export default Timer;