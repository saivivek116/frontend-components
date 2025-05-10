"use client";
import { useState } from "react";
import "./style.css";


const CheckboxesData = [
    {
      id: 1,
      label: "Fruits",
      checked: false,
      children: [
        { id: 2, label: "Apple", checked: false, },
        { id: 3, label: "Banana", checked: false, },
        {
          id: 4,
          label: "Citrus",
          checked: false,
          children: [
            { id: 5, label: "Orange", checked: false, },
            { id: 6, label: "Lemon",checked: false, },
          ],
        },
      ],
    },
    {
      id: 7,
      label: "Vegetables",
      checked: false,
      children: [
        { id: 8, label: "Carrot", checked: false, },
        { id: 9, label: "Broccoli", checked: false, },
      ],
    },
  ];
  

  const Checkbox = ({props, handleChecked})=>{
    const [checked, setChecked] = useState(props.checked);
    return (
        <>
         <input className="checkbox" type="checkbox" checked={props.checked} onChange={()=>handleChecked(props.id)} />
         <label>{props.label}</label>
         </>
    )
  }

  const Checkboxes = ({data, handleChecked}) => {
    return (
      <div className="checkbox-group">
        {
            data.map(item=>{
                return (<div key={item.id}>
                   <Checkbox props={item} handleChecked={handleChecked}/>
                    {
                        item.children && <Checkboxes data={item.children} handleChecked={handleChecked} />
                    }
                </div>)
            })
        }
      </div>
    );
  };

const NestedCheckbox = ()=>{
    const [checkboxesData, setCheckboxesData] = useState(CheckboxesData);

    const updateChildren = (checboxes, state)=>{
        return checboxes.map(c=>{
            c.checked = state;
            if(c.children){
                c.children = updateChildren(c.children, state);
            }
            return c;
        })
    }

    const updateCheckboxes = (data, id)=>{
        return data.map(item=>{
            
            if(item.id === id){
                item.checked = !item.checked;
                if(item.children){
                    item.children = updateChildren(item.children, item.checked);
                }
            }else{
                if(item.children){
                    item.children = updateCheckboxes(item.children, id)
                    item.checked = item.children.every(item=>item.checked);
                }
            }
            return item;
        });
    }

    const handleChecked = (id)=>{
        const new_data =  updateCheckboxes(checkboxesData, id);

        setCheckboxesData(new_data)
    }
    return (
        <div>
            <h1>Nested Checkbox</h1>
            <Checkboxes
            handleChecked={handleChecked}
        data={checkboxesData}
      />
        </div>
    )
}

export default NestedCheckbox