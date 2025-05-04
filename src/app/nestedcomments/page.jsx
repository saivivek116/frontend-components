"use client";
import {useState} from "react";
import "./styles.css"

const Commments = ()=>{
    const [comment, setComment] = useState("");
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      let new_comment = {
        id: Math.floor(Math.random() * 100000),
        comment,
        children: [],
      };
      setData((data) => [...data, new_comment]);
      setComment("");
    };
  
    const handleReply = (id) => {
      let replyValue = prompt("enter your comment");
      if (replyValue === "") {
        return;
      }
      console.log(replyValue);
      let newReply = {
        id: Math.floor(Math.random() * 100000),
        comment: replyValue,
        children: [],
      };
      let newData = handleAddComment(data, newReply, id);
      setData(newData);

    };
  
    const deleteComment = (id, data) => {
      return data.filter((c) => {
        if (c.id === id) return false;
        if (c.children.length > 0) {
          c.children = deleteComment(id, c.children);
        }
        return true;
      });
    };
  
    const handleDelete = (id) => {
      let newData = deleteComment(id, data);
      setData(newData);
    };
  
    function nested_comments(data) {
      return data.map((c) => {
        return (
          <div className="comment" key={c.id}>
            {c.comment}
            <button onClick={() => handleReply(c.id)}>Reply</button>
            <button onClick={() => handleDelete(c.id)}> Delete</button>
            {c.children.length > 0 && (
              <div className="reply">{nested_comments(c.children)}</div>
            )}
          </div>
        );
      });
    }
  
    const handleAddComment = (data, comment, parent_id) => {
      return data.map((c) => {
        if (c.id == parent_id) {
          //add this comment to it
          c.children = [...c.children, comment];
        } else {
          if (c.children.length > 0)
            c.children = handleAddComment(c.children, comment, parent_id);
        }
        return c;
      });
    };
  
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="comments-container">{nested_comments(data)}</div>
      </div>
    );
}

export default Commments;