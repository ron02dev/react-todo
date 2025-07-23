import { useState } from "react";
import "./Styles/Components.scss";
function TodosList({ lists, onDelete,onEditTodo}) {
  console.log(lists);

    const [isMarked,setIsMarked] =useState(false)
  
  function handleMarked(){
    setIsMarked(!isMarked)
    console.log(isMarked)
  }

  return (
    <ul className="list-container">
      {lists.map((content, id) => {
        return <li key={id}>
            
            <input className={isMarked? `completed` : ``} onChange={(e)=>{onEditTodo(e,id)}}  type="text" value={content} />
            <button className="del-btn"  onClick={(e)=>{onDelete(e,id)}}>X</button>
            <button className="check-btn" onClick={handleMarked}>✔</button>
        </li>;
      })}
    </ul>
  );
}
export default TodosList;
