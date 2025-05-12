import {useEffect, useState} from "react";

function useIsOnScreen(element){
    const [isOnScreen, setIsOnScreen] = useState(false);
    
    useEffect(()=>{
        const observer = new InstersectionObserver((entries)=>{
            const [entry] = entries;
            setIsOnScreen(entry.isIntersecting)
        });

        observer.observe(element.current);
        return ()=>{
            observer.disconnect();
        }
    }, [element])
    return isOnScreen;
}