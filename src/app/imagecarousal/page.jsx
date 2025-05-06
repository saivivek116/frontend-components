"use client";

import "./styles.css"
const { useEffect, useState, useCallback, useRef } = require("react");

const ImageCarousal = ({num=10, interval = 5000})=>{
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading]= useState(true);
    const [error, setError] =useState("");
    const [click, setClick] = useState(true);
    const intervalId = useRef(null);


    const fetchImages = async ()=>{
        try{
            const response = await fetch(`https://dog.ceo/api/breeds/image/random/${num}`);
            if(!response.ok){
                throw new Error("request failed");
            }
            const data = await response.json();
            // console.log(data)
            setImages(data?.message);

        }catch(err){
            console.log(err);
            setError(err);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(images.length==0)return
        if(intervalId.current){
            clearInterval(intervalId.current)
        }
        intervalId.current = setInterval(()=>{
            setActiveIndex(prevIndex=>{
                let x = (prevIndex+1)%images.length;
                return x;
            })
        }, interval);
        return ()=>{clearInterval(intervalId)}
    },[images.length, click])

    useEffect(()=>{
        fetchImages();
    },[]);
    const handlePrev = useCallback(()=>{
        setActiveIndex(prevIndex=> {
            console.log(prevIndex)
            return (prevIndex-1+images.length)%images.length
        });
        setClick(prev=>!prev)
    },[images.length]);


    const handleNext = useCallback(()=>{
        setActiveIndex(prevIndex=>{
            console.log(prevIndex, "next")
            let x = (prevIndex+1)%images.length;
            return x;
        });
        setClick(prev=>!prev)
    },[images.length])

    if(loading){
        return <p>loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }



    console.log(activeIndex);
    return (
        <div className="carousal-container">
            {
                images.map((image,id)=>{
                    return <div key={id} className={`image-container ${activeIndex===id?"active":""}`}><img loading="lazy" src={image}></img></div>
                })
            }
            <button className="prev" onClick={handlePrev}>Prev</button>
            <button className="next" onClick={handleNext}>Next</button>
        </div>
    )
}

export default ImageCarousal;