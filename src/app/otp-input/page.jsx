"use client"
import {useCallback, useEffect, useState, useRef} from "react";
import "./styles.css"
import { generateRandomOtp } from "../lib/utils";
//tasks
// Otp input component
// currently the otp is going to be 5 digit => generate random on load of the component and resend code
// automatically control should move to the next box of the input component when the number is entered in the current box
//automatically control should move to the back box from the current box if there
// paste should be working, it should paste all the numbers upto only the number of boxes available from the current box

//implementation steps
//create a 5 input boxes
//maintain a state or ref to store the otp entered in the boxes
//generate the random 5 digits number. maintain state 
//submit button to verify if the otp is valid show success message otherwise error with input boxes with red




const OtpInput = ()=>{

    const [otp, setOtp] = useState(new Array(5).fill(""));
    const [randomnumber, setRandomNumber] = useState("");
    const [status, setStatus] = useState(""); 
    const inputRefs = useRef(new Array(5).fill(""));
    const [activeIndex, setActiveIndex] = useState(0);
    console.log(inputRefs)
    const handleChange = (e, changedId)=>{
        console.log("change")
        const newOtp = [...otp];
        newOtp[changedId] = e.target.value;
        setOtp(newOtp);
        
    }

    useEffect(()=>{
        setRandomNumber(generateRandomOtp(5));
    },[])
    
    const handleSubmit = ()=>{
        if(otp.join("")===randomnumber){
            setStatus("correct");
        }else{
            setStatus("wrong")
        }
        setOtp(new Array(5).fill(""))
    }
    const handleKeyDown = (e, changedId)=>{
        console.log(e);
        console.log("keydown")
        
        if(e.keyCode===8){
            setTimeout(()=>{
                // let currentIdx = activeIndex;
                if(changedId-1>=0){
                    inputRefs.current[changedId-1].focus()
                    // setActiveIndex(currentIdx-1);
                }
            },0)
        }else{
            setTimeout(()=>{
                if(changedId+1<otp.length){
                    inputRefs.current[changedId+1].focus()
                }
            },0)
        }
    }
    return (
        <div className="container">
            <h1>Otp Input</h1>
            {randomnumber && <p>{randomnumber}</p>}
            <div className="otp-container">
            {
                otp.map((each, id)=>{
                   return <input 
                   ref={el => inputRefs.current[id] = el} 
                    key={id} type="text"
                     maxLength={1}
                     onKeyDown={(e)=>handleKeyDown(e, id)}
                      value={each}
                       onChange={(e)=>handleChange(e, id)}/> 
                })
            }
            </div>
            <button className="submit" onClick={handleSubmit} disabled={otp.join("").length!==5}>Submit</button>
            {status!=="" && status}
        </div>
    )
}

export default OtpInput;