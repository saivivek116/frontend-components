"use client";
import {useState, useEffect, useCallback} from "react";
import "./styles.css";



// 'https://dummyjson.com/recipes/search?q=Margherita'
const AutocompleteSearchBar = ()=>{
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(true);
    const [cache, setCache] = useState({});

    const fetchData = async ()=>{
        try{
            if(cache[input]) {
                setResults(cache[input]);
                return
            }
            if(input==""){
                return;
            }
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
            if(!response.ok){
                throw new Error("something went wrong");
            }
            const data = await response.json();
            // console.log(data);
            setResults(data.recipes)
            setCache(prev=>({...prev, [input]:data?.recipes}))
        }catch(err){
            console.log(err);
        }
    }

    const debounce = function(callback, delay){
        let timeoutid;
        return function(...args){
            console.log("timout", timeoutid)
            if (timeoutid) {
                clearTimeout(timeoutid);
            }
            timeoutid = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    };

    const debouncedSearch = useCallback(debounce(fetchData, 500), [])
    //Tasks
    // 1. debounce this is done
    // 2. cache

    // useEffect(()=>{
    //     if(input=="")return
    //     debouncedSearch(input);
    // },[input])

    useEffect(()=>{
        const timer = setTimeout(fetchData, 500);
        return ()=>{
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <div className="container">
            <h1>Autocomplete Search Bar</h1>
            <div>
                <input type="text" 
                autoFocus
                 value={input}
                  onChange={(e)=>setInput(e.target.value)}
                 onFocus={()=>setShow(true)}
                    onBlur={()=>setShow(false)}
                 />
            </div>
            {
                show && <div className="results">
                {
                    results.length>0?
                    results.map((rec,id)=>{
                        return <span key={id}>{rec.name}</span>
                    }):<span>No results</span>
                }
            </div>
            }
            
        </div>
    )
}
export default AutocompleteSearchBar;