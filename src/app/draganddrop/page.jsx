"use client";
import { useState } from "react"
import "./styles.css"
const ITEMS = [
    {
      id: 1,
      text: 'One platform to rule them all',
    },
    {
      id: 2,
      text: 'Subscribe to devtools.tech/youtube',
    },
    {
      id: 3,
      text: 'Premium questions',
    },
    {
      id: 4,
      text: 'Company wise questions',
    },
    {
      id: 5,
      text: 'In-built test cases',
    },
    {
      id: 6,
      text: 'Powerful browser based IDE'
    }
  ];
  
export default function DragAndDrop() {
  const [list, setList] = useState(ITEMS);
//   console.log(list)
  const dragstartHandler = (ev, i) => {
    console.log(ev);
    ev.dataTransfer.setData("text", i);
  }
  const dropHandler = (ev, i) => {
    ev.preventDefault();
    const data = +ev.dataTransfer.getData("text");
    // console.log(data, "dragged", i, 'dropped');
    if (data === i) {
      return
    }
    const newlist = list.map(it => ({ ...it }));
    // newlist.slice()
    let [draggedItem] = newlist.splice(data, 1);
    let newstate;
    if (i == 0) {
      newstate = [draggedItem, ...newlist]
    } else {

      newstate = [...newlist.slice(0, i), draggedItem, ...newlist.slice(i)]
    }
    // console.log(newstate);
    setList(newstate);

  }
  const dragoverHandler = (ev, i) => {
    ev.preventDefault();
  }
  return <main>
    <div className="list-container"
    >
      {
        list.map((it, i) => {
          return <div
            key={i}
            onDrop={(e) => dropHandler(e, i)}
            onDragOver={(e) => dragoverHandler(e, i)}
            draggable
            className="item"
            onDragStart={(e) => dragstartHandler(e, i)}
          >
            = {it.text}
          </div>
        })
      }
    </div>
  </main>;
}
