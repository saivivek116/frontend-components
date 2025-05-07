"use client";
import {useState, useEffect, useRef} from "react";
import { FaFile, FaFolder } from "react-icons/fa";
import "./style.css"
import {Data} from "./data"
const FileExplorer = ()=>{
    const [data, setData] = useState(Data);

    
    const Node = ({item})=>{
        const [expand, setExpand] = useState(false);
        return (
            <div className="item">
                {item.isFolder && <span className="expand" onClick={()=>setExpand(prev=>!prev)}>{expand?"-":"+"}</span>}
                <span>{item.name}</span>
                {item.children && <><span><FaFile /></span>
                    <span><FaFolder /></span></>
                    
                }
                {expand && item.children && <DisplayTree data={item.children} />}
            </div>
        )
    }
    const DisplayTree = ({data})=>{
        if(data.length===0) return
        return (
            <div className="folder-container">
                {
                    data.map((item, id)=>{
                        return (
                            <Node key={id} item={item}/>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className="container">
            <h1>File explorer</h1>
            <DisplayTree data={data} />
        </div>
    )
}

export default FileExplorer;