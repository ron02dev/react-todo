import { useState, useContext, useEffect, useRef } from "react";
import "./Styles/Components.scss";
import { ACTIONS } from "../App";
import { globalDispatch } from "../App";

function InputBar() {
  const [isActive, setIsActive] = useState(false);
  const handleCreate = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="input-bar-container">
      <button
        onClick={handleCreate}
        className={`todo__create-btn ${isActive == true && "hide"}`}
      >
        New Task +
      </button>
      {isActive && <TodoForm onCreate={handleCreate} />}
    </div>
  );
}

function TodoForm({ onCreate}) {
  const [input, setInput] = useState("");
  const dispatch = useContext(globalDispatch);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    const todoTitle = event.target[0].value || null;
    if (todoTitle) {
      const todoPriority = event.target[1].value;
      const todoCategory = event.target[2].value;

      const newTodo = {
        id: Date.now(),
        isComplete: true,
        todoTitle,
        todoPriority,
        todoCategory,
      };

      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    }else{
        console.log("focus lost")
       onCreate(); 
    }
          // SETS IS ACTIVE TO FALSE
      // ONCREATE DONT DELETE
  
    onCreate();
    setInput("");
  };

  const inputRef = useRef(null)
  
  useEffect(()=>{
    inputRef.current.focus();
  },[])

  return (
    <form onSubmit={handleSubmit} className="todo__form">
      <input
        ref={inputRef}
        type="text"
        className="todo__input"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={input}
      />
      <section className="form__section">
        <span>
          
          <select name="urgency" defaultValue={"low"} id="urgency">
            <option value="Can Wait">Can Wait</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Handle Immediately">Handle Immediately</option>
          </select>
        </span>
        <span>
          
          <select name="categories" defaultValue={"Personal"} id="categories">
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Others">Others</option>
          </select>
        </span>
      </section>
      <button className="form__submit-btn">Create Task</button>
    </form>
  );
}

export default InputBar;
