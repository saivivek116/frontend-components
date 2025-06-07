"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const items = [
	{ "name": "autocomplete", "url": "/autocomplete" },
	{ "name": "boardgame", "url": "/boardgame" },
	{ "name": "calculator", "url": "/calculator" },
	{ "name": "color-matching", "url": "/color-matching" },
	{ "name": "dictionary", "url": "/dictionary" },
	{ "name": "draganddrop", "url": "/draganddrop" },
	{ "name": "file-explorer", "url": "/file-explorer" },
	{ "name": "flight-game", "url": "/flight-game" },
	{ "name": "imagecarousal", "url": "/imagecarousal" },
	{ "name": "nested-checkboxes", "url": "/nested-checkboxes" },
	{ "name": "nestedcomments", "url": "/nestedcomments" },
	{ "name": "otp-input", "url": "/otp-input" },
	{ "name": "progressbar", "url": "/progressbar" },
	{ "name": "starrating", "url": "/starrating" },
	{ "name": "timer", "url": "/timer" }
]

export default function Home() {
  const [viewed, setViewed] = useState([]);
  useEffect(()=>{
    const list = sessionStorage.getItem("viewed") || "[]";
    setViewed(JSON.parse(list));
  },[]);
  const handleSelect = (i)=>{
    if(viewed.includes(i)){
      return
    }
    const viewedlist = [...viewed, i];
    setViewed(viewedlist);
    sessionStorage.setItem("viewed", JSON.stringify(viewedlist))
  }
  console.log(viewed)
	return (
		<div className={styles.page}>
			{
        items.map((item,i)=>{
          return (
            <Link href={item.url} 
            key={i} 
            className={`${styles.item} ${viewed.includes(i)?styles.viewed:""} `} onClick={()=>handleSelect(i)}>{item.name}</Link>
          )
        })
      }
		</div>
	);
}
