"use client";
import {useState} from "react";
import "../styles.css";

// function debounce(callback, delay){
//     let timeoutId;
//     return function(...args){
//         timeoutId = setTimeout(()=>callback(...args), delay);
//     }
// }
const Dictionary = ()=>{
    const [input, setInput] = useState("");
    const [data, setData] = useState({});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
            if(!response.ok){
                throw new Error("something went wrong");
            }
            const data = await response.json();
            setInput("");
            console.log(data)
            setData(data[0]);
        }catch(err){
            console.log(err);
        }
        
    }
    const handleChange = (e)=>{
        setInput(e.target.value);
        //fetch the results;
    }

    // const debounceSearch = debounce(handleSubmit);
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
            {/* <SearchResults /> */}
            <Display data={data}/>
        </div>   
    )
}


//tasks
//1. deboun

// {
//     "partOfSpeech": "noun",
//     "definitions": [
//         {
//             "definition": "\"Hello!\" or an equivalent greeting.",
//             "synonyms": [],
//             "antonyms": []
//         }
//     ],
//     "synonyms": [
//         "greeting"
//     ],
//     "antonyms": []
// }

function Display({data}){

    if(Object.keys(data).length===0){
        return <p>No results</p>
    }

    return (
        <div className="results">
            <h1>Results</h1>
            <div className="meanings">
                {
                    data?.meanings.map((m, id)=>{
                        return (
                            <div key={id}>
                                <h2>{m["partOfSpeech"]}</h2>
                                {/* implement complete definition */}
                                <p>{m.definitions[0].definition}</p>
                            </div>
                        )
                    })
                }
            </div>
        
        </div>
    )
}

export default Dictionary;