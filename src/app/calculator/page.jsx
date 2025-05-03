"use client";
import {useState} from "react";
import "./styles.css"
const keypad = ["AC", "%", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "(", "0", ".", "=", ")"]
const operations = "+-*()=/%"
const Calculator = ()=>{
    const [expression, setExpression] = useState("");
    const handleKeyPress = (e)=>{
        let value = e.target.getAttribute('data-value');
        console.log(value);
        if(value=="=" ){
            setExpression(String(eval(expression)))
            return
        }
        if(value=="AC"){
            setExpression("");
            return
        }
        setExpression(expression=>expression+String(value));
    }
    return (
        <div className="container">
            <h1>Calculator</h1>
            <div className="calculator-container">
                <div className="display">
                    {expression}
                </div>
                <div className="keypad">
                    {
                        keypad.map((k, idx)=>{
                            return (
                                <div key={idx} data-value={k} onClick={handleKeyPress} className={`key ${operations.includes(k)?"operation":""}`}>{k}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Calculator;