"use client"
import { useState } from "react";
import "./style.css";

//requirements

/*
1. password length : 6 - 32
2. strength - 0 - 10
3strength ( 4 - 6) - weak
strength (7- 8) - moderate
strength (9, 10 ) - strong 
password length < 3 then strength is 0
we need to show progress bar based on the strength  
lc - 2 
uc - 2 
num - 2
specc - 2
len > 6  - 2

progressbar div 100% 
*/

const ProgressBar = ({ strength }) => {
  console.log(strength);
  return (
    <div>
      <div className="progress-bar">
        <div className="fill"></div>
      </div>
      <p>Strength: {strength}</p>
    </div>
  );
};

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [score, setScore] = useState({
      uc: 0,
      lc: 0,
      num: 0,
      sc: 0,
      sz: 0,
    });
    


  const onChangePassword = (e) => {
    const typecountmap = {
      uc: 0,
      lc: 0,
      num: 0,
      sc: 0,
      sz: 0,
    };
    // console.log(typecountmap["lc"]);
    const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const new_password = e.target.value;
    if (new_password.length < 3) {
      setPassword(e.target.value);
      setStrength(0)
      return;
    }
    //65 - 65+26-1
    //97-97+26-1 lc
    //48-48+10-1

    for (let i = 0; i < new_password.length; i++) {
      let code = new_password.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        typecountmap["uc"] =
          typecountmap["uc"] < 2 ? typecountmap["uc"] + 1 : typecountmap["uc"];
      } else if (code >= 97 && code <= 122) {
        typecountmap["lc"] =
          typecountmap["lc"] < 2 ? typecountmap["lc"] + 1 : typecountmap["lc"];
      } else if (code >= 48 && code <= 57) {
        typecountmap["num"] =
          typecountmap["num"] < 2
            ? typecountmap["num"] + 1
            : typecountmap["num"];
      } else if (specialCharsRegex.test(new_password[i])) {
        typecountmap["sc"] =
          typecountmap["sc"] < 2 ? typecountmap["sc"] + 1 : typecountmap["sc"];
      }
    }
    typecountmap["sz"] = new_password.length >= 6 ? 2 : 0;
    // console.log(typecountmap)
    setScore(typecountmap);
    setPassword(new_password);
    let st = Object.values(typecountmap).reduce((acc, curr) => acc + curr, 0);
    setStrength(st);
  };

  return (
    <div className="container">
        <div>
    <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={onChangePassword} placeholder="Enter your password" />
        </div>
        <div>
            <h2 className="instructions">Instructions</h2>
        <ol>
            <li className={`${score["lc"]>=2?"satisfied":""}`}>
                Atleast 2 lower case letters
            </li>
            <li className={`${score["uc"]>=2?"satisfied":""}`}>
                Atleast 2 Upper case letters
            </li>
            <li className={`${score["num"]>=2?"satisfied":""}`}>
                Atleast 2 numbers
            </li>

            <li className={`${score["sc"]>=2?"satisfied":""}`}>
                Atleast 2 special characters
            </li>
            <li className={`${score["sz"]>=2?"satisfied":""}`}>
                Atleast length of 6
            </li>
        </ol>
        </div>
        
      <ProgressBar strength={strength} />
    </div>
  );
}
